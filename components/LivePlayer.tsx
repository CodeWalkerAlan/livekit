"use client";

import { useEffect, useRef } from "react";
import { Room, Track } from "livekit-client";
import { useLiveStore } from "@/store/liveStore";

export default function LivePlayer() {

  const containerRef = useRef<HTMLDivElement>(null);

  const setLive = useLiveStore((state) => state.setLive);

  useEffect(() => {

    const room = new Room();

    const init = async () => {

      const res = await fetch("/api/token");

      const data = await res.json();

      await room.connect(
        process.env.NEXT_PUBLIC_LIVEKIT_URL!,
        data.token
      );

      setLive(true);

      room.on("trackSubscribed", (track) => {

        if (track.kind === Track.Kind.Video) {

          const element = track.attach();

          if (containerRef.current) {

            containerRef.current.innerHTML = "";

            containerRef.current.appendChild(element);

          }

        }

      });

    };

    init();

    return () => {
      room.disconnect();
      setLive(false);
    };

  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] bg-black rounded-lg"
    />
  );

}