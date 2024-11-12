"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SoundButton from "../SoundButton";
import { Button } from "@nextui-org/button";
import { IconCaretLeft, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { Slider } from "@nextui-org/slider";
import { useVideoStore } from "@/stores/video";
import { useToggleStore } from "@/stores/toggle";

function Soundboard() {
  const isShow = useToggleStore((state) => state.soundboard);
  const toggleSoundboard = useToggleStore((state) => state.toggleSoundboard);
  const volume = useVideoStore((state) => state.volume);
  const setVolume = useVideoStore((state) => state.setVolume);
  const muted = useVideoStore((state) => state.muted);
  const setMuted = useVideoStore((state) => state.toggleMuted);

  const handleVolumeChange = (value: any) => {
    if (isNaN(Number(value))) return;
    const newVolume = parseFloat(value);

    setVolume(newVolume);
  };

  return (
    <>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -100, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: -100, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-[90px] bg-white bottom-2 w-[360px]
              dark:bg-[#232931] p-4 flex flex-col rounded-md gap-2 z-50 shadow-xl"
          >
            <h1 className="text-lg font-bold">Soundboard</h1>
            <div className="flex flex-col mt-5">
              <Slider
                size="sm"
                color="foreground"
                step={0.1}
                maxValue={1}
                minValue={0}
                defaultValue={0.4}
                className="max-w-md"
                label="Master Volume"
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
                    {muted || volume === 0 ? <IconVolumeOff /> : <IconVolume />}
                  </Button>
                }
              />
            </div>
            <h2 className="text-md font-bold mt-2">Ambiance</h2>
            <div className="flex flex-col gap-4 mt-4 overflow-y-auto noscroll-bar">
              <SoundButton
                keySound="sound1"
                soundUrl="/ocean-waves.mp3"
                icon="/ocean.png"
                title="Ocean Waves"
              />
              <SoundButton
                keySound="sound2"
                soundUrl="/fireplace.mp3"
                icon="/fire.png"
                title="Fire Place"
              />
              <SoundButton
                keySound="sound8"
                soundUrl="/rain.mp3"
                icon="/rain.png"
                title="Rain"
              />
              <SoundButton
                keySound="sound3"
                soundUrl="/restaurant.mp3"
                icon="/fork-and-knife-with-plate.png"
                title="Restaurant"
              />
              <SoundButton
                keySound="sound4"
                soundUrl="/keyboard.mp3"
                icon="/keyboard.png"
                title="Keyboard Typing"
              />
              <SoundButton
                keySound="sound5"
                soundUrl="/jungle.mp3"
                icon="/evergreen-tree.png"
                title="Jungle"
              />
              <SoundButton
                keySound="sound6"
                soundUrl="/road.mp3"
                icon="/blue-car.png"
                title="Street"
              />
              <SoundButton
                keySound="sound7"
                soundUrl="/park.mp3"
                icon="/park.png"
                title="Ocean Waves"
              />
            </div>

            <div className="bg-white dark:bg-[#232931] absolute top-6 left-[100%] rounded-e-lg">
              <Button
                onPress={() => toggleSoundboard(false)}
                variant="light"
                isIconOnly
                radius="sm"
              >
                <IconCaretLeft stroke={1.5} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Soundboard;
