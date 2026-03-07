import React, { useCallback } from 'react'

import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { Image } from '@/lib/image'
import { addImageResizeParams } from '@/lib/image-url'

import type { CategoryCardProps } from './category-card.types'

export const CategoryCard = ({ item }: CategoryCardProps) => {
    const router = useRouter()

    const handleEasyPress = useCallback(
        () =>
            router.push({
                pathname: '/[categorySlug]/easy',
                params: { categorySlug: item.slug },
            }),
        [router, item.slug]
    )

    const handleHardPress = useCallback(
        () =>
            router.push({
                pathname: '/[categorySlug]/hard',
                params: { categorySlug: item.slug },
            }),
        [router, item.slug]
    )

    return (
        <View
            className={`overflow-hidden rounded-[14px] border border-border bg-surface${!item.isActive ? 'opacity-40' : ''}`}>
            <View className="items-center gap-3 p-6">
                <Image
                    contentFit="contain"
                    source={{ uri: addImageResizeParams(item.icon, 128, 128) }}
                    style={{ width: 80, height: 80 }}
                />
                <Text className="text-[16px] font-semibold text-foreground">
                    {item.name}
                </Text>
            </View>

            <View className="flex-row justify-center gap-3 border-t border-border bg-white/10 p-4">
                {item.isActive ? (
                    <>
                        <TouchableOpacity
                            className="rounded-lg border border-border px-5 py-2"
                            onPress={handleEasyPress}>
                            <Text className="text-sm font-medium text-foreground">
                                Easy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="rounded-lg border border-border px-5 py-2"
                            onPress={handleHardPress}>
                            <Text className="text-sm font-medium text-foreground">
                                Hard
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View className="rounded-full border border-border px-3.5 py-[6px]">
                        <Text className="text-[13px] text-muted">
                            Coming Soon
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}
