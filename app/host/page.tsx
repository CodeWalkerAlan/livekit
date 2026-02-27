"use client";

import { useRef, useState } from "react";
import { Room, RoomEvent } from "livekit-client";
import Link from "next/link";

export default function LivePage() {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [room, setRoom] = useState<Room | null>(null);
  const [isLive, setIsLive] = useState(false);

  const startLive = async () => {

    const res = await fetch(
      "/api/token?identity=host&room=room1"
    );

    const data = await res.json();

    const newRoom = new Room();

    await newRoom.connect(
      process.env.NEXT_PUBLIC_LIVEKIT_URL!,
      data.token
    );

    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

    const videoTrack =
      stream.getVideoTracks()[0];

    const audioTrack =
      stream.getAudioTracks()[0];

    await newRoom.localParticipant.publishTrack(
      videoTrack
    );

    await newRoom.localParticipant.publishTrack(
      audioTrack
    );

    if (videoRef.current) {

      videoRef.current.srcObject = stream;

    }

    setRoom(newRoom);
    setIsLive(true);

  };

  const stopLive = async () => {

    room?.disconnect();

    if (videoRef.current?.srcObject) {

      const stream =
        videoRef.current.srcObject as MediaStream;

      stream.getTracks().forEach(track =>
        track.stop()
      );

    }

    setIsLive(false);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">主播端</h1>
          <p className="text-gray-300">开启您的直播之旅</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-auto rounded-t-2xl"
            style={{ minHeight: '400px' }}
          />
          <div className="p-4 bg-gray-700 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isLive && (
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                )}
                <span className="text-white font-medium">{isLive ? '直播中' : '未开始'}</span>
              </div>
              <div className="text-gray-400 text-sm">
                房间号: room1
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={startLive} 
            disabled={isLive}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${isLive ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl'}`}
          >
            开始直播
          </button>

          <button 
            onClick={stopLive} 
            disabled={!isLive}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${!isLive ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl'}`}
          >
            停止直播
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
            返回首页
          </Link>
        </div>
      </div>

    </div>

  );

}