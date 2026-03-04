import React, { useCallback, useState } from 'react'

import { MessageSquare, X } from 'lucide-react-native'

import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/constants/colors'

import { Feedback } from './feedback'

export const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = useCallback(() => setIsOpen(true), [])
    const handleClose = useCallback(() => setIsOpen(false), [])

    return (
        <>
            <TouchableOpacity style={styles.trigger} onPress={handleOpen}>
                <MessageSquare color={COLORS.muted} size={14} />
                <Text style={styles.triggerText}>Feedback</Text>
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={isOpen}
                onRequestClose={handleClose}>
                <View style={styles.overlay}>
                    <View style={styles.sheet}>
                        <View style={styles.sheetHeader}>
                            <View>
                                <Text style={styles.title}>
                                    Share your thoughts
                                </Text>
                                <Text style={styles.subtitle}>
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

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    triggerText: {
        fontSize: 13,
        color: COLORS.muted,
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
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.foreground,
    },
    subtitle: {
        marginTop: 3,
        fontSize: 13,
        color: COLORS.muted,
    },
})
