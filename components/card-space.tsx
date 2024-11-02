/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import React, { use } from "react";
import { Image } from "@nextui-org/image";
import { TSpace } from "@/types";
import { useVideoStore } from "@/stores/video";

function CardSpace({data}:{data:TSpace}) {
  const setVideo = useVideoStore((state) => state.setVideo);

  return (
    <div className="flex flex-col" onClick={() => setVideo(data)}>
      <div className="w-full group">
        <Image
          height={90}
          width={"100%"}
          radius="sm"
          alt="NextUI hero Image"
          src={data.image}
          className="cursor-pointer object-cover"
        />
      </div>
      <h3 className="text-xs mt-2 line-clamp-1">{data.title}</h3>
    </div>
  );
}

export default CardSpace;
