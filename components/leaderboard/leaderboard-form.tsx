import React, { useCallback, useState } from 'react'

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { COLORS } from '@/constants/colors'
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
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                style={styles.input}
                editable={!isLoading}
                placeholder="Username"
                placeholderTextColor={COLORS.muted}
                returnKeyType="done"
                value={username}
                onChangeText={setUsername}
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
                style={[styles.btn, isLoading && styles.btnDisabled]}
                disabled={isLoading}
                onPress={handleSubmit}>
                {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text style={styles.btnText}>Join</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: COLORS.foreground,
    },
    btn: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 13,
    },
    btnDisabled: {
        opacity: 0.6,
    },
    btnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ffffff',
    },
})
