import React from 'react'

import { View } from 'react-native'

const LOADER_ROWS = 7

export const LeaderboardLoader = () => (
    <View className="flex-1">
        <View className="flex-row border-b border-border px-3 py-2 mb-1">
            <View className="h-3 rounded bg-surface-hover" style={{ flex: 0.8 }} />
            <View className="h-3 rounded bg-surface-hover mx-2" style={{ flex: 3 }} />
            <View className="h-3 rounded bg-surface-hover" style={{ flex: 1 }} />
        </View>

        {Array.from({ length: LOADER_ROWS }).map((_, i) => (
            <View key={i} className="flex-row items-center rounded-lg px-3 py-[10px] mb-1">
                <View className="h-5 rounded bg-surface-hover opacity-60" style={{ flex: 0.8 }} />
                <View className="h-5 rounded bg-surface-hover opacity-60 mx-2" style={{ flex: 3 }} />
                <View className="h-5 rounded bg-surface-hover opacity-60" style={{ flex: 1 }} />
            </View>
        ))}
    </View>
)
