"use client";

import { useEffect, useRef, useState } from "react";
import {
  Room,
  RoomEvent,
  Track,
  RemoteTrack,
  RemoteParticipant,
} from "livekit-client";
import Link from "next/link";

export default function WatchPage() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    let room: Room;

    const connectRoom = async () => {

      const res = await fetch(
        "/api/token?identity=viewer&room=room1"
      );

      const data = await res.json();

      room = new Room();

      await room.connect(
        process.env.NEXT_PUBLIC_LIVEKIT_URL!,
        data.token
      );

      setIsConnected(true);

      console.log("connected");

      // 监听未来track
      room.on(
        RoomEvent.TrackSubscribed,
        (track: RemoteTrack) => {

          console.log("new track");

          if (
            track.kind === Track.Kind.Video &&
            videoRef.current
          ) {

            track.attach(videoRef.current);

          }

        }
      );

      // 关键修复：处理已存在的track
      room.remoteParticipants.forEach(
        (participant: RemoteParticipant) => {

          participant.trackPublications.forEach(
            (publication) => {

              const track = publication.track;

              if (
                track &&
                track.kind === Track.Kind.Video &&
                videoRef.current
              ) {

                console.log("existing track");

                track.attach(videoRef.current);

              }

            }
          );

        }
      );

    };

    connectRoom();

    return () => {
      room?.disconnect();
    };

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">观众端</h1>
          <p className="text-gray-300">观看精彩直播</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            controls
            className="w-full h-auto rounded-t-2xl"
            style={{ minHeight: '400px' }}
          />
          <div className="p-4 bg-gray-700 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isConnected && (
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                )}
                <span className="text-white font-medium">{isConnected ? '已连接' : '连接中...'}</span>
              </div>
              <div className="text-gray-400 text-sm">
                房间号: room1
              </div>
            </div>
          </div>
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