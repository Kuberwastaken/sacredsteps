import type { NextApiRequest, NextApiResponse } from "next";
import { generateComprehensiveCourse } from "~/ai/flows/generate-comprehensive-course";

export type GenerateCourseRequest = {
  religion: string;
  targetAudience: "complete_beginner" | "some_knowledge" | "intermediate";
  focusAreas?: string[];
};

export type CourseUnit = {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  theme: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  lessons: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    estimatedMinutes: number;
    learningObjectives: string[];
    keyTerms: Array<{
      term: string;
      definition: string;
    }>;
    prerequisites?: string[];
  }>;
  checkpointLesson: {
    id: string;
    title: string;
    description: string;
    type: "checkpoint";
  };
  estimatedWeeks: number;
};

export type GenerateCourseResponse = {
  religion: string;
  courseTitle: string;
  description: string;
  totalEstimatedWeeks: number;
  difficultyProgression: string[];
  units: CourseUnit[];
  culturalContext: string;
  modernRelevance: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateCourseResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { religion, targetAudience, focusAreas }: GenerateCourseRequest = req.body;

    if (!religion || !targetAudience) {
      return res.status(400).json({ error: "Religion and target audience are required" });
    }

    console.log(`Generating comprehensive course for ${religion}...`);
    
    const courseStructure = await generateComprehensiveCourse({
      religion,
      targetAudience,
      focusAreas,
    });

    console.log(`Course generation completed for ${religion}`);
    
    res.status(200).json(courseStructure);
  } catch (error) {
    console.error("Error generating course:", error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : "Failed to generate course structure" 
    });
  }
}
