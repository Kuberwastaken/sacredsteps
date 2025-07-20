import { NextApiRequest, NextApiResponse } from 'next';
import { generateCurriculumQuizFlow, generateSingleExerciseFlow } from '../../ai/flows/generate-curriculum-quiz';
import { allCurricula } from '../../curriculum/comprehensive-curriculum';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { religion, unitId, lessonId, exerciseType, questionsPerType = 5 } = req.body;

    if (!religion || !unitId || !lessonId) {
      return res.status(400).json({ 
        error: 'Missing required parameters: religion, unitId, lessonId' 
      });
    }

    // Get curriculum data
    const curriculum = allCurricula[religion as keyof typeof allCurricula];
    if (!curriculum) {
      return res.status(404).json({ error: 'Religion curriculum not found' });
    }

    // Find the specific unit and lesson
    const unit = curriculum.units.find(u => u.id === unitId);
    if (!unit) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // If requesting a specific exercise type, use single exercise flow
    if (exerciseType) {
      const singleExercise = await generateSingleExerciseFlow({
        religion,
        exerciseType,
        topic: lesson.title,
        keyTerms: lesson.keyTerms,
        difficulty: lesson.difficulty === 'beginner' ? 'easy' : 
                   lesson.difficulty === 'intermediate' ? 'medium' : 'hard',
        count: questionsPerType,
      });

      return res.status(200).json({
        success: true,
        data: singleExercise,
        metadata: {
          religion,
          unitTitle: unit.title,
          lessonTitle: lesson.title,
          exerciseType,
          count: questionsPerType,
        }
      });
    }

    // Otherwise, generate full quiz content
    const quizContent = await generateCurriculumQuizFlow({
      religion,
      unitTitle: unit.title,
      lessonTitle: lesson.title,
      learningObjectives: lesson.learningObjectives,
      keyTerms: lesson.keyTerms,
      topicsToGenerate: lesson.topicsToGenerate,
      culturalContext: lesson.culturalContext,
      difficulty: lesson.difficulty,
      questionsPerType,
    });

    return res.status(200).json({
      success: true,
      data: quizContent,
      metadata: {
        religion,
        unitTitle: unit.title,
        lessonTitle: lesson.title,
        difficulty: lesson.difficulty,
        estimatedMinutes: lesson.estimatedMinutes,
        learningObjectives: lesson.learningObjectives.length,
        keyTerms: lesson.keyTerms.length,
        topics: lesson.topicsToGenerate.length,
      }
    });

  } catch (error) {
    console.error('Error generating curriculum quiz:', error);
    return res.status(500).json({ 
      error: 'Failed to generate quiz content',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Helper function to get all available lessons for a religion
export async function getAvailableLessons(religion: string) {
  const curriculum = allCurricula[religion as keyof typeof allCurricula];
  if (!curriculum) return [];

  return curriculum.units.flatMap(unit => 
    unit.lessons.map(lesson => ({
      unitId: unit.id,
      unitTitle: unit.title,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      difficulty: lesson.difficulty,
      estimatedMinutes: lesson.estimatedMinutes,
      keyTermsCount: lesson.keyTerms.length,
      topicsCount: lesson.topicsToGenerate.length,
    }))
  );
}
