import { religionUnits } from "~/utils/religion-units";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LessonSlice = {
  lessonsCompleted: number;
  increaseLessonsCompleted: (by?: number) => void;
  jumpToUnit: (unitNumber: number) => void;
};

export const createLessonSlice: BoundStateCreator<LessonSlice> = (set, get) => ({
  lessonsCompleted: 0,
  increaseLessonsCompleted: (by = 1) => {
    const current = get().lessonsCompleted;
    set({ lessonsCompleted: current + by });
  },
  jumpToUnit: (unitNumber: number) => {
    const lessonsPerTile = 4;
    const state = get();
    const currentLessons = state.lessonsCompleted;
    const currentReligion = state.religion;
    // find units for the selected religion
    const unitsForReligion = religionUnits.find(r => r.religion.name === currentReligion.name)?.units || [];
    const totalLessonsToJump = unitsForReligion
      .filter(unit => unit.unitNumber < unitNumber)
      .map(unit => unit.tiles.length * lessonsPerTile)
      .reduce((a, b) => a + b, 0);
    set({ lessonsCompleted: Math.max(currentLessons, totalLessonsToJump) });
  },
});
