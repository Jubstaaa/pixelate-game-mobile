import React, { useCallback } from 'react'

import { Trophy } from 'lucide-react-native'

import { FlatList, StyleSheet, Text, View } from 'react-native'

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
                    style={[
                        styles.row,
                        { backgroundColor: ROW_BG[index] ?? 'transparent' },
                        isCurrentUser && styles.currentUserRow,
                    ]}>
                    <Text
                        style={[
                            styles.rankText,
                            isCurrentUser && styles.currentUserText,
                        ]}
                        numberOfLines={1}>
                        {getRankEmoji(index)}
                    </Text>
                    <Text
                        style={[
                            styles.usernameText,
                            isCurrentUser && styles.currentUserText,
                        ]}
                        numberOfLines={1}>
                        {item.device.username}
                    </Text>
                    <View style={styles.scoreCell}>
                        <Trophy
                            color={
                                isCurrentUser ? COLORS.primary : COLORS.muted
                            }
                            size={14}
                        />
                        <Text
                            style={[
                                styles.scoreText,
                                isCurrentUser && styles.currentUserText,
                            ]}>
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerText, { flex: 0.8 }]}>Rank</Text>
                <Text style={[styles.headerText, { flex: 3 }]}>User</Text>
                <Text style={[styles.headerText, styles.headerRight, { flex: 1 }]}>
                    Score
                </Text>
            </View>

            <FlatList
                ListEmptyComponent={
                    <Text style={styles.empty}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 4,
    },
    headerText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: COLORS.muted,
        textTransform: 'uppercase',
    },
    headerRight: {
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 4,
    },
    currentUserRow: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(0, 111, 238, 0.1)',
    },
    rankText: {
        flex: 0.8,
        fontSize: 14,
        color: COLORS.foreground,
    },
    usernameText: {
        flex: 3,
        fontSize: 14,
        color: COLORS.foreground,
    },
    currentUserText: {
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    scoreCell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
    },
    scoreText: {
        fontSize: 14,
        color: COLORS.foreground,
    },
    empty: {
        marginTop: 24,
        textAlign: 'center',
        color: COLORS.muted,
    },
})
