import '../global.css'

import React from 'react'

import { Provider } from 'react-redux'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { COLORS } from '@/constants/colors'
import { store } from '@/store'

const RootLayout = () => (
    <Provider store={store}>
        <StatusBar style="light" />
        <Stack
            screenOptions={{
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: COLORS.background },
                headerShown: false,
            }}
        />
    </Provider>
)

export default RootLayout
