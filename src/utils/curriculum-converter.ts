import { allCurricula, ReligionCurriculum } from '../curriculum/comprehensive-curriculum';
import { ComprehensiveCourse, CourseUnit, CourseLesson } from '../stores/createCourseStore';

/**
 * Convert curriculum format to course store format
 */
export function convertCurriculumToCourse(religion: string): ComprehensiveCourse | null {
  const curriculum = allCurricula[religion as keyof typeof allCurricula];
  if (!curriculum) {
    console.warn(`No curriculum found for religion: ${religion}`);
    return null;
  }

  const course: ComprehensiveCourse = {
    religion: curriculum.religion,
    courseTitle: curriculum.courseTitle,
    description: curriculum.description,
    totalEstimatedWeeks: curriculum.totalEstimatedWeeks,
    difficultyProgression: ['beginner', 'intermediate', 'advanced'],
    units: curriculum.units.map((unit, unitIndex) => ({
      id: unit.id,
      unitNumber: unit.unitNumber,
      title: unit.title,
      description: unit.description,
      theme: unit.theme,
      backgroundColor: unit.backgroundColor,
      textColor: unit.textColor,
      borderColor: unit.borderColor,
      lessons: unit.lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        difficulty: lesson.difficulty,
        estimatedMinutes: lesson.estimatedMinutes,
        learningObjectives: lesson.learningObjectives.map(obj => obj.description),
        keyTerms: lesson.keyTerms,
        prerequisites: [],
        completed: false,
        attempts: 0,
      })),
      checkpointLesson: {
        id: `${unit.id}-checkpoint`,
        title: `${unit.title} Assessment`,
        description: unit.unitAssessment?.description || `Comprehensive assessment for ${unit.title}`,
        type: 'checkpoint' as const,
        completed: false,
      },
      estimatedWeeks: unit.estimatedWeeks,
      unlocked: unitIndex === 0, // Only first unit unlocked initially
      completed: false,
    })),
    culturalContext: curriculum.culturalSensitivityGuidelines.join('; '),
    modernRelevance: `Contemporary study of ${curriculum.religion} traditions and practices`,
    generatedAt: new Date(),
    lastUpdated: new Date(),
  };

  return course;
}

/**
 * Get all available religions from curriculum
 */
export function getAvailableReligions(): string[] {
  return Object.keys(allCurricula);
}

/**
 * Get curriculum metadata for a religion
 */
export function getCurriculumMetadata(religion: string) {
  const curriculum = allCurricula[religion as keyof typeof allCurricula];
  if (!curriculum) return null;

  return {
    religion: curriculum.religion,
    courseTitle: curriculum.courseTitle,
    description: curriculum.description,
    totalEstimatedWeeks: curriculum.totalEstimatedWeeks,
    totalUnits: curriculum.units.length,
    totalLessons: curriculum.units.reduce((total, unit) => total + unit.lessons.length, 0),
    prerequisiteKnowledge: curriculum.prerequisiteKnowledge,
    learningOutcomes: curriculum.learningOutcomes,
    culturalSensitivityGuidelines: curriculum.culturalSensitivityGuidelines,
    academicSources: curriculum.academicSources,
  };
}

/**
 * Get lesson data for quiz generation
 */
export function getLessonForQuizGeneration(religion: string, unitId: string, lessonId: string) {
  const curriculum = allCurricula[religion as keyof typeof allCurricula];
  if (!curriculum) return null;

  const unit = curriculum.units.find(u => u.id === unitId);
  if (!unit) return null;

  const lesson = unit.lessons.find(l => l.id === lessonId);
  if (!lesson) return null;

  return {
    religion,
    unitTitle: unit.title,
    lessonTitle: lesson.title,
    learningObjectives: lesson.learningObjectives,
    keyTerms: lesson.keyTerms,
    topicsToGenerate: lesson.topicsToGenerate,
    culturalContext: lesson.culturalContext,
    difficulty: lesson.difficulty,
    estimatedMinutes: lesson.estimatedMinutes,
  };
}

/**
 * Get unit assessment data
 */
export function getUnitAssessmentData(religion: string, unitId: string) {
  const curriculum = allCurricula[religion as keyof typeof allCurricula];
  if (!curriculum) return null;

  const unit = curriculum.units.find(u => u.id === unitId);
  if (!unit || !unit.unitAssessment) return null;

  return {
    religion,
    unitTitle: unit.title,
    assessment: unit.unitAssessment,
    allLessonKeyTerms: unit.lessons.flatMap(lesson => lesson.keyTerms),
    allLearningObjectives: unit.lessons.flatMap(lesson => lesson.learningObjectives),
    comprehensiveTopics: unit.unitAssessment.comprehensiveTopics,
  };
}
