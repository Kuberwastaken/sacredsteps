import type { NextApiRequest, NextApiResponse } from "next";
import { generateSkillNode } from "~/ai/flows/generate-skill-node";
import { generateDailyWisdom } from "~/ai/flows/generate-daily-wisdom";
import { generateReligionCurriculum } from "~/ai/flows/generate-religion-curriculum";
import { generateLessonContent } from "~/ai/flows/generate-lesson-content";
import { generateLeaderboardUsers } from "~/ai/flows/generate-leaderboard-users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type } = req.body;

    // Check if API key is available
    if (!process.env.GOOGLE_AI_API_KEY && !process.env.GOOGLE_GENAI_API_KEY) {
      console.log('No Google AI API key found, client will use fallback content');
      return res.status(503).json({ 
        error: "AI service unavailable", 
        success: false 
      });
    }

    if (type === "wisdom") {
      const wisdom = await generateDailyWisdom({});
      return res.status(200).json({ success: true, data: wisdom });
    }

    if (type === "skill") {
      const { religion, skillTitle, description, nodeId } = req.body;
      const skillNode = await generateSkillNode({
        religion: religion || "Buddhism",
        skillTitle: skillTitle || "Core Concepts",
        description: description || "Learn about the fundamental concepts",
        nodeId: nodeId || "test-1"
      });
      return res.status(200).json({ success: true, data: skillNode });
    }

    if (type === "curriculum") {
      const { religion, userLevel, focusAreas, unitCount } = req.body;
      const curriculum = await generateReligionCurriculum({
        religion: religion || "Christianity",
        userLevel: userLevel || "beginner",
        focusAreas: focusAreas || ["history", "practices"],
        unitCount: unitCount || 3
      });
      return res.status(200).json({ success: true, data: curriculum });
    }

    if (type === "lesson") {
      const { religion, topic, difficulty, lessonType, exerciseCount } = req.body;
      const lesson = await generateLessonContent({
        religion: religion || "Islam",
        topic: topic || "Five Pillars",
        difficulty: difficulty || "beginner",
        lessonType: lessonType || "vocabulary",
        exerciseCount: exerciseCount || 4
      });
      return res.status(200).json({ success: true, data: lesson });
    }

    if (type === "leaderboard") {
      const { userCount, currentUserXP, includeDiversity } = req.body;
      const leaderboard = await generateLeaderboardUsers({
        userCount: userCount || 15,
        currentUserXP: currentUserXP || 100,
        includeDiversity: includeDiversity !== false
      });
      return res.status(200).json({ success: true, data: leaderboard });
    }

    return res.status(400).json({ error: "Invalid type parameter. Use: wisdom, skill, curriculum, lesson, or leaderboard" });

  } catch (error) {
    console.error("AI generation error:", error);
    
    // Check if it's a rate limit or overload error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('overloaded') || errorMessage.includes('503')) {
      return res.status(503).json({ 
        success: false, 
        error: "AI service temporarily overloaded. Please try again in a moment." 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      error: "Failed to generate AI content" 
    });
  }
} 