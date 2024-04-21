
export const strategies = ['ICHIMOKU_WILLIAMS_LONG']

export type Trade = {
    id: string
    direction: 'LONG' | 'SHORT'
    orderId: string
    entryPrice: string
    entryAccountSize: string
    currentBtcPrice: string
    size: string
    exitPrice?: string
    exitAccountSize?: string
    strategyId: string
    strategyName: string
    createdAt: string
    updatedAt: string
    exitedTradeAt?: string
    deletedAt?: string
}

export type Strategy = {
    id: string
    name: string
    active: boolean
    inTrade: boolean
    createdAt: string
    updatedAt: string
    deletedAt: null
}
