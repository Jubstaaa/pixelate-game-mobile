import React, { useCallback } from 'react'

import { Image } from '@/lib/image'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/constants/colors'
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
        <View style={[styles.card, !item.isActive && styles.inactive]}>
            <View style={styles.body}>
                <Image
                    style={styles.icon}
                    contentFit="contain"
                    source={{ uri: addImageResizeParams(item.icon, 128, 128) }}
                />
                <Text style={styles.name}>{item.name}</Text>
            </View>

            <View style={styles.footer}>
                {item.isActive ? (
                    <>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={handleEasyPress}>
                            <Text style={styles.btnText}>Easy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={handleHardPress}>
                            <Text style={styles.btnText}>Hard</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.comingSoon}>
                        <Text style={styles.comingSoonText}>Coming Soon</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    inactive: {
        opacity: 0.4,
    },
    body: {
        alignItems: 'center',
        gap: 12,
        padding: 24,
    },
    icon: {
        width: 80,
        height: 80,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.foreground,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        padding: 16,
    },
    btn: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    btnText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.foreground,
    },
    comingSoon: {
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    comingSoonText: {
        fontSize: 13,
        color: COLORS.muted,
    },
})
