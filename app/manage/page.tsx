"use client";
import ManageFlashCard from "@/components/flash-card/manageFlashCard";
import ManageSpace from "@/components/manage/manageSpace";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { IconCards, IconWorld } from "@tabler/icons-react";
import React, { useState } from "react";

function ManagePage() {
  const [tab, setTab] = useState<"space" | "flash">("flash");

  return (
    <div className="bg-[#232931] h-full pt-16 pl-[88px] pr-2 pb-2">
      <div
        className="relative z-50  h-full w-full bg-white rounded-lg 
      px-4 flex overflow-y-auto noscroll-bar"
      >
        <div className="sticky bottom-0 h-full flex flex-col items-center justify-end py-4 pr-4 border-r gap-4">
          <Tooltip
            placement="right"
            showArrow={true}
            content="Quản lý Flash Card"
          >
            <Button onPress={() => setTab("flash")} radius="sm" variant="light" isIconOnly>
              <IconCards strokeWidth={1.5} size={32} />
            </Button>
          </Tooltip>
          <Tooltip
            placement="right"
            showArrow={true}
            content="Quản lý không gian"
          >
            <Button onPress={() => setTab("space")} radius="sm" variant="light" isIconOnly>
              <IconWorld strokeWidth={1.5} size={32} />
            </Button>
          </Tooltip>
        </div>

        <div className="flex-1 h-full p-4">
            {tab === "space" && <ManageSpace />}
            {tab === "flash" && <ManageFlashCard />}
        </div>
      </div>
    </div>
  );
}

export default ManagePage;
