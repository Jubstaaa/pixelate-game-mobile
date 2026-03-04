import React from 'react'

import { StyleSheet, View } from 'react-native'

import { COLORS } from '@/constants/colors'

export const CategoryCardLoader = () => (
    <View style={styles.card}>
        <View style={styles.body}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.namePlaceholder} />
        </View>

        <View style={styles.footer}>
            <View style={styles.btnPlaceholder} />
            <View style={styles.btnPlaceholder} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    body: {
        alignItems: 'center',
        gap: 12,
        padding: 24,
    },
    iconPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 9999,
        backgroundColor: COLORS.surfaceHover,
        opacity: 0.6,
    },
    namePlaceholder: {
        height: 20,
        width: 96,
        borderRadius: 4,
        backgroundColor: COLORS.surfaceHover,
        opacity: 0.6,
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
    btnPlaceholder: {
        height: 36,
        width: 64,
        borderRadius: 8,
        backgroundColor: COLORS.surfaceHover,
        opacity: 0.6,
    },
})
