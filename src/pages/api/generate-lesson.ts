import type { NextApiRequest, NextApiResponse } from "next";
import { generateLessonContent } from "~/ai/flows/generate-lesson-content";

export type GenerateLessonRequest = {
  religion: string;
  topic: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lessonType?: 'vocabulary' | 'concept-matching' | 'reading-comprehension' | 'practice-application';
  exerciseCount?: number;
};

export type GenerateLessonResponse = {
  lesson?: any;
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateLessonResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { 
      religion, 
      topic, 
      difficulty = 'beginner', 
      lessonType = 'vocabulary', 
      exerciseCount = 4 
    } = req.body as GenerateLessonRequest;

    if (!religion || !topic) {
      return res.status(400).json({ 
        success: false, 
        error: "Religion and topic are required" 
      });
    }

    const lesson = await generateLessonContent({
      religion,
      topic,
      difficulty,
      lessonType,
      exerciseCount
    });

    res.status(200).json({
      lesson,
      success: true
    });

  } catch (error) {
    console.error("Lesson generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate lesson content"
    });
  }
}
