import type { NextApiRequest, NextApiResponse } from "next";
import { generateReligionQuiz } from "~/ai/flows/generate-religion-quiz";
import { generateMatchPairs } from "~/ai/flows/generate-match-pairs";

export type QuizQuestion = {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank" | "match_pairs";
  question: string;
  options?: string[];
  pairs?: { term: string; definition: string }[];
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

// AI-powered quiz generation with mixed question types
const generateEnhancedQuiz = async (req: GenerateQuizRequest): Promise<QuizQuestion[]> => {
  const { religion, topic, difficulty, questionCount = 5 } = req;
  
  try {
    const questions: QuizQuestion[] = [];
    
    // Determine question types distribution
    const shouldIncludeMatchPairs = questionCount >= 4 && Math.random() < 0.4; // 40% chance for match pairs
    
    if (shouldIncludeMatchPairs) {
      // Generate 1 match pairs exercise
      const matchPairsResult = await generateMatchPairs({
        religion,
        topic,
        difficulty,
        pairCount: 6,
      });
      
      questions.push({
        id: "match-pairs-1",
        type: "match_pairs",
        question: matchPairsResult.instruction,
        pairs: matchPairsResult.pairs,
        correctAnswer: matchPairsResult.pairs.length, // All pairs must be matched
        explanation: `Match the ${religion} concepts with their correct definitions.`
      });
    }
    
    // Generate remaining multiple choice questions
    const mcQuestionCount = shouldIncludeMatchPairs ? questionCount - 1 : questionCount;
    
    if (mcQuestionCount > 0) {
      const aiResult = await generateReligionQuiz({
        religion,
        topic,
        difficulty,
        questionCount: Math.min(mcQuestionCount, 9), // Leave room for match pairs
      });
      
      const mcQuestions = aiResult.quiz.map((q, idx) => ({
        id: String(questions.length + idx + 1),
        type: "multiple_choice" as const,
        question: q.question,
        options: q.answers,
        correctAnswer: q.correctAnswerIndex,
        explanation: `Based on ${religion} teachings about ${topic}.`
      }));
      
      questions.push(...mcQuestions);
    }
    
    // Shuffle questions for variety
    return questions.sort(() => Math.random() - 0.5);
    
  } catch (error) {
    console.error("AI quiz generation failed:", error);
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
