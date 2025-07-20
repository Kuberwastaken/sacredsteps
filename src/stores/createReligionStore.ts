import { religions, type Religion } from "~/utils/religions";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type ReligionSlice = {
  religion: Religion;
  setReligion: (newReligion: Religion) => void;
};

const getInitialReligion = (): Religion => {
  if (typeof window !== 'undefined') {
    const savedReligionName = localStorage.getItem('selected_religion');
    if (savedReligionName) {
      const savedReligion = religions.find(r => r.name === savedReligionName);
      if (savedReligion) {
        return savedReligion;
      }
    }
  }
  return religions[0]!;
};

export const createReligionSlice: BoundStateCreator<ReligionSlice> = (set) => ({
  religion: getInitialReligion(),
  setReligion: (newReligion: Religion) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected_religion', newReligion.name);
    }
    set({ religion: newReligion });
  },
});