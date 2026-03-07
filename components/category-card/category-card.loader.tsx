import React from 'react'

import { View } from 'react-native'

export const CategoryCardLoader = () => (
    <View className="overflow-hidden rounded-[14px] border border-border bg-surface">
        <View className="items-center gap-3 p-6">
            <View className="h-20 w-20 rounded-full bg-surface-hover opacity-60" />
            <View className="h-5 w-24 rounded bg-surface-hover opacity-60" />
        </View>

        <View className="flex-row justify-center gap-3 border-t border-border bg-white/[0.03] p-4">
            <View className="h-9 w-16 rounded-lg bg-surface-hover opacity-60" />
            <View className="h-9 w-16 rounded-lg bg-surface-hover opacity-60" />
        </View>
    </View>
)
