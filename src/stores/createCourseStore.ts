import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { convertCurriculumToCourse } from '../utils/curriculum-converter';

export type CourseLesson = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  learningObjectives: string[];
  keyTerms: Array<{
    term: string;
    definition: string;
  }>;
  prerequisites?: string[];
  completed: boolean;
  score?: number;
  attempts: number;
};

export type CourseUnit = {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  theme: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  lessons: CourseLesson[];
  checkpointLesson: {
    id: string;
    title: string;
    description: string;
    type: 'checkpoint';
    completed: boolean;
    score?: number;
  };
  estimatedWeeks: number;
  unlocked: boolean;
  completed: boolean;
};

export type ComprehensiveCourse = {
  religion: string;
  courseTitle: string;
  description: string;
  totalEstimatedWeeks: number;
  difficultyProgression: string[];
  units: CourseUnit[];
  culturalContext: string;
  modernRelevance: string;
  generatedAt: Date;
  lastUpdated: Date;
};

export type CourseProgress = {
  religion: string;
  currentUnitId: string;
  currentLessonId: string;
  totalLessonsCompleted: number;
  totalScore: number;
  streakDays: number;
  lastStudiedDate: Date;
  weeklyGoalMinutes: number;
  minutesStudiedThisWeek: number;
};

interface CourseStore {
  // Course data
  courses: Record<string, ComprehensiveCourse>;
  progress: Record<string, CourseProgress>;
  
  // Loading states
  loading: boolean;
  generating: boolean;
  error: string | null;
  
  // Actions
  generateCourse: (religion: string, targetAudience: 'complete_beginner' | 'some_knowledge' | 'intermediate', focusAreas?: string[]) => Promise<void>;
  loadCourse: (religion: string) => ComprehensiveCourse | null;
  completeLesson: (religion: string, unitId: string, lessonId: string, score: number) => void;
  completeCheckpoint: (religion: string, unitId: string, score: number) => void;
  updateProgress: (religion: string, minutesStudied: number) => void;
  unlockNextUnit: (religion: string, unitId: string) => void;
  setWeeklyGoal: (religion: string, minutes: number) => void;
  resetCourse: (religion: string) => void;
  
  // Getters
  getCourseProgress: (religion: string) => CourseProgress | null;
  getNextLesson: (religion: string) => { unitId: string; lessonId: string } | null;
  getUnlockedLessons: (religion: string) => Array<{ unitId: string; lessonId: string; title: string }>;
  getCourseStats: (religion: string) => {
    totalLessons: number;
    completedLessons: number;
    averageScore: number;
    timeSpentMinutes: number;
    completionPercentage: number;
  };
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: {},
      progress: {},
      loading: false,
      generating: false,
      error: null,

      generateCourse: async (religion, targetAudience, focusAreas) => {
        set({ generating: true, error: null });
        
        try {
          // Import curriculum converter (dynamic to avoid circular dependencies)
          const { convertCurriculumToCourse } = await import('../utils/curriculum-converter');
          
          // Convert hand-crafted curriculum to course format
          const course = convertCurriculumToCourse(religion);
          
          if (!course) {
            throw new Error(`No curriculum available for ${religion}`);
          }

          // Initialize progress
          const progress: CourseProgress = {
            religion,
            currentUnitId: course.units[0]?.id || '',
            currentLessonId: course.units[0]?.lessons[0]?.id || '',
            totalLessonsCompleted: 0,
            totalScore: 0,
            streakDays: 0,
            lastStudiedDate: new Date(),
            weeklyGoalMinutes: 60, // Default 1 hour per week
            minutesStudiedThisWeek: 0,
          };

          set(state => ({
            courses: { ...state.courses, [religion]: course },
            progress: { ...state.progress, [religion]: progress },
            generating: false,
          }));

        } catch (error) {
          console.error('Course generation error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to generate course',
            generating: false 
          });
        }
      },

      loadCourse: (religion) => {
        const { courses } = get();
        
        // If course is already loaded, return it
        if (courses[religion]) {
          return courses[religion];
        }
        
        // Otherwise, try to load from comprehensive curriculum
        const curriculumCourse = convertCurriculumToCourse(religion);
        if (curriculumCourse) {
          // Store the course for future use
          set(state => ({
            courses: { ...state.courses, [religion]: curriculumCourse }
          }));
          return curriculumCourse;
        }
        
        return null;
      },

      completeLesson: (religion, unitId, lessonId, score) => {
        set(state => {
          const course = state.courses[religion];
          const progress = state.progress[religion];
          
          if (!course || !progress) return state;

          const updatedCourse = {
            ...course,
            units: course.units.map(unit => 
              unit.id === unitId 
                ? {
                    ...unit,
                    lessons: unit.lessons.map(lesson =>
                      lesson.id === lessonId
                        ? { ...lesson, completed: true, score, attempts: lesson.attempts + 1 }
                        : lesson
                    )
                  }
                : unit
            )
          };

          const updatedProgress = {
            ...progress,
            totalLessonsCompleted: progress.totalLessonsCompleted + 1,
            totalScore: progress.totalScore + score,
            lastStudiedDate: new Date(),
          };

          return {
            ...state,
            courses: { ...state.courses, [religion]: updatedCourse },
            progress: { ...state.progress, [religion]: updatedProgress },
          };
        });
      },

      completeCheckpoint: (religion, unitId, score) => {
        set(state => {
          const course = state.courses[religion];
          if (!course) return state;

          const updatedCourse = {
            ...course,
            units: course.units.map((unit, index) => {
              if (unit.id === unitId) {
                return {
                  ...unit,
                  completed: true,
                  checkpointLesson: { ...unit.checkpointLesson, completed: true, score }
                };
              }
              // Unlock next unit if this one is completed
              if (index > 0 && course.units[index - 1]?.id === unitId) {
                return { ...unit, unlocked: true };
              }
              return unit;
            })
          };

          return {
            ...state,
            courses: { ...state.courses, [religion]: updatedCourse },
          };
        });
      },

      updateProgress: (religion, minutesStudied) => {
        set(state => {
          const progress = state.progress[religion];
          if (!progress) return state;

          const updatedProgress = {
            ...progress,
            minutesStudiedThisWeek: progress.minutesStudiedThisWeek + minutesStudied,
            lastStudiedDate: new Date(),
          };

          return {
            ...state,
            progress: { ...state.progress, [religion]: updatedProgress },
          };
        });
      },

      unlockNextUnit: (religion, unitId) => {
        set(state => {
          const course = state.courses[religion];
          if (!course) return state;

          const updatedCourse = {
            ...course,
            units: course.units.map(unit => 
              unit.id === unitId ? { ...unit, unlocked: true } : unit
            )
          };

          return {
            ...state,
            courses: { ...state.courses, [religion]: updatedCourse },
          };
        });
      },

      setWeeklyGoal: (religion, minutes) => {
        set(state => {
          const progress = state.progress[religion];
          if (!progress) return state;

          const updatedProgress = { ...progress, weeklyGoalMinutes: minutes };

          return {
            ...state,
            progress: { ...state.progress, [religion]: updatedProgress },
          };
        });
      },

      resetCourse: (religion) => {
        set(state => {
          const newCourses = { ...state.courses };
          const newProgress = { ...state.progress };
          delete newCourses[religion];
          delete newProgress[religion];

          return {
            ...state,
            courses: newCourses,
            progress: newProgress,
          };
        });
      },

      getCourseProgress: (religion) => {
        const { progress } = get();
        return progress[religion] || null;
      },

      getNextLesson: (religion) => {
        const { courses, progress } = get();
        const course = courses[religion];
        const courseProgress = progress[religion];
        
        if (!course || !courseProgress) return null;

        for (const unit of course.units) {
          if (!unit.unlocked) continue;
          
          for (const lesson of unit.lessons) {
            if (!lesson.completed) {
              return { unitId: unit.id, lessonId: lesson.id };
            }
          }
          
          if (!unit.checkpointLesson.completed) {
            return { unitId: unit.id, lessonId: unit.checkpointLesson.id };
          }
        }

        return null;
      },

      getUnlockedLessons: (religion) => {
        const { courses } = get();
        const course = courses[religion];
        
        if (!course) return [];

        const unlockedLessons: Array<{ unitId: string; lessonId: string; title: string }> = [];

        for (const unit of course.units) {
          if (!unit.unlocked) continue;
          
          for (const lesson of unit.lessons) {
            unlockedLessons.push({
              unitId: unit.id,
              lessonId: lesson.id,
              title: lesson.title,
            });
          }
        }

        return unlockedLessons;
      },

      getCourseStats: (religion) => {
        const { courses, progress } = get();
        const course = courses[religion];
        const courseProgress = progress[religion];
        
        if (!course || !courseProgress) {
          return {
            totalLessons: 0,
            completedLessons: 0,
            averageScore: 0,
            timeSpentMinutes: 0,
            completionPercentage: 0,
          };
        }

        const totalLessons = course.units.reduce((total, unit) => total + unit.lessons.length + 1, 0); // +1 for checkpoint
        const completedLessons = courseProgress.totalLessonsCompleted;
        const averageScore = completedLessons > 0 ? courseProgress.totalScore / completedLessons : 0;
        const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

        return {
          totalLessons,
          completedLessons,
          averageScore,
          timeSpentMinutes: courseProgress.minutesStudiedThisWeek,
          completionPercentage,
        };
      },
    }),
    {
      name: 'course-storage',
      partialize: (state) => ({
        courses: state.courses,
        progress: state.progress,
      }),
    }
  )
);
