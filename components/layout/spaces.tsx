"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useLangStore } from "@/stores/lang";
import AllSpaceTab from "./all-space-tab";
import { Button } from "@nextui-org/button";
import {  IconHeart, IconVolume, IconVolumeOff, IconX } from "@tabler/icons-react";
import { useVideoStore } from "@/stores/video";
import { Slider } from "@nextui-org/slider";
import { useToggleStore } from "@/stores/toggle";

function Spaces() {
  const t = useLangStore((state) => state.lang);
  const volume = useVideoStore((state) => state.volume);
  const setVolume = useVideoStore((state) => state.setVolume);
  const muted = useVideoStore((state) => state.muted);
  const setMuted = useVideoStore((state) => state.toggleMuted);
  const isShow = useToggleStore((state) => state.space);
  const toggleSpace = useToggleStore((state) => state.toggleSpace);
  const video = useVideoStore((state) => state.video);

  const handleVolumeChange = (value:any) => {
    if (isNaN(Number(value))) return;
    const newVolume = parseFloat(value);

    
    setVolume(newVolume);
  };

  return (
    <>
      <AnimatePresence>
        {
            isShow && (
                <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -100, y: 0 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -100, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-16 left-[102px] bg-white bottom-2 w-[360px] z-50 shadow-xl
                dark:bg-[#232931] flex flex-col rounded-md gap-2 overflow-y-auto noscroll-bar"
        >
          <div className="">
            <Tabs
              key={"underlined"}
              variant={"underlined"}
              aria-label="Tabs variants"
              className="px-3 pt-1 w-full"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              }}
            >
              <Tab key="spaces" className="p-0" title={t.spaces.tab.item1}>
                <AllSpaceTab />
              </Tab>
              <Tab key="favorites" className="p-0" title={t.spaces.tab.item2} />
            </Tabs>
          </div>
          <div className="flex flex-col mt-auto border-t dark:border-slate-600 shadow-lg p-4 gap-2 
          sticky bottom-0 bg-white dark:bg-[#232931] z-10">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="line-clamp-1 text-sm">{video.title !== "" ? video.title : "Loading..."}</h2> 
                    <p className="text-xs bg-gradient-to-r from-red-600 to-purple-400 inline-block text-transparent bg-clip-text">@{video.src !== "" ? video.src : "Loading..."}</p>
                </div>
                <Button isIconOnly variant="light" className="text-red-500">
                    <IconHeart stroke={1.2} />
                </Button>
            </div>
            <Slider
              size="sm"
              color="foreground"
              step={0.1}
              maxValue={1}
              minValue={0}
              defaultValue={0.4}
              className="max-w-md"
              value={volume}
              onChange={handleVolumeChange}
              startContent={
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  className="ml-auto text-[#4E4E4E]"
                  onPress={() => setMuted()}
                >
                  {muted || volume === 0 ? (
                    <IconVolumeOff  />
                  ) : (
                     <IconVolume /> 
                  )
                  }
                </Button>
              }
            />
          </div>

          <div className="bg-white dark:bg-[#232931] absolute top-0 right-0 rounded-e-lg">
              <Button
                onPress={() => toggleSpace(false)}
                variant="light"
                isIconOnly
                radius="sm"
              >
                <IconX stroke={1.5} />
              </Button>
            </div>
        </motion.div>
            )
        }
      </AnimatePresence>
    </>
  );
}

export default Spaces;
