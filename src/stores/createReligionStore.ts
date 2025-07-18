import { religions, type Religion } from "~/utils/religions";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type ReligionSlice = {
  religion: Religion;
  setReligion: (newReligion: Religion) => void;
};

export const createReligionSlice: BoundStateCreator<ReligionSlice> = (set) => ({
  religion: religions[0]!,
  setReligion: (newReligion: Religion) => set({ religion: newReligion }),
});