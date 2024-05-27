import { getStrategyByName, getStrategyTrades } from '@/utils/akira-db-api'
import { Strategy, Trade } from '@/utils/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'


const StrategyCard = ({ strategy, trades }: { strategy: Strategy, trades: Trade[] }) => {
    const latestTrade = trades[0]
    const firstTrade = trades[trades.length - 1]
    const { exitPrice, entryAccountSize, exitAccountSize, direction, entryPrice } = latestTrade
    const { active } = strategy

    const calculatePnl = () => {
        const startingAccountSize = Number(firstTrade.entryAccountSize)
        let latestAccountSize = Number(entryAccountSize)
        if (exitAccountSize) latestAccountSize = Number(exitAccountSize)

        const pnl = Number((((latestAccountSize - startingAccountSize) / startingAccountSize) * 100).toFixed(2))

        return pnl
    }

    const pnl = calculatePnl()

    const inTrade = !exitPrice

    return (
        <Link href={`/${strategy.name}`}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {strategy.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between">
                    <div>
                        <div className={`${active ? 'text-green-300' : 'text-stone-100'}`}>{active ? 'Active' : 'Inactive'}</div>
                        <div className={`${active ? 'text-green-300' : 'text-stone-100'}`}>{inTrade ? "In trade" : 'Awaiting signal'}</div>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Bot PNL</p>
                        <p className={`text-xl font-semibold ${pnl > 0 ? 'text-green-300' : 'text-red-300'}`}>{pnl}%</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default async function Page() {
    const { data: strategy } = await getStrategyByName('ICHIMOKU_WILLIAMS_LONG')
    const { data: trades} = await getStrategyTrades('ICHIMOKU_WILLIAMS_LONG')

    if (!strategy) return <div>something went wrong</div>

    return (
        <div className="flex flex-col gap-20 justify-center items-center">
            <div className="text-center">
                <p>
                    As part of my 1 project every month coding challenge I made a trading bot framework.
                </p>
                <p>
                    Click on one of the cards to view more information.
                </p>
            </div>
            <div className="flex flex-wrap gap-8">
                <StrategyCard strategy={strategy} trades={trades}  />
            </div>
        </div>
    )
}
