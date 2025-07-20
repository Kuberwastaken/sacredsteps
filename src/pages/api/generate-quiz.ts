import type { NextApiRequest, NextApiResponse } from "next";
import { generateReligionQuiz } from "~/ai/flows/generate-religion-quiz";

export type QuizQuestion = {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
};

export type GenerateQuizRequest = {
  religion: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionCount?: number;
};

export type GenerateQuizResponse = {
  questions?: QuizQuestion[];
  success: boolean;
  error?: string;
};

// AI-powered quiz generation with pure AI responses
const generateEnhancedQuiz = async (req: GenerateQuizRequest): Promise<QuizQuestion[]> => {
  const { religion, topic, difficulty, questionCount = 5 } = req;
  
  // Try AI generation - no fallbacks, pure AI content
  try {
    const aiResult = await generateReligionQuiz({
      religion,
      topic,
      difficulty,
      questionCount: Math.min(questionCount, 10), // Limit to prevent excessive generation
    });
    
    return aiResult.quiz.map((q, idx) => ({
      id: String(idx + 1),
      type: "multiple_choice" as const,
      question: q.question,
      options: q.answers,
      correctAnswer: q.correctAnswerIndex,
      explanation: `Based on ${religion} teachings about ${topic}.`
    }));
  } catch (error) {
    console.error("AI quiz generation failed:", error);
    
    // Return empty array instead of fallback - let frontend handle the error
    return [];
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateQuizResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const requestBody = req.body as GenerateQuizRequest;
    const { religion, topic, difficulty, questionCount = 5 } = requestBody;

    if (!religion || !topic) {
      return res.status(400).json({ 
        success: false, 
        error: "Religion and topic are required" 
      });
    }

    // Generate quiz using enhanced AI function
    const questions = await generateEnhancedQuiz({ religion, topic, difficulty, questionCount });
    
    // Check if AI generated any questions
    if (questions.length === 0) {
      return res.status(503).json({
        success: false,
        error: "AI service is currently unavailable. Please try again later."
      });
    }
    
    res.status(200).json({
      questions: questions.slice(0, questionCount),
      success: true
    });

  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({
      success: false,
      error: "AI quiz generation failed. Please try again later."
    });
  }
}
