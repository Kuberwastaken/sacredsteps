import type { StateCreator } from "zustand";
import { create } from "zustand";
import type { GoalXpSlice } from "~/stores/createGoalXpStore";
import { createGoalXpSlice } from "~/stores/createGoalXpStore";
import type { ReligionSlice } from "~/stores/createReligionStore";
import { createReligionSlice } from "~/stores/createReligionStore";
import type { LessonSlice } from "~/stores/createLessonStore";
import { createLessonSlice } from "~/stores/createLessonStore";
import type { LingotSlice } from "~/stores/createLingotStore";
import { createLingotSlice } from "~/stores/createLingotStore";
import type { SoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import { createSoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import type { StreakSlice } from "~/stores/createStreakStore";
import { createStreakSlice } from "~/stores/createStreakStore";
import type { UserSlice } from "~/stores/createUserStore";
import { createUserSlice } from "~/stores/createUserStore";
import type { XpSlice } from "~/stores/createXpStore";
import { createXpSlice } from "~/stores/createXpStore";
import type { LessonProgressSlice } from "~/stores/createLessonProgressStore";
import { createLessonProgressSlice } from "~/stores/createLessonProgressStore";
import type { ThemeSlice } from "~/stores/createThemeStore";
import { createThemeSlice } from "~/stores/createThemeStore";
import type { HeartsSlice } from "~/stores/createHeartsStore";
import { createHeartsSlice } from "~/stores/createHeartsStore";

type BoundState = GoalXpSlice &
  ReligionSlice &
  LessonSlice &
  LingotSlice &
  SoundSettingsSlice &
  StreakSlice &
  UserSlice &
  XpSlice &
  LessonProgressSlice &
  ThemeSlice &
  HeartsSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createGoalXpSlice(...args),
  ...createReligionSlice(...args),
  ...createLessonSlice(...args),
  ...createLingotSlice(...args),
  ...createSoundSettingsSlice(...args),
  ...createStreakSlice(...args),
  ...createUserSlice(...args),
  ...createXpSlice(...args),
  ...createLessonProgressSlice(...args),
  ...createThemeSlice(...args),
  ...createHeartsSlice(...args),
}));
