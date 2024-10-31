// SoundButton.tsx
import useSoundStore from "@/stores/sound";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";
import {
    IconPlayerPause,
  IconPlayerPauseFilled,
  IconPlayerPlay,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import React, { useState } from "react";

interface SoundButtonProps {
  keySound: string;
  soundUrl: string;
  icon: string;
  title: string;
}

const SoundButton: React.FC<SoundButtonProps> = ({
  keySound,
  soundUrl,
  icon,
  title,
}) => {
  const { audio, playSound, stopSound, setVolume } = useSoundStore();
  const isPlaying = audio[keySound] !== undefined;
  const [volume, setLocalVolume] = useState<number>(0.5); // Giá trị âm lượng trong component

  const handlePlay = () => {
    if (isPlaying) {
      stopSound(keySound);
    } else {
      playSound(keySound, soundUrl); // Không cần truyền tham số loop
      setVolume(keySound, volume); // Đặt âm lượng khi phát
    }
  };

  const handleVolumeChange = (value:any) => {
    if (isNaN(Number(value))) return;
    const newVolume = parseFloat(value);

    setLocalVolume(newVolume);
    setVolume(keySound, newVolume);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-start gap-2 pl-2 mb-2">
        <img src={icon} alt={`img-${title}`} className="size-6" />
        <p>{title}</p>
      </div>

      <Slider
        size="sm"
        color="foreground"
        step={0.01}
        maxValue={1}
        minValue={0}
        defaultValue={0.4}
        className="max-w-md"
        value={volume}
        onChange={handleVolumeChange}
        startContent={
            <Button
          onPress={handlePlay}
          size="sm"
          isIconOnly
          variant="light"
          className="ml-auto text-[#4E4E4E]"
        >
          {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
        </Button>
        }
      />
    </div>
  );
};

export default SoundButton;
