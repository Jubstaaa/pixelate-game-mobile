import React, { useCallback, useState } from 'react'

import { Frown, Meh, Smile, ThumbsUp } from 'lucide-react-native'

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { COLORS } from '@/constants/colors'
import { useSendFeedbackMutation } from '@/lib/api/game-api'

import type { FeedbackProps } from './feedback.types'

const RATINGS = [
    { Icon: Frown, label: 'Poor' },
    { Icon: Meh, label: 'Okay' },
    { Icon: Smile, label: 'Good' },
    { Icon: ThumbsUp, label: 'Great' },
]

export const Feedback = ({ onClose }: FeedbackProps) => {
    const [feedback, setFeedback] = useState('')
    const [selectedRating, setSelectedRating] = useState<string | null>(null)

    const [sendFeedback, { isLoading }] = useSendFeedbackMutation()

    const handleSubmit = useCallback(async () => {
        if (!feedback.trim()) return
        try {
            await sendFeedback({ feedback, rating: selectedRating }).unwrap()
            onClose()
            setFeedback('')
            setSelectedRating(null)
        } catch (e) {
            console.error('Feedback error:', e)
        }
    }, [feedback, selectedRating, sendFeedback, onClose])

    return (
        <View style={styles.container}>
            <TextInput
                multiline
                style={styles.textArea}
                numberOfLines={5}
                placeholder="Ideas or suggestions to improve our product"
                placeholderTextColor={COLORS.muted}
                textAlignVertical="top"
                value={feedback}
                onChangeText={setFeedback}
            />

            <View style={styles.ratings}>
                {RATINGS.map(({ Icon, label }) => (
                    <TouchableOpacity
                        key={label}
                        style={[
                            styles.ratingBtn,
                            selectedRating === label && styles.ratingSelected,
                        ]}
                        onPress={() => setSelectedRating(label)}>
                        <Icon
                            color={
                                selectedRating === label
                                    ? COLORS.primary
                                    : COLORS.muted
                            }
                            size={22}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={[styles.submitBtn, isLoading && styles.submitDisabled]}
                disabled={isLoading}
                onPress={handleSubmit}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text style={styles.submitText}>Submit</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 14,
    },
    textArea: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        padding: 12,
        fontSize: 14,
        color: COLORS.foreground,
        minHeight: 110,
    },
    ratings: {
        flexDirection: 'row',
        gap: 8,
    },
    ratingBtn: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: 10,
    },
    ratingSelected: {
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(0, 111, 238, 0.08)',
    },
    submitBtn: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 13,
    },
    submitDisabled: {
        opacity: 0.6,
    },
    submitText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ffffff',
    },
})
