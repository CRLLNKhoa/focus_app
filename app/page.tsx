"use client";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { useVideoStore } from "@/stores/video";

import { cn } from "@/libs/utils";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const muted = useVideoStore((state) => state.muted);
  const volume = useVideoStore((state) => state.volume);
  const fullscreen = useVideoStore((state) => state.fullscreen);
  const playing = useVideoStore((state) => state.playing);
  const setPlaying = useVideoStore((state) => state.togglePlaying);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="w-full h-full bg-black overflow-hidden relative">
      {isClient ? (
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Y38ZhAArqfY"
          loop={true}
          muted={muted}
          autoPlay={true}
          playing={playing}
          onReady={() => setPlaying()}
          className={cn("absolute top-0 left-0 bottom-0 right-0",
            fullscreen ? "object-cover" : "object-contain",
          )}
          width="100%"
          height="100%"
          fullscreen={fullscreen}
          volume={volume}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                controls: 0,
              },
            },
          }}
        />
      ) : (
        <div className={"w-full h-full bg-transparent"}>
          <h1>Loading...</h1>
        </div>
      )}
      <div className={"absolute top-0 left-0 bottom-0 right-0"}></div>
    </section>
  );
}
