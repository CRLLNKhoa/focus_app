import { create } from "zustand"


type storeType = {
  calendar: boolean;
  toggleCalendar: (t:boolean) => void

  soundboard: boolean;
  toggleSoundboard: (t:boolean) => void

  space: boolean;
  toggleSpace: (t:boolean) => void

  media: boolean;
  toggleMedia: (t:boolean) => void

  task: boolean;
  toggleTask: (t:boolean) => void

  flashcard: boolean;
  toggleFlashcard: (t:boolean) => void
} 

export const useToggleStore = create<storeType>((set) => ({
  calendar: false,
  toggleCalendar: (t) => set(() => ({ calendar: t })),

  soundboard: false,
  toggleSoundboard: (t) => set(() => ({ soundboard: t })),

  space: false,
  toggleSpace: (t) => set(() => ({ space: t })),

  media: false,
  toggleMedia: (t) => set(() => ({ media: t })),

  task: false,
  toggleTask: (t) => set(() => ({ task: t })),

  flashcard: false,
  toggleFlashcard: (t) => set(() => ({ flashcard: t }))
}))
