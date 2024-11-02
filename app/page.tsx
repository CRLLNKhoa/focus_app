/* eslint-disable react/self-closing-comp */
"use client";
import ReactPlayer from "react-player";
import { use, useEffect, useState } from "react";
import { useVideoStore } from "@/stores/video";

import { cn } from "@/libs/utils";
import { useQuery } from "@tanstack/react-query";
import { getSpaces } from "@/actions/space";
import { IconLoader, IconLoaderQuarter } from "@tabler/icons-react";
import { di } from "@fullcalendar/core/internal-common";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const muted = useVideoStore((state) => state.muted);
  const volume = useVideoStore((state) => state.volume);
  const fullscreen = useVideoStore((state) => state.fullscreen);
  const playing = useVideoStore((state) => state.playing);
  const setPlay = useVideoStore((state) => state.setPlay);
  const video = useVideoStore((state) => state.video);
  const setVideo = useVideoStore((state) => state.setVideo);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["space"],
    queryFn: () => getSpaces(),
  });

  useEffect(() => {
    setVideo(
      data?.data[Math.floor(Math.random() * data?.data.length)] || {
        id: "",
        title: "",
        link: "",
        image: "",
        src: "",
        view: 0,
        created_at: "",
        key: "",
      }
    );
  }, [data]);

  return (
    <section className="w-full h-full bg-black overflow-hidden relative">
      {isClient && video.link ? (
        <div
          className={cn(
            "w-full h-full duration-1000 transition-all",
            fullscreen ? "scale-100" : "scale-150"
          )}
        >
          <ReactPlayer
            url={video.link}
            loop={true}
            muted={muted}
            autoPlay={true}
            playing={playing}
            className={cn(
              "absolute top-0 left-0 bottom-0 right-0",
              fullscreen ? "object-cover" : "object-contain"
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
                  disablekb: 1,           
                },
              },
            }}
          />
        </div>
      ) : (
        <div
          className={
            "w-full h-full bg-transparent flex items-center justify-center flex-col gap-2"
          }
        >
          <div className="animate-spin">
            <IconLoaderQuarter stroke={1.5} className="text-white size-16" />
          </div>
          <h1 className="text-white">Loading...</h1>
        </div>
      )}
      <div className={"absolute top-0 left-0 bottom-0 right-0"}></div>
    </section>
  );
}
