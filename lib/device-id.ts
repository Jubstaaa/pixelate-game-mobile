import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Crypto from 'expo-crypto'

const DEVICE_ID_KEY = 'device-id'

export async function getDeviceId(): Promise<string> {
    let id = await AsyncStorage.getItem(DEVICE_ID_KEY)
    if (!id) {
        id = Crypto.randomUUID()
        await AsyncStorage.setItem(DEVICE_ID_KEY, id)
    }
    return id
}
