import type { NextApiRequest, NextApiResponse } from "next";
import { generateComprehensiveCourse } from "~/ai/flows/generate-comprehensive-course";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Testing course generation for Christianity...");
    
    const courseStructure = await generateComprehensiveCourse({
      religion: "Christianity",
      targetAudience: 'complete_beginner',
      focusAreas: ['core beliefs', 'sacred texts', 'practices'],
    });

    console.log("Course generation successful!");
    console.log("Generated course:", JSON.stringify(courseStructure, null, 2));
    
    res.status(200).json({
      success: true,
      course: courseStructure
    });
    
  } catch (error) {
    console.error("Course generation error:", error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : "Failed to generate course",
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
