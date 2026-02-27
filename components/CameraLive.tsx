"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraLive() {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLive, setIsLive] = useState(false);

  const startLive = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({

        video: true,
        audio: true,

      });

      if (videoRef.current) {

        videoRef.current.srcObject = stream;

      }

      setIsLive(true);

    } catch (error) {

      console.error("摄像头访问失败:", error);

    }

  };

  const stopLive = () => {

    if (videoRef.current?.srcObject) {

      const stream = videoRef.current.srcObject as MediaStream;

      stream.getTracks().forEach(track => track.stop());

      videoRef.current.srcObject = null;

    }

    setIsLive(false);

  };

  return (

    <div className="p-4">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-[400px] bg-black rounded-lg"
      />

      <div className="mt-4 flex gap-2">

        <button
          onClick={startLive}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          开始直播
        </button>

        <button
          onClick={stopLive}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          停止直播
        </button>

      </div>

      <div className="mt-2">

        状态: {isLive ? "LIVE " : "OFFLINE "}

      </div>

    </div>

  );

}