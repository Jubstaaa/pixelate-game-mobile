import React from 'react'

import { View } from 'react-native'

const LOADER_ROWS = 7

export const LeaderboardLoader = () => (
    <View className="flex-1">
        <View className="mb-1 flex-row border-b border-border px-3 py-2">
            <View
                className="h-3 rounded bg-surface-hover"
                style={{ flex: 0.8 }}
            />
            <View
                className="mx-2 h-3 rounded bg-surface-hover"
                style={{ flex: 3 }}
            />
            <View
                className="h-3 rounded bg-surface-hover"
                style={{ flex: 1 }}
            />
        </View>

        {Array.from({ length: LOADER_ROWS }).map((_, i) => (
            <View
                key={i}
                className="mb-1 flex-row items-center rounded-lg px-3 py-2.5">
                <View
                    className="h-5 rounded bg-surface-hover opacity-60"
                    style={{ flex: 0.8 }}
                />
                <View
                    className="mx-2 h-5 rounded bg-surface-hover opacity-60"
                    style={{ flex: 3 }}
                />
                <View
                    className="h-5 rounded bg-surface-hover opacity-60"
                    style={{ flex: 1 }}
                />
            </View>
        ))}
    </View>
)
