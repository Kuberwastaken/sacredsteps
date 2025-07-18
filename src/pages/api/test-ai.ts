import type { NextApiRequest, NextApiResponse } from "next";
import { generateSkillNode } from "~/ai/flows/generate-skill-node";
import { generateDailyWisdom } from "~/ai/flows/generate-daily-wisdom";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type } = req.body;

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

    return res.status(400).json({ error: "Invalid type parameter" });

  } catch (error) {
    console.error("AI generation error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Failed to generate AI content" 
    });
  }
} 