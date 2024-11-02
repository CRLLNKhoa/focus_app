"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { IconHeadphones } from '@tabler/icons-react';
import { IconDownload } from '@tabler/icons-react';
import {Tooltip} from "@nextui-org/tooltip";
import { useLangStore } from "@/stores/lang";

const LeftSidebarTop = () => {
  const t = useLangStore((state) => state.lang)
  
  return (
    <div className={" absolute top-2 left-2 flex items-center gap-2"}>
      <div className={"bg-white dark:bg-[#232931] p-[6px] px-2 flex items-center gap-1 rounded-md"}>
        <Button variant={"light"} size={"sm"} radius={"sm"} className={"flex items-center"}>
          <IconHeadphones stroke={1.2} />
          <p className={"text-small"}>Focus</p>
        </Button>
        <div className={"border-x-[1px] border-border dark:border-slate-600 px-2"}>
          <Tooltip content={t.tooltipBtnSteak}>
            <Button variant={"light"} size={"sm"} radius={"sm"} className={"flex items-center text-md"}>
              2 🔥
            </Button>
          </Tooltip>
        </div>
        <Button color={"primary"} variant={"solid"} size={"sm"} radius={"sm"} className={"flex items-center text-md"}>
          🚀 Upgrade
        </Button>
      </div>

      <div className={"bg-white dark:bg-[#232931] p-[6px] flex items-center gap-1 rounded-md"}>
        <Button variant={"light"} size={"sm"} radius={"sm"} className={"flex items-center text-md"}>
          <IconDownload stroke={1.25} />
          <p className={"text-small"}>Desktop App</p>
        </Button>
      </div>
    </div>
  );
};

export default LeftSidebarTop;