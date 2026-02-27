"use client";

import LivePlayer from "@/components/LivePlayer";
import TradeList from "@/components/TradeList";
import useTradeSocket from "@/hooks/useTradeSocket";
import CameraLive from "@/components/CameraLive";

export default function Page() {

  useTradeSocket();

  return (

    <div className="grid grid-cols-3 gap-4 p-6">

      <div className="col-span-2">

        <LivePlayer />

      </div>

      <TradeList />
      <CameraLive />

    </div>

  );

}