import React, { useCallback, useState } from 'react'

import { BarChart2, X } from 'lucide-react-native'

import { Modal, Text, TouchableOpacity, View } from 'react-native'
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
            <TouchableOpacity
                className="w-12 h-12 rounded-[10px] items-center justify-center border border-border bg-surface"
                onPress={handleOpen}>
                <BarChart2 color={COLORS.foreground} size={22} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                presentationStyle="pageSheet"
                visible={isOpen}
                onRequestClose={handleClose}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
                    <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
                        <Text className="text-lg font-bold text-foreground">
                            Leaderboard
                        </Text>
                        <View className="flex-row items-center gap-[10px]">
                            {!device?.username && <LeaderboardFormModal />}
                            <TouchableOpacity className="p-1" onPress={handleClose}>
                                <X color={COLORS.foreground} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-1 px-4 pt-2">
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
