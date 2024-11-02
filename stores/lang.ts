import { create } from "zustand"

import l from "@/lang/lang.json"

type langStoreType = {
  lang: any;
  setLang: (lang: string) => void;
} 

export const useLangStore = create<langStoreType>((set) => ({
  // @ts-ignore
  lang: l.vi,
  // @ts-ignore
  setLang: (lang) => set({ lang: l[lang] })
}))
