import { TAccount, TSpace } from "@/types";
import { create } from "zustand";

type storeType = {
  user: TAccount | undefined | null;
  setAccount: (acc: TAccount | undefined | null) => void;
  favoiriteSpace: (item: TSpace) => void;
};

export const useAccountStore = create<storeType>((set) => ({
  user: undefined,

  setAccount: (acc) => set({ user: acc }),
  favoiriteSpace: (item) => set((state) => {
    if (state.user) {
      if (!state.user.spacesFavorite.includes(item)) {
        return {
          user: {
            ...state.user,
            spacesFavorite: [...state.user.spacesFavorite, item],
          },
        };
      }else{
        return {
          user: {
            ...state.user,
            spacesFavorite: state.user.spacesFavorite.filter((i) => i !== item),
          },
        };
      }
    }

    return { user: state.user }; // Return a partial update of the state
  }),
}));
