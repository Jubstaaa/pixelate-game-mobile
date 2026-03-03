export interface ApiResponse<T> {
    data: T
    message?: string
}

export interface Category {
    icon: string
    id: number
    isActive: boolean
    name: string
    slug: string
}

export interface Character {
    characterImage: string
    id: number
    name: string
}

export interface Device {
    id: number
    username?: string
}

export interface GameData {
    characterImage: string
    count: number
    maxStreak: number
    streak: number
}

export interface LeaderboardEntry {
    device: { username: string }
    maxStreak: number
}
