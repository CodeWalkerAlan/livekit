"use client";

import { Room } from "livekit-client";

export default function LivePublisher() {

  const start = async () => {

    const room = new Room();

    const res = await fetch("/api/token");

    const data = await res.json();

    await room.connect(
      process.env.NEXT_PUBLIC_LIVEKIT_URL!,
      data.token
    );

    await room.localParticipant.enableCameraAndMicrophone();

    alert("Live started");

  };

  return (
    <button
      onClick={start}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Start Live
    </button>
  );

}