import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LessonProgress = {
  religion: string;
  unit: number;
  lesson: number;
  completed: boolean;
  score?: number;
};

export type LessonProgressSlice = {
  lessonProgress: LessonProgress[];
  completedLessons: (religion: string) => LessonProgress[];
  isLessonUnlocked: (religion: string, unit: number, lesson: number) => boolean;
  markLessonComplete: (religion: string, unit: number, lesson: number, score?: number) => void;
  getLessonStatus: (religion: string, unit: number, lesson: number) => "LOCKED" | "ACTIVE" | "COMPLETE";
};

export const createLessonProgressSlice: BoundStateCreator<LessonProgressSlice> = (set, get) => ({
  lessonProgress: [],
  
  completedLessons: (religion: string) => {
    return get().lessonProgress.filter(p => p.religion === religion && p.completed);
  },
  
  isLessonUnlocked: (religion: string, unit: number, lesson: number) => {
    const progress = get().lessonProgress;
    
    // First lesson is always unlocked
    if (unit === 1 && lesson === 0) return true;
    
    // Check if previous lesson in same unit is completed
    if (lesson > 0) {
      const prevLesson = progress.find(p => 
        p.religion === religion && 
        p.unit === unit && 
        p.lesson === lesson - 1 && 
        p.completed
      );
      return !!prevLesson;
    }
    
    // Check if previous unit is completed (all lessons in previous unit)
    if (unit > 1) {
      const prevUnitLessons = progress.filter(p => 
        p.religion === religion && 
        p.unit === unit - 1 && 
        p.completed
      );
      // Assuming each unit has at least 3 lessons
      return prevUnitLessons.length >= 3;
    }
    
    return false;
  },
  
  markLessonComplete: (religion: string, unit: number, lesson: number, score = 100) => {
    set((state) => {
      const existing = state.lessonProgress.find(p => 
        p.religion === religion && 
        p.unit === unit && 
        p.lesson === lesson
      );
      
      if (existing) {
        existing.completed = true;
        existing.score = Math.max(existing.score || 0, score);
      } else {
        state.lessonProgress.push({
          religion,
          unit,
          lesson,
          completed: true,
          score
        });
      }
    });
  },
  
  getLessonStatus: (religion: string, unit: number, lesson: number) => {
    const progress = get().lessonProgress;
    const lessonProgress = progress.find(p => 
      p.religion === religion && 
      p.unit === unit && 
      p.lesson === lesson
    );
    
    if (lessonProgress?.completed) return "COMPLETE";
    if (get().isLessonUnlocked(religion, unit, lesson)) return "ACTIVE";
    return "LOCKED";
  }
});
