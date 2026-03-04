import React, { useCallback } from 'react'

import { Trophy } from 'lucide-react-native'

import { FlatList, Text, View } from 'react-native'

import { COLORS } from '@/constants/colors'
import { useGetDeviceQuery, useGetLeaderboardQuery } from '@/lib/api/game-api'
import type { LeaderboardEntry } from '@/lib/api/game-api.types'

import { LeaderboardLoader } from './leaderboard.loader'
import type { LeaderboardProps } from './leaderboard.types'

const getRankEmoji = (index: number): string => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `  ${index + 1}`
}

const ROW_BG: Record<number, string> = {
    0: 'rgba(234,179,8,0.08)',
    1: 'rgba(161,161,170,0.08)',
    2: 'rgba(249,115,22,0.08)',
}

export const Leaderboard = ({
    categoryId,
    levelType,
    isVisible,
}: LeaderboardProps) => {
    const { data: device } = useGetDeviceQuery()
    const { data = [], isLoading } = useGetLeaderboardQuery(
        { categoryId, levelType },
        { skip: !isVisible, refetchOnMountOrArgChange: true }
    )

    const renderItem = useCallback(
        ({ item, index }: { index: number; item: LeaderboardEntry }) => {
            const isCurrentUser = item.device?.username === device?.username
            return (
                <View
                    className={`flex-row items-center rounded-lg px-3 py-[10px] mb-1${isCurrentUser ? ' border border-primary bg-primary/10' : ''}`}
                    style={{
                        backgroundColor: isCurrentUser
                            ? 'rgba(0,111,238,0.1)'
                            : (ROW_BG[index] ?? 'transparent'),
                    }}>
                    <Text
                        className={`text-sm text-foreground${isCurrentUser ? ' font-bold text-primary' : ''}`}
                        style={{ flex: 0.8 }}
                        numberOfLines={1}>
                        {getRankEmoji(index)}
                    </Text>
                    <Text
                        className={`text-sm text-foreground${isCurrentUser ? ' font-bold text-primary' : ''}`}
                        style={{ flex: 3 }}
                        numberOfLines={1}>
                        {item.device.username}
                    </Text>
                    <View
                        className="flex-row items-center justify-end gap-1"
                        style={{ flex: 1 }}>
                        <Trophy
                            color={
                                isCurrentUser ? COLORS.primary : COLORS.muted
                            }
                            size={14}
                        />
                        <Text
                            className={`text-sm text-foreground${isCurrentUser ? ' font-bold text-primary' : ''}`}>
                            {item.maxStreak}
                        </Text>
                    </View>
                </View>
            )
        },
        [device?.username]
    )

    if (isLoading) return <LeaderboardLoader />

    return (
        <View className="flex-1">
            <View className="flex-row border-b border-border px-3 py-2 mb-1">
                <Text
                    className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted"
                    style={{ flex: 0.8 }}>
                    Rank
                </Text>
                <Text
                    className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted"
                    style={{ flex: 3 }}>
                    User
                </Text>
                <Text
                    className="text-[12px] font-semibold uppercase tracking-[0.5px] text-muted text-right"
                    style={{ flex: 1 }}>
                    Score
                </Text>
            </View>

            <FlatList
                ListEmptyComponent={
                    <Text className="mt-6 text-center text-muted">
                        No entries yet. Be the first!
                    </Text>
                }
                data={data}
                keyExtractor={(_, i) => String(i)}
                renderItem={renderItem}
            />
        </View>
    )
}
