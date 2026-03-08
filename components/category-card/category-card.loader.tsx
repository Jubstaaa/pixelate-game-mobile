import React from 'react'

import { View } from 'react-native'

export const CategoryCardLoader = () => (
    <View className="overflow-hidden rounded-2xl border border-border bg-surface">
        <View className="flex-row items-center gap-4 px-4 py-4">
            <View className="h-[68px] w-[68px] rounded-xl bg-surface-hover opacity-60" />
            <View className="flex-1 gap-2.5">
                <View className="h-5 w-32 rounded-lg bg-surface-hover opacity-60" />
                <View className="flex-row gap-2">
                    <View className="h-7 w-16 rounded-lg bg-surface-hover opacity-60" />
                    <View className="h-7 w-16 rounded-lg bg-surface-hover opacity-60" />
                </View>
            </View>
        </View>
    </View>
)
