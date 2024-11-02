"use client";
import React from "react";
import { Image } from "@nextui-org/image";
import { TSpace } from "@/types";

function CardSpaceAdmin({data}:{data:TSpace}) {
  return (
    <div className="flex flex-col">
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

export default CardSpaceAdmin;
