import React, { useCallback, useState } from 'react'

import { BarChart2, X } from 'lucide-react-native'

import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { COLORS } from '@/constants/colors'
import { useGetDeviceQuery } from '@/lib/api/game-api'

import { Leaderboard } from './leaderboard'
import { LeaderboardFormModal } from './leaderboard-form.modal'
import type { LeaderboardDrawerProps } from './leaderboard.drawer.types'

export const LeaderboardDrawer = ({
    categoryId,
    levelType,
}: LeaderboardDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const { data: device } = useGetDeviceQuery()

    const handleOpen = useCallback(() => setIsOpen(true), [])
    const handleClose = useCallback(() => setIsOpen(false), [])

    return (
        <>
            <TouchableOpacity style={styles.triggerBtn} onPress={handleOpen}>
                <BarChart2 color={COLORS.foreground} size={22} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                presentationStyle="pageSheet"
                visible={isOpen}
                onRequestClose={handleClose}>
                <SafeAreaView style={styles.modal}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Leaderboard</Text>
                        <View style={styles.modalActions}>
                            {!device?.username && <LeaderboardFormModal />}
                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={handleClose}>
                                <X color={COLORS.foreground} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modalContent}>
                        <Leaderboard
                            categoryId={categoryId}
                            isVisible={isOpen}
                            levelType={levelType}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    triggerBtn: {
        width: 48,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    modal: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.foreground,
    },
    modalActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    closeBtn: {
        padding: 4,
    },
    modalContent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
})
