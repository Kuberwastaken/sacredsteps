import { type BoundStateCreator } from "~/hooks/useBoundStore";

export type HeartsSlice = {
  hearts: number;
  maxHearts: number;
  loseHeart: () => void;
  resetHearts: () => void;
  addHeart: () => void;
};

export const createHeartsSlice: BoundStateCreator<HeartsSlice> = (set) => ({
  hearts: 5,
  maxHearts: 5,
  loseHeart: () =>
    set((state) => ({
      hearts: Math.max(0, state.hearts - 1),
    })),
  resetHearts: () =>
    set((state) => ({
      hearts: state.maxHearts,
    })),
  addHeart: () =>
    set((state) => ({
      hearts: Math.min(state.maxHearts, state.hearts + 1),
    })),
});
