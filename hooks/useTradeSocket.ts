import { useEffect } from "react";
import { useLiveStore } from "@/store/liveStore";

export default function useTradeSocket() {

  const addTrade = useLiveStore((state) => state.addTrade);

  useEffect(() => {

    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {

      const data = JSON.parse(event.data);

      addTrade(data);

    };

    return () => ws.close();

  }, []);

}