import React, { useCallback, useState } from 'react'

import { Modal, Text, TouchableOpacity, View } from 'react-native'

import { LeaderboardForm } from './leaderboard-form'

export const LeaderboardFormModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = useCallback(() => setIsOpen(true), [])
    const handleClose = useCallback(() => setIsOpen(false), [])

    return (
        <>
            <TouchableOpacity
                className="rounded-lg bg-primary px-[14px] py-2"
                onPress={handleOpen}>
                <Text className="text-[13px] font-semibold text-white">
                    Join Ranking
                </Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={isOpen}
                onRequestClose={handleClose}>
                <View className="flex-1 items-center justify-center bg-black/70 p-6">
                    <View className="w-full gap-4 rounded-2xl border border-border bg-surface p-6">
                        <Text className="text-lg font-bold text-foreground">
                            Join the Ranking
                        </Text>
                        <Text className="-mt-2 text-[13px] text-muted">
                            Enter your username to join the leaderboard.
                        </Text>
                        <LeaderboardForm onSuccess={handleClose} />
                    </View>
                </View>
            </Modal>
        </>
    )
}
