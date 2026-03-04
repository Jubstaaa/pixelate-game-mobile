import React from 'react'

import { StyleSheet, View } from 'react-native'

import { COLORS } from '@/constants/colors'

const LOADER_ROWS = 7

export const LeaderboardLoader = () => (
    <View style={styles.container}>
        <View style={styles.headerRow}>
            <View style={[styles.bar, { flex: 0.8 }]} />
            <View style={[styles.bar, { flex: 3, marginHorizontal: 8 }]} />
            <View style={[styles.bar, { flex: 1 }]} />
        </View>

        {Array.from({ length: LOADER_ROWS }).map((_, i) => (
            <View key={i} style={styles.row}>
                <View style={[styles.rowBar, { flex: 0.8 }]} />
                <View style={[styles.rowBar, { flex: 3, marginHorizontal: 8 }]} />
                <View style={[styles.rowBar, { flex: 1 }]} />
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 4,
    },
    bar: {
        height: 12,
        borderRadius: 4,
        backgroundColor: COLORS.surfaceHover,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 4,
    },
    rowBar: {
        height: 20,
        borderRadius: 4,
        backgroundColor: COLORS.surfaceHover,
        opacity: 0.6,
    },
})
