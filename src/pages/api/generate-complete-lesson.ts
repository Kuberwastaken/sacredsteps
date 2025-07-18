import { NextApiRequest, NextApiResponse } from 'next';
import { generateCompleteLesson } from '~/ai/flows/generate-complete-lesson';

interface GenerateCompleteLessonRequest {
  religion: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  conceptCount: number;
  exerciseCount: number;
  quizCount: number;
}

interface GenerateCompleteLessonResponse {
  success: boolean;
  lesson?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateCompleteLessonResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { 
      religion, 
      topic, 
      difficulty, 
      duration, 
      conceptCount, 
      exerciseCount, 
      quizCount 
    } = req.body as GenerateCompleteLessonRequest;

    if (!religion || !topic) {
      return res.status(400).json({ 
        success: false, 
        error: 'Religion and topic are required' 
      });
    }

    // Generate complete lesson structure using AI
    const result = await generateCompleteLesson({
      religion,
      topic,
      difficulty: difficulty || 'beginner',
      duration: duration || 15,
      conceptCount: conceptCount || 3,
      exerciseCount: exerciseCount || 4,
      quizCount: quizCount || 5
    });

    // Check if AI generated lesson content
    if (!result || !result.lesson) {
      return res.status(503).json({
        success: false,
        error: 'AI service is currently unavailable. Please try again later.'
      });
    }

    res.status(200).json({
      lesson: result.lesson,
      success: true
    });

  } catch (error) {
    console.error('Complete lesson generation error:', error);
    res.status(500).json({
      success: false,
      error: 'AI lesson generation failed. Please try again later.'
    });
  }
}
