import React, { useMemo } from 'react'

import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CategoryCard } from '@/components/category-card/category-card'
import { CategoryCardLoader } from '@/components/category-card/category-card.loader'
import { FeedbackModal } from '@/components/feedback/feedback.modal'
import { COLORS } from '@/constants/colors'
import { useGetCategoriesQuery } from '@/lib/api/game-api'

const LOADER_COUNT = 4

const HomeScreen = () => {
    const { data: categories = [], isLoading, error } = useGetCategoriesQuery()

    if (error) console.error('Categories error:', JSON.stringify(error))

    const loaderItems = useMemo(() => Array.from({ length: LOADER_COUNT }), [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Open Beta!</Text>
                    </View>
                    <Text style={styles.title}>Pixel Guess</Text>
                    <Text style={styles.subtitle}>
                        Challenge yourself! Pick a category and guess the hidden
                        image pixel by pixel.
                    </Text>
                </View>

                <View style={styles.list}>
                    {isLoading
                        ? loaderItems.map((_, i) => (
                              <CategoryCardLoader key={i} />
                          ))
                        : categories.map(item => (
                              <CategoryCard key={item.id} item={item} />
                          ))}
                </View>

                <View style={styles.footer}>
                    <FeedbackModal />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scroll: {
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    hero: {
        alignItems: 'center',
        gap: 12,
        paddingTop: 40,
        paddingBottom: 32,
    },
    badge: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    badgeText: {
        fontSize: 12,
        color: COLORS.foreground,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        letterSpacing: -1,
        color: COLORS.primary,
    },
    subtitle: {
        maxWidth: 300,
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 22,
        color: COLORS.muted,
    },
    list: {
        gap: 16,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
    },
})

export default HomeScreen
