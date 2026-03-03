import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api'
import { getDeviceId } from '@/lib/device-id'

import type {
    ApiResponse,
    Category,
    Character,
    Device,
    GameData,
    LeaderboardEntry,
} from './game-api.types'

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async headers => {
        const id = await getDeviceId()
        headers.set('x-device-id', id)
        return headers
    },
})

const baseQuery: typeof rawBaseQuery = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions)

    const isMutation =
        typeof args === 'object' &&
        args !== null &&
        'method' in args &&
        ['POST', 'PUT', 'DELETE', 'PATCH'].includes(
            (args as { method?: string }).method?.toUpperCase() ?? ''
        )

    if (isMutation && result.error) {
        console.error('API Error:', result.error)
    }

    return result
}

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery,
    tagTypes: ['Device'],
    endpoints: builder => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({ url: 'api/categories', method: 'GET' }),
            transformResponse: (r: ApiResponse<Category[]>) =>
                r.data ?? (r as unknown as Category[]),
        }),
        getCharacters: builder.query<Character[], { categoryId: number }>({
            query: ({ categoryId }) => ({
                url: 'api/characters',
                params: { categoryId },
            }),
            transformResponse: (r: ApiResponse<Character[]>) =>
                r.data ?? (r as unknown as Character[]),
        }),
        getDevice: builder.query<Device, void>({
            query: () => ({ url: 'api/device', method: 'GET' }),
            transformResponse: (r: ApiResponse<Device>) =>
                r.data ?? (r as unknown as Device),
            providesTags: ['Device'],
        }),
        getGameData: builder.query<
            GameData,
            { categoryId: number; levelType: number }
        >({
            query: ({ categoryId, levelType }) => ({
                url: 'api/game',
                params: { categoryId, level_type: levelType },
            }),
            transformResponse: (r: ApiResponse<GameData>) =>
                r.data ?? (r as unknown as GameData),
        }),
        getLeaderboard: builder.query<
            LeaderboardEntry[],
            { categoryId: number; levelType: number }
        >({
            query: ({ categoryId, levelType }) => ({
                url: 'api/leaderboard',
                params: { categoryId, level_type: levelType },
            }),
            transformResponse: (r: ApiResponse<LeaderboardEntry[]>) =>
                r.data ?? (r as unknown as LeaderboardEntry[]),
        }),
        saveDevice: builder.mutation<Device, { username: string }>({
            query: ({ username }) => ({
                url: 'api/device',
                method: 'POST',
                body: { username },
            }),
            transformResponse: (r: ApiResponse<Device>) =>
                r.data ?? (r as unknown as Device),
            invalidatesTags: ['Device'],
        }),
        sendFeedback: builder.mutation<
            void,
            { feedback: string; rating: string | null }
        >({
            query: ({ feedback, rating }) => ({
                url: 'api/feedback',
                method: 'POST',
                body: { feedback, rating },
            }),
        }),
        submitGuess: builder.mutation<
            GameData,
            { categoryId: number; id: number; levelType: number }
        >({
            query: ({ id, categoryId, levelType }) => ({
                url: 'api/game',
                method: 'POST',
                body: { id, categoryId, level_type: levelType },
            }),
            transformResponse: (r: ApiResponse<GameData>) =>
                r.data ?? (r as unknown as GameData),
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useGetCharactersQuery,
    useGetDeviceQuery,
    useGetGameDataQuery,
    useGetLeaderboardQuery,
    useSaveDeviceMutation,
    useSendFeedbackMutation,
    useSubmitGuessMutation,
} = gameApi
