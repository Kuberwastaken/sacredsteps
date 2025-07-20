import { NextApiRequest, NextApiResponse } from 'next';
import generateCompleteLessonFlow from '~/ai/flows/generate-complete-lesson-minimal';

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

    console.log('Using MINIMAL AI lesson generation to avoid rate limits');

    // Generate complete lesson structure using MINIMAL AI calls
    const result = await generateCompleteLessonFlow({
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

    console.log('Successfully generated lesson with minimal AI usage');

    res.status(200).json({
      lesson: result.lesson,
      success: true
    });

  } catch (error) {
    console.error('Minimal lesson generation error:', error);
    res.status(500).json({
      success: false,
      error: 'AI lesson generation failed. Please try again later.'
    });
  }
}
