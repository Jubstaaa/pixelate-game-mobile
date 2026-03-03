import React, { useCallback, useState } from 'react'

import { MessageSquare, X } from 'lucide-react-native'

import { Modal, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/constants/colors'

import { Feedback } from './feedback'

export const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = useCallback(() => setIsOpen(true), [])
    const handleClose = useCallback(() => setIsOpen(false), [])

    return (
        <>
            <TouchableOpacity
                className="flex-row items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5"
                onPress={handleOpen}>
                <MessageSquare color={COLORS.muted} size={14} />
                <Text className="text-[13px] text-muted">Feedback</Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={isOpen}
                onRequestClose={handleClose}>
                <View className="flex-1 items-center justify-center bg-black/70 p-6">
                    <View className="w-full gap-4 rounded-2xl border border-border bg-surface p-6">
                        <View className="flex-row items-start justify-between">
                            <View>
                                <Text className="text-[17px] font-bold text-foreground">
                                    Share your thoughts
                                </Text>
                                <Text className="mt-0.75 text-[13px] text-muted">
                                    We&apos;d love to hear your feedback.
                                </Text>
                            </View>
                            <TouchableOpacity onPress={handleClose}>
                                <X color={COLORS.muted} size={20} />
                            </TouchableOpacity>
                        </View>
                        <Feedback onClose={handleClose} />
                    </View>
                </View>
            </Modal>
        </>
    )
}
