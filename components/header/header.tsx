import React, { useCallback } from 'react'

import { ChevronLeft } from 'lucide-react-native'

import { Image } from '@/lib/image'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '@/constants/colors'
import { useGetDeviceQuery } from '@/lib/api/game-api'
import { addImageResizeParams } from '@/lib/image-url'

import { LeaderboardFormModal } from '../leaderboard/leaderboard-form.modal'

import type { HeaderProps } from './header.types'

export const Header = ({ category }: HeaderProps) => {
    const router = useRouter()
    const { data: device } = useGetDeviceQuery()
    const handleBack = useCallback(() => router.back(), [router])

    return (
        <View className="flex-row items-center justify-between rounded-[14px] border border-border bg-surface/80 px-3 py-2.5">
          <View className="flex-1 flex-row items-center gap-2.5">
                <TouchableOpacity className="p-1" onPress={handleBack}>
                    <ChevronLeft color={COLORS.foreground} size={20} />
                </TouchableOpacity>
                <View className="rounded-full bg-primary p-1.5">
                    <Image
                        style={{ width: 24, height: 24 }}
                        contentFit="contain"
                        source={{
                            uri: addImageResizeParams(category.icon, 64, 64),
                        }}
                    />
                </View>
                <Text
                    className="flex-1 text-[13px] font-medium text-muted"
                    numberOfLines={1}>
                    {category.name}
                </Text>
            </View>

            <View className="flex-row items-center gap-2">
                {device?.username ? (
                    <View className="rounded-lg border border-border bg-surface px-3 py-1.5">
                        <Text className="text-[13px] font-semibold text-foreground">
                            {device.username}
                        </Text>
                    </View>
                ) : (
                    <LeaderboardFormModal />
                )}
            </View>
        </View>
    )
}
