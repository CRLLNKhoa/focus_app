/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import React, { use } from "react";
import { Image } from "@nextui-org/image";
import { TSpace } from "@/types";
import { useVideoStore } from "@/stores/video";
import { viewSpace } from "@/actions/space";

function CardSpace({data}:{data:TSpace}) {
  const setVideo = useVideoStore((state) => state.setVideo);

  const handleView = async () => {
    setVideo(data);
    await viewSpace(data.id!);
  };

  return (
    <div className="flex flex-col" onClick={handleView}>
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
