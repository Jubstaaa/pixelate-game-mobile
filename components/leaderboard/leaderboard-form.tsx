import React, { useCallback, useState } from 'react'

import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { useSaveDeviceMutation } from '@/lib/api/game-api'

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
                className="rounded-[10px] border border-border bg-surface px-[14px] py-3 text-[15px] text-foreground"
                editable={!isLoading}
                placeholder="Username"
                placeholderTextColorClassName="accent-muted"
                returnKeyType="done"
                value={username}
                onChangeText={setUsername}
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
                className={`items-center rounded-[10px] bg-primary py-[13px]${isLoading ? 'opacity-60' : ''}`}
                disabled={isLoading}
                onPress={handleSubmit}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text className="text-[15px] font-semibold text-primary-foreground">
                        Join
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}
