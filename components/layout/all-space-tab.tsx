"use client";
import React, { useRef } from "react";
import { listBtnFilter } from "@/config/category";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useLangStore } from "@/stores/lang";
import CardSpace from "../card-space";

function AllSpaceTab() {
  const scrollRef = useRef<any>(null);
  const t = useLangStore((state) => state.lang);

  const handleWheel = (event: any) => {
    event.preventDefault();
    scrollRef.current.scrollLeft += event.deltaY;
  };

  return (
    <div className="p-2 flex flex-col flex-1">
      <ScrollShadow
        orientation="horizontal"
        className="sticky top-0 bg-white pt-2 z-50 dark:bg-[#232931]"
      >
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className=" w-full overflow-x-auto flex items-center gap-2  pr-2 pb-1"
        >
          <Button
            isIconOnly
            radius="sm"
            variant="faded"
            className="border-none w-12"
          >
            All
          </Button>
          {listBtnFilter.map((item) => (
            <Tooltip
              color="foreground"
              key={item.key}
              showArrow={true}
              content={item.label}
              placement="bottom"
            >
              <Button isIconOnly radius="sm" variant="bordered">
                <img src={item.icon} alt="natural" className="size-6" />
              </Button>
            </Tooltip>
          ))}
        </div>
      </ScrollShadow>

      <div className="flex flex-col border-t mt-2 pt-4 flex-1 overflow-y-auto">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold">{t.spaces.alltab.title1}</h1>
          <h2 className="text-xs mt-2 text-slate-500 font-semibold">
            {t.spaces.alltab.subtitle1}
          </h2>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-2">
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
          <CardSpace />
        </div>
      </div>
    </div>
  );
}

export default AllSpaceTab;
