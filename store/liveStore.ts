import { create } from "zustand";

interface Trade {
  id: string;
  user: string;
  amount: number;
  token: string;
}

interface LiveStore {

  isLive: boolean;

  trades: Trade[];

  setLive: (live: boolean) => void;

  addTrade: (trade: Trade) => void;

}

export const useLiveStore = create<LiveStore>((set) => ({

  isLive: false,

  trades: [],

  setLive: (live) => set({ isLive: live }),

  addTrade: (trade) =>
    set((state) => ({
      trades: [trade, ...state.trades],
    })),

}));