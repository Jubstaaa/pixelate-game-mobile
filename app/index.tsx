import React, { useMemo } from 'react'

import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CategoryCard } from '@/components/category-card/category-card'
import { CategoryCardLoader } from '@/components/category-card/category-card.loader'
import { FeedbackModal } from '@/components/feedback/feedback.modal'
import { useGetCategoriesQuery } from '@/lib/api/game-api'

const LOADER_COUNT = 4

const HomeScreen = () => {
    const { data: categories = [], isLoading } = useGetCategoriesQuery()

    const loaderItems = useMemo(() => Array.from({ length: LOADER_COUNT }), [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <ScrollView
                className="px-4"
                contentContainerClassName="pb-10"
                showsVerticalScrollIndicator={false}>
                <View className="items-center pt-12 pb-10">
                    <Text className="text-[48px] font-[900] tracking-[-2px] text-foreground">
                        Pixel
                        <Text className="text-primary"> Guess</Text>
                    </Text>
                    <Text className="mt-2 max-w-[280px] text-center text-[14px] leading-[21px] text-muted">
                        Pick a category and guess the hidden character pixel by pixel.
                    </Text>
                    <View className="mt-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-[5px]">
                        <Text className="text-[11px] font-[700] tracking-[1px] text-primary">
                            OPEN BETA
                        </Text>
                    </View>
                </View>

                <View className="gap-3">
                    {isLoading
                        ? loaderItems.map((_, i) => <CategoryCardLoader key={i} />)
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
