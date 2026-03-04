import React, { useCallback } from 'react'

import { ChevronLeft } from 'lucide-react-native'

import { Image } from '@/lib/image'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/constants/colors'
import { useGetDeviceQuery } from '@/lib/api/game-api'
import { addImageResizeParams } from '@/lib/image-url'

import { LeaderboardFormModal } from '../leaderboard/leaderboard-form.modal'

import type { HeaderProps } from './header.types'

export const Header = ({ category }: HeaderProps) => {
    const router = useRouter()
    const { data: device } = useGetDeviceQuery()
    const handleBack = useCallback(() => router.back(), [router])

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                    <ChevronLeft color={COLORS.foreground} size={20} />
                </TouchableOpacity>
                <View style={styles.iconWrap}>
                    <Image
                        style={styles.icon}
                        contentFit="contain"
                        source={{
                            uri: addImageResizeParams(category.icon, 64, 64),
                        }}
                    />
                </View>
                <Text style={styles.categoryName} numberOfLines={1}>
                    {category.name}
                </Text>
            </View>

            <View style={styles.right}>
                {device?.username ? (
                    <View style={styles.usernameBadge}>
                        <Text style={styles.usernameText}>
                            {device.username}
                        </Text>
                    </View>
                ) : (
                    <LeaderboardFormModal />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: 'rgba(24, 24, 27, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    backBtn: {
        padding: 4,
    },
    iconWrap: {
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        padding: 6,
    },
    icon: {
        width: 24,
        height: 24,
    },
    categoryName: {
        flex: 1,
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.muted,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    usernameBadge: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    usernameText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.foreground,
    },
})
