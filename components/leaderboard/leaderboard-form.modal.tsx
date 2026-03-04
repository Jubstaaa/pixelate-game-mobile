import React, { useCallback, useState } from 'react'

import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/constants/colors'

import { LeaderboardForm } from './leaderboard-form'

export const LeaderboardFormModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = useCallback(() => setIsOpen(true), [])
    const handleClose = useCallback(() => setIsOpen(false), [])

    return (
        <>
            <TouchableOpacity style={styles.trigger} onPress={handleOpen}>
                <Text style={styles.triggerText}>Join Ranking</Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={isOpen}
                onRequestClose={handleClose}>
                <View style={styles.overlay}>
                    <View style={styles.sheet}>
                        <Text style={styles.title}>Join the Ranking</Text>
                        <Text style={styles.subtitle}>
                            Enter your username to join the leaderboard.
                        </Text>
                        <LeaderboardForm onSuccess={handleClose} />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    trigger: {
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    triggerText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 24,
    },
    sheet: {
        width: '100%',
        gap: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        padding: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.foreground,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.muted,
        marginTop: -8,
    },
})
