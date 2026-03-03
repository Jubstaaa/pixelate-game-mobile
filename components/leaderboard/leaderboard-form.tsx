import React, { useCallback, useState } from 'react'

import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { useSaveDeviceMutation } from '@/lib/api/game-api'
import { cn } from '@/lib/cn'

import type { LeaderboardFormProps } from './leaderboard-form.types'

export const LeaderboardForm = ({ onSuccess }: LeaderboardFormProps) => {
    const [username, setUsername] = useState('')

    const [saveDevice, { isLoading }] = useSaveDeviceMutation()

    const handleSubmit = useCallback(async () => {
        if (!username.trim()) return
        try {
            await saveDevice({ username: username.trim() }).unwrap()
            setUsername('')
            onSuccess?.()
        } catch (e) {
            console.error('Save device error:', e)
        }
    }, [username, saveDevice, onSuccess])

    return (
        <View className="gap-3">
            <TextInput
                autoCapitalize="none"
                className="rounded-2.5 border border-border bg-surface px-3.5 py-3 text-[15px] text-foreground"
                editable={!isLoading}
                placeholder="Username"
                placeholderTextColor="#71717a"
                returnKeyType="done"
                value={username}
                onChangeText={setUsername}
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
                className={cn(
                    'rounded-2.5 items-center bg-primary py-[13px]',
                    isLoading && 'opacity-60'
                )}
                disabled={isLoading}
                onPress={handleSubmit}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text className="text-[15px] font-semibold text-white">
                        Join
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}
