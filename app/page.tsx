import Image from "next/image";
import { unstable_noStore as noStore } from 'next/cache'

const getData = async () => {
    noStore()
    const headers = {
        'Authorization': process.env.DB_API_AUTHORIZATION_KEY ?? ''
    }

    try {
        const res = await (await fetch(`${process.env.DB_API_URL}/strategies`, { headers })).json()
        return res.data[0]
    } catch (e) {
        console.log(e)
    }
}

export default async function Page() {
    const strategyData = await getData()

  return (
    <main className="text-white p-8 flex flex-col items-center">
        <div className="mb-16">
            <Image src="/akira-bg.png" alt="akira background" width={360} height={360} />
        </div>
        <ul>
            {Object.entries(strategyData).map(([k, v], i: number) => (
                <li key={i}><span className="text-gray-500 mr-4">{k}:</span> <span>{String(v)}</span></li>
            ))}
        </ul>
    </main>
  );
}
