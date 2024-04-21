import { unstable_noStore as noStore } from 'next/dist/server/web/spec-extension/unstable-no-store'
import { Strategy, Trade } from '@/utils/types'

export interface ApiResponse<T> {
    message: string
    data: T
    success: boolean
}

export const getStrategyTrades = async (strategy: string): Promise<ApiResponse<Trade[]>> => {
    noStore()
    const headers = {
        'Authorization': process.env.DB_API_AUTHORIZATION_KEY ?? ''
    }

    try {
        return  await (await fetch(`${process.env.DB_API_URL}/strategies/${strategy}/trades`, { headers })).json()
    } catch (e) {
        console.log(e)
        return {
            success: false,
            message: `Something went wrong: ${String(e)}`,
            data: []
        }
    }
}

export const getStrategies = async (): Promise<ApiResponse<Strategy[]>> => {
    noStore()
    const headers = {
        'Authorization': process.env.DB_API_AUTHORIZATION_KEY ?? ''
    }

    try {
        return await (await fetch(`${process.env.DB_API_URL}/strategies`, { headers })).json()
    } catch (e) {
        console.log(e)
        return {
            success: false,
            message: `Something went wrong: ${String(e)}`,
            data: []
        }
    }
}