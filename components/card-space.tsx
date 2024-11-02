"use client";
import React from "react";
import { Image } from "@nextui-org/image";

function CardSpace() {
  return (
    <div className="flex flex-col">
      <div className="w-full group">
        <Image
          height={90}
          width={"100%"}
          radius="sm"
          alt="NextUI hero Image"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          className="cursor-pointer"
        />
      </div>
      <h3 className="text-xs mt-2 line-clamp-1">Tên không gian nhỏ nhỏ</h3>
    </div>
  );
}

export default CardSpace;
