import type { NextApiRequest, NextApiResponse } from "next";
import { generateReligionCurriculum } from "~/ai/flows/generate-religion-curriculum";

export type GenerateCurriculumRequest = {
  religion: string;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  focusAreas?: string[];
  unitCount?: number;
};

export type GenerateCurriculumResponse = {
  curriculum?: any;
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateCurriculumResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { religion, userLevel = 'beginner', focusAreas, unitCount = 3 } = req.body as GenerateCurriculumRequest;

    if (!religion) {
      return res.status(400).json({ 
        success: false, 
        error: "Religion is required" 
      });
    }

    const curriculum = await generateReligionCurriculum({
      religion,
      userLevel,
      focusAreas,
      unitCount
    });

    res.status(200).json({
      curriculum,
      success: true
    });

  } catch (error) {
    console.error("Curriculum generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate curriculum"
    });
  }
}
