import React, { useCallback } from 'react'

import { Trophy } from 'lucide-react-native'

import { FlatList, Text, View } from 'react-native'

import { COLORS } from '@/constants/colors'
import { useGetDeviceQuery, useGetLeaderboardQuery } from '@/lib/api/game-api'
import type { LeaderboardEntry } from '@/lib/api/game-api.types'
import { cn } from '@/lib/cn'

import { LeaderboardLoader } from './leaderboard.loader'
import type { LeaderboardProps } from './leaderboard.types'

const getRankEmoji = (index: number): string => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `  ${index + 1}`
}

const ROW_BG: Record<number, string> = {
    0: 'bg-[rgba(234,179,8,0.08)]',
    1: 'bg-[rgba(161,161,170,0.08)]',
    2: 'bg-[rgba(249,115,22,0.08)]',
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
                    className={cn(
                        'mb-1 flex-row items-center rounded-lg px-3 py-[10px]',
                        ROW_BG[index],
                        isCurrentUser && 'border border-primary bg-primary/10'
                    )}>
                    <Text
                        className={cn(
                            'text-sm',
                            isCurrentUser
                                ? 'font-bold text-primary'
                                : 'text-foreground'
                        )}
                        style={{ flex: 0.8 }}>
                        {getRankEmoji(index)}
                    </Text>
                    <Text
                        className={cn(
                            'text-sm',
                            isCurrentUser
                                ? 'font-bold text-primary'
                                : 'text-foreground'
                        )}
                        numberOfLines={1}
                        style={{ flex: 3 }}>
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
                            className={cn(
                                'text-sm',
                                isCurrentUser
                                    ? 'font-bold text-primary'
                                    : 'text-foreground'
                            )}>
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
            <View className="mb-1 flex-row border-b border-border px-3 py-2">
                <Text
                    className="text-xs font-semibold tracking-[0.5] text-muted uppercase"
                    style={{ flex: 0.8 }}>
                    Rank
                </Text>
                <Text
                    className="text-xs font-semibold tracking-[0.5] text-muted uppercase"
                    style={{ flex: 3 }}>
                    User
                </Text>
                <Text
                    className="text-right text-xs font-semibold tracking-[0.5] text-muted uppercase"
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
