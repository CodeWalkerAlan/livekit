"use client";

import { useLiveStore } from "@/store/liveStore";

export default function TradeList() {

  const trades = useLiveStore((state) => state.trades);

  return (

    <div className="bg-gray-900 p-4 h-[400px] overflow-auto">

      {trades.map((trade) => (

        <div key={trade.id} className="text-green-400">

          {trade.user} bought {trade.amount} {trade.token}

        </div>

      ))}

    </div>

  );

}