import React, { useMemo } from 'react'

import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/constants/colors'
import { useGetCategoriesQuery } from '@/lib/api/game-api'

import { Game } from '../game/game'

import type { GameScreenProps } from './game-screen.types'

export const GameScreen = ({ levelType }: GameScreenProps) => {
    const { categorySlug } = useLocalSearchParams<{ categorySlug: string }>()

    const { data: categories = [], isLoading } = useGetCategoriesQuery()

    const category = useMemo(
        () => categories.find(c => c.slug === categorySlug),
        [categories, categorySlug]
    )

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={COLORS.primary} />
            </View>
        )
    }

    if (!category) {
        return (
            <View style={styles.center}>
                <Text style={styles.notFound}>Category not found.</Text>
            </View>
        )
    }

    return <Game categoryId={category.id} levelType={levelType} />
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFound: {
        fontSize: 16,
        color: COLORS.muted,
    },
})
