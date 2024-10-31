// useSoundStore.ts
import { create } from "zustand";

interface AudioData {
  instance: HTMLAudioElement;
  volume: number;
}

interface SoundStore {
  audio: Record<string, AudioData>;
  playSound: (key: string, url: string) => void; // Bỏ tham số loop
  stopSound: (key: string) => void;
  setVolume: (key: string, volume: number) => void;
  stopAllSounds: () => void;
}

const useSoundStore = create<SoundStore>((set: any) => ({
  audio: {},

  playSound: (key: any, url: any) => {
    const audio = new Audio(url);

    audio.volume = 0.5; // Giá trị mặc định cho âm lượng (1 = 100%)
    audio.loop = true; // Bật chế độ loop mặc định
    audio.play();

    set((state: any) => ({
      audio: {
        ...state.audio,
        [key]: { instance: audio, volume: 1 }, // Lưu instance âm thanh và âm lượng
      },
    }));

    audio.onended = () =>
      set((state: any) => {
        const newAudio = { ...state.audio };

        delete newAudio[key];

        return { audio: newAudio };
      });
  },

  stopSound: (key: any) => {
    set((state: any) => {
      if (state.audio[key]) {
        state.audio[key].instance.pause();
        state.audio[key].instance.currentTime = 0;
        const newAudio = { ...state.audio };

        delete newAudio[key];

        return { audio: newAudio };
      }

      return state;
    });
  },

  setVolume: (key: any, volume: any) => {
    set((state: any) => {
      if (state.audio[key]) {
        state.audio[key].instance.volume = volume;

        return {
          audio: {
            ...state.audio,
            [key]: { ...state.audio[key], volume }, // Cập nhật âm lượng
          },
        };
      }

      return state;
    });
  },

  stopAllSounds: () => {
    set((state: any) => {
      Object.values(state.audio).forEach((audio: any) => {
        audio.instance.pause();
        audio.instance.currentTime = 0;
      });

      return { audio: {} };
    });
  },
}));

export default useSoundStore;
