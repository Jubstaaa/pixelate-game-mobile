import React, { useMemo } from 'react'

import { Slot, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@/components/header/header'
import { COLORS } from '@/constants/colors'
import { useGetCategoriesQuery } from '@/lib/api/game-api'

const CategoryLayout = () => {
    const { categorySlug } = useLocalSearchParams<{ categorySlug: string }>()

    const { data: categories = [] } = useGetCategoriesQuery()

    const category = useMemo(
        () => categories.find(c => c.slug === categorySlug) ?? null,
        [categories, categorySlug]
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
                {category ? (
                    <Header category={category} />
                ) : (
                    <View style={styles.headerPlaceholder}>
                        <ActivityIndicator color={COLORS.primary} />
                    </View>
                )}
                <Slot />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    inner: {
        flex: 1,
        gap: 12,
        paddingHorizontal: 12,
        paddingTop: 8,
    },
    headerPlaceholder: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default CategoryLayout
