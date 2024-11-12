"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  IconArrowBigRightLine,
  IconError404,
  IconLink,
  IconMinus
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import ReactPlayer from "react-player";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useToggleStore } from "@/stores/toggle";
import { cn } from "@/libs/utils";
import { toggle } from "@nextui-org/theme";

function Youtube() {
  const [isClient, setIsClient] = useState(false);
  const [video, setVideo] = useState("");
  const [temp, setTemp] = useState("");
  const [error, setError] = useState(false);
  const isShow = useToggleStore((state) => state.media);
  const toggle = useToggleStore((state) => state.toggleMedia);

  useEffect(() => {
    setIsClient(true);
    localStorage.getItem("video") && setVideo(localStorage.getItem("video")!);
  }, []);

  return (
    <Draggable bounds="parent" handle="strong">
      <ResizableBox
        className={cn("!absolute -left-[1000px] !top-1/2 bg-white z-50 rounded-lg shadow-lg overflow-hidden group",
          isShow ? "left-0 opacity-100 z-0" : "-left-[10000px] opacity-0 z-0",
        )}
        width={460}
        height={260}
        minConstraints={[460, 260]}
        maxConstraints={[960, 560]}
        resizeHandles={["se"]}
      >
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col"
        >
          <strong className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-between border-b">
            <h1>Media</h1>
            <div className="flex items-center">
              <Button onPress={() => toggle(false)} size="sm" isIconOnly variant="light">
                <IconMinus />
              </Button>
            </div>
          </strong>
          <div className="p-1 flex-1 rounded-lg select-none">
            {isClient && error === false && (
              <ReactPlayer
                url={video}
                width="100%"
                height="100%"
                controls
                onError={() => setError(true)}
                onReady={() => {
                  setError(false);
                  localStorage.setItem("video", video)!;
                }}
              />
            )}
            {error && (
              <div className="w-full h-full flex items-center justify-center text-red-500 flex-col gap-2">
                <IconError404 size={50} />
                <h1>Video không tồn tại !</h1>
              </div>
            )}
          </div>
          <div
            className="w-full h-0 bg-white group-hover:h-12 duration-300 
                  group-hover:p-2 flex items-center gap-2 overflow-hidden group-hover:pb-4"
          >
            <Input
              type="text"
              placeholder="Link Youtube"
              size="sm"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              startContent={
                <IconLink className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <Button
              onPress={() => {
                setVideo(temp);
                setTemp("");
                setError(false);
              }}
              size="sm"
              isIconOnly
              variant="light"
            >
              <IconArrowBigRightLine stroke={1.5} />
            </Button>
          </div>
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default Youtube;
