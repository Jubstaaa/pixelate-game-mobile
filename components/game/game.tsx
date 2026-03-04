import React, { useCallback, useMemo, useRef, useState } from 'react'

import { Flame, Trophy } from 'lucide-react-native'

import { Image } from '@/lib/image'
import {
    ActivityIndicator,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'

import { COLORS } from '@/constants/colors'
import {
    useGetCharactersQuery,
    useGetDeviceQuery,
    useGetGameDataQuery,
    useSubmitGuessMutation,
} from '@/lib/api/game-api'
import type { Character, GameData } from '@/lib/api/game-api.types'
import { addImageResizeParams } from '@/lib/image-url'

import { LeaderboardDrawer } from '../leaderboard/leaderboard.drawer'
import { PixelatedImage } from '../pixelated-image/pixelated-image'

import type { GameProps } from './game.types'

const CONFETTI_COLORS = [
    COLORS.primary,
    '#a855f7',
    '#f59e0b',
    '#10b981',
    '#f43f5e',
]

const normalize = (str: string): string =>
    String(str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')

export const Game = ({ categoryId, levelType }: GameProps) => {
    const confettiRef = useRef<ConfettiCannon>(null)

    const [input, setInput] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [guessedIds, setGuessedIds] = useState<number[]>([])
    const [isRevealed, setIsRevealed] = useState(false)

    const [submitGuess] = useSubmitGuessMutation()

    const {
        data = {} as GameData,
        isLoading,
        refetch,
    } = useGetGameDataQuery({ categoryId, levelType })
    const { data: characters = [], isLoading: isCharsLoading } =
        useGetCharactersQuery({ categoryId })
    const { isLoading: isDeviceLoading } = useGetDeviceQuery()

    const filteredCharacters = useMemo(() => {
        const available = characters.filter(
            (c: Character) => !guessedIds.includes(c.id)
        )
        if (!input.trim()) return available.slice(0, 5)

        return available
            .map((c: Character) => {
                const norm = normalize(c.name)
                const search = normalize(input)
                let score = 0
                if (!search) score = 1
                else if (norm === search) score = 1
                else if (norm.startsWith(search))
                    score = 1 - search.length / Math.max(norm.length, 1)
                else if (norm.includes(search))
                    score = 0.5 - search.length / Math.max(norm.length, 1)
                return { c, score }
            })
            .filter(x => x.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(x => x.c)
    }, [characters, guessedIds, input])

    const handleInputChange = useCallback((v: string) => {
        setInput(v)
        setShowDropdown(v.length > 0)
    }, [])

    const handleInputFocus = useCallback(() => setShowDropdown(true), [])

    const handleSelect = useCallback(
        async (character: Character) => {
            Keyboard.dismiss()
            setInput(character.name)
            setShowDropdown(false)
            setGuessedIds(prev => [...prev, character.id])

            try {
                await submitGuess({
                    id: character.id,
                    categoryId,
                    levelType,
                }).unwrap()
                confettiRef.current?.start()
                setIsRevealed(true)

                setTimeout(async () => {
                    await refetch()
                    setIsRevealed(false)
                    setGuessedIds([])
                    setInput('')
                }, 2000)
            } catch {
                await refetch()
                setInput('')
            }
        },
        [categoryId, levelType, submitGuess, refetch]
    )

    if (isLoading || isCharsLoading || isDeviceLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color={COLORS.primary} size="large" />
            </View>
        )
    }

    const imageUrl = addImageResizeParams(data.characterImage, 800, 800)

    return (
        <View style={styles.container}>
            <ConfettiCannon
                ref={confettiRef}
                fadeOut
                autoStart={false}
                colors={CONFETTI_COLORS}
                count={120}
                origin={{ x: -20, y: 0 }}
            />

            <View style={styles.imageWrap}>
                <PixelatedImage
                    count={isRevealed ? 6 : (data.count ?? 0)}
                    imageUrl={imageUrl}
                    levelType={levelType}
                    size={300}
                />
            </View>

            <View style={styles.chips}>
                <View style={styles.chip}>
                    <Flame color={COLORS.warning} size={16} />
                    <Text style={[styles.chipText, { color: COLORS.warning }]}>
                        {data.streak ?? 0}
                    </Text>
                </View>
                <View style={styles.chip}>
                    <Trophy color={COLORS.success} size={16} />
                    <Text style={[styles.chipText, { color: COLORS.success }]}>
                        {data.maxStreak ?? 0}
                    </Text>
                </View>
            </View>

            <View style={styles.inputRow}>
                <View style={styles.inputWrap}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="Type to search..."
                        placeholderTextColor={COLORS.muted}
                        value={input}
                        onChangeText={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    {showDropdown && filteredCharacters.length > 0 && (
                        <View style={styles.dropdown}>
                            {filteredCharacters.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelect(item)}>
                                    <Image
                                        style={styles.dropdownIcon}
                                        contentFit="cover"
                                        source={{
                                            uri: addImageResizeParams(
                                                item.characterImage,
                                                64,
                                                64
                                            ),
                                        }}
                                    />
                                    <Text style={styles.dropdownText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <LeaderboardDrawer
                    categoryId={categoryId}
                    levelType={levelType}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
        paddingTop: 12,
    },
    imageWrap: {
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chips: {
        flexDirection: 'row',
        gap: 10,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 14,
        paddingVertical: 7,
    },
    chipText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    inputRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        paddingHorizontal: 16,
    },
    inputWrap: {
        flex: 1,
        zIndex: 10,
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 15,
        color: COLORS.foreground,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 20,
        marginTop: 4,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    dropdownIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    dropdownText: {
        fontSize: 14,
        color: COLORS.foreground,
    },
})
