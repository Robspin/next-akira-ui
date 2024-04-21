import { getStrategies, getStrategyTrades } from '@/utils/akira-db-api'
import { strategies as strategyConstants, Strategy, Trade } from '@/utils/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LineChartComponent from '@/components/charts/line-chart'


const StrategySection = ({ strategy, trades }: { strategy: Strategy, trades: Trade[] }) => {
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
        <div>
            <h3 className="text-2xl tracking-tighter font-bold mb-4">{strategy.name}</h3>
            <div className="flex flex-col gap-24">
                <div className="inline-block w-full">
                    <div className="flex max-lg:flex-col justify-between gap-4">
                        <div className="inline-block">
                            <Card>
                                <CardHeader>
                                    <CardDescription>
                                        A combination of using the ichimoku clouds and williams fractals
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between">
                                        <ul className="list-disc px-4">
                                            <li className="text-stone-400">Bot active: <span className={`${active ? 'text-green-300' : 'text-stone-100'}`}>{active ? 'True' : 'False'}</span></li>
                                            <li className="text-stone-400">In trade: <span className={`${inTrade ? 'text-green-300' : 'text-stone-100'}`}>{inTrade ? "True" : 'False'}</span></li>
                                        </ul>
                                        <div className="text-center">
                                            <p className="font-semibold">Account PNL</p>
                                            <p className={`text-xl font-semibold ${pnl > 0 ? 'text-green-300' : 'text-red-300'}`}>{pnl}%</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-[452px] h-[252px] bg-stone-700 px-4 pt-8 rounded">
                            <LineChartComponent />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="text-lg font-semibold border-b border-b-stone-700 mb-4">Trades</h4>
                    <div className="grid lg:grid-cols-2 gap-4">
                        {trades.map((t, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <CardDescription>
                                        {t.direction}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {t.createdAt}
                                </CardContent>
                            </Card>
                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default async function Page() {
    const { data: strategies } = await getStrategies()
    const { data: trades} = await getStrategyTrades(strategyConstants[0])

    return (
        <div className="flex flex-col gap-20">
            <p>An overview of my trading bots their status and current result</p>
            <div>
                {strategies.map((s) => <StrategySection key={s.name} strategy={s} trades={trades} />)}
            </div>
        </div>
    )
}
