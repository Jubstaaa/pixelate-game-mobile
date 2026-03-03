import React, { useCallback, useMemo, useRef, useState } from 'react'

import { Flame, Trophy } from 'lucide-react-native'

import { Image } from 'expo-image'
import {
    ActivityIndicator,
    Keyboard,
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
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator color={COLORS.primary} size="large" />
            </View>
        )
    }

    const imageUrl = addImageResizeParams(data.characterImage, 800, 800)

    return (
        <View className="flex-1 items-center gap-5 pt-3">
            <ConfettiCannon
                ref={confettiRef}
                fadeOut
                autoStart={false}
                colors={CONFETTI_COLORS}
                count={120}
                origin={{ x: -20, y: 0 }}
            />

            <View className="rounded-3.5 overflow-hidden border border-border">
                <PixelatedImage
                    count={isRevealed ? 6 : (data.count ?? 0)}
                    imageUrl={imageUrl}
                    levelType={levelType}
                    size={300}
                />
            </View>

            <View className="flex-row gap-2.5">
                <View className="flex-row items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.75">
                    <Flame color={COLORS.warning} size={16} />
                    <Text
                        className="text-[15px] font-bold"
                        style={{ color: COLORS.warning }}>
                        {data.streak ?? 0}
                    </Text>
                </View>
                <View className="flex-row items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.75">
                    <Trophy color={COLORS.success} size={16} />
                    <Text
                        className="text-[15px] font-bold"
                        style={{ color: COLORS.success }}>
                        {data.maxStreak ?? 0}
                    </Text>
                </View>
            </View>

            <View className="w-full flex-row items-start gap-2.5 px-4">
                <View className="relative z-10 flex-1">
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        className="rounded-2.5 border border-border bg-surface px-3.5 py-3.25 text-[15px] text-foreground"
                        placeholder="Type to search..."
                        placeholderTextColor={COLORS.muted}
                        value={input}
                        onChangeText={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    {showDropdown && filteredCharacters.length > 0 && (
                        <View
                            className="rounded-2.5 absolute top-full right-0 left-0 z-20 mt-1 overflow-hidden border border-border bg-surface"
                            style={{
                                elevation: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                            }}>
                            {filteredCharacters.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    className="flex-row items-center gap-2.5 border-b border-border px-3 py-2.5"
                                    onPress={() => handleSelect(item)}>
                                    <Image
                                        className="size-8 rounded-2xl"
                                        contentFit="cover"
                                        source={{
                                            uri: addImageResizeParams(
                                                item.characterImage,
                                                64,
                                                64
                                            ),
                                        }}
                                    />
                                    <Text className="text-sm text-foreground">
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
