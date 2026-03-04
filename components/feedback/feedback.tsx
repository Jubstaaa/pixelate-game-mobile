import React, { useCallback, useState } from 'react'

import { Frown, Meh, Smile, ThumbsUp } from 'lucide-react-native'

import {
    ActivityIndicator,
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
        <View className="gap-[14px]">
            <TextInput
                multiline
                className="rounded-[10px] border border-border bg-surface p-3 text-sm text-foreground min-h-[110px]"
                placeholderTextColorClassName="accent-muted"
                numberOfLines={5}
                placeholder="Ideas or suggestions to improve our product"
                textAlignVertical="top"
                value={feedback}
                onChangeText={setFeedback}
            />

            <View className="flex-row gap-2">
                {RATINGS.map(({ Icon, label }) => (
                    <TouchableOpacity
                        key={label}
                        className={`flex-1 items-center rounded-lg border py-[10px]${selectedRating === label ? ' border-primary bg-primary/[0.08]' : ' border-border'}`}
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
                className={`rounded-[10px] items-center bg-primary py-[13px]${isLoading ? ' opacity-60' : ''}`}
                disabled={isLoading}
                onPress={handleSubmit}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text className="text-[15px] font-semibold text-primary-foreground">
                        Submit
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}
