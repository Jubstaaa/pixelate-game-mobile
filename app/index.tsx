import React, { useMemo } from 'react'

import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CategoryCard } from '@/components/category-card/category-card'
import { CategoryCardLoader } from '@/components/category-card/category-card.loader'
import { FeedbackModal } from '@/components/feedback/feedback.modal'
import { useGetCategoriesQuery } from '@/lib/api/game-api'

const LOADER_COUNT = 4

const HomeScreen = () => {
    const { data: categories = [], isLoading, error } = useGetCategoriesQuery()

    if (error) console.error('Categories error:', JSON.stringify(error))

    const loaderItems = useMemo(() => Array.from({ length: LOADER_COUNT }), [])

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView
                className="px-4"
                contentContainerClassName="pb-8"
                showsVerticalScrollIndicator={false}>
                <View className="items-center gap-3 pt-10 pb-8">
                    <View className="rounded-1.5 border border-border px-2.5 py-1">
                        <Text className="text-xs text-foreground">
                            Open Beta!
                        </Text>
                    </View>
                    <Text className="text-[42px] font-extrabold -tracking-[1px] text-primary">
                        Pixel Guess
                    </Text>
                    <Text className="max-w-75 text-center text-[15px] leading-[22px] text-muted">
                        Challenge yourself! Pick a category and guess the hidden
                        image pixel by pixel.
                    </Text>
                </View>

                <View className="gap-4">
                    {isLoading
                        ? loaderItems.map((_, i) => (
                              <CategoryCardLoader key={i} />
                          ))
                        : categories.map(item => (
                              <CategoryCard key={item.id} item={item} />
                          ))}
                </View>

                <View className="mt-10 items-center">
                    <FeedbackModal />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
