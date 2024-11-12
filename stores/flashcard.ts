import { TFlashCard } from "@/components/flash-card/manageFlashCard";
import { create } from "zustand"


type langStoreType = {
  flashcard: TFlashCard | null;
  setFlashcard: (card: TFlashCard | null) => void;
} 

export const useFlashcardStore = create<langStoreType>((set) => ({
  // @ts-ignore
  flashcard: null,
  // @ts-ignore
  setFlashcard: (card) => set({ flashcard: card })
}))
