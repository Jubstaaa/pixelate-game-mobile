import React, { useMemo } from 'react'

import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'

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
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator color={COLORS.primary} />
            </View>
        )
    }

    if (!category) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-[16px] text-muted">
                    Category not found.
                </Text>
            </View>
        )
    }

    return <Game categoryId={category.id} levelType={levelType} />
}
