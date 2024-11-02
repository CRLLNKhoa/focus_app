import { TSpace } from "@/types";
import { create } from "zustand"


type storeType = {
  muted: boolean;
  toggleMuted: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  fullscreen: boolean;
  toggleFullscreen: (b:boolean) => void;
  playing: boolean;
  togglePlaying: () => void;
  setPlay: () => void;
  video: TSpace;
  setVideo: (video: TSpace) => void;
} 

export const useVideoStore = create<storeType>((set) => ({
  muted: false,
  toggleMuted: () => set((state) => ({ muted: !state.muted })),

  volume: 0.5,
  setVolume: (volume) => set({ volume }),

  fullscreen: false,
  toggleFullscreen: (b) => set(() => ({ fullscreen: b })),

  playing: false,
  togglePlaying: () => set((state) => ({ playing: !state.playing })),
  setPlay: () => set(() => ({ playing: true })),

  video: {
    id: "",
    title: "",
    link: "",
    image: "",
    src: "",
    view: 0,
    created_at: "",
    key: "",
  },

  setVideo: (video) => set({ video }),
}))
