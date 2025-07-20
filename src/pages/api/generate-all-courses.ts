import type { NextApiRequest, NextApiResponse } from "next";
import { generateComprehensiveCourse } from "~/ai/flows/generate-comprehensive-course";
import { religions } from "~/utils/religions";

export type GenerateAllCoursesResponse = {
  success: boolean;
  coursesGenerated: number;
  errors: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateAllCoursesResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Starting generation of all religion courses...");
    
    const results = [];
    const errors = [];
    let coursesGenerated = 0;

    // Generate course for each religion
    for (const religion of religions) {
      try {
        console.log(`Generating course for ${religion.name}...`);
        
        const courseStructure = await generateComprehensiveCourse({
          religion: religion.name,
          targetAudience: 'complete_beginner',
          focusAreas: [
            'historical development',
            'core beliefs and practices',
            'sacred texts',
            'cultural traditions',
            'modern relevance'
          ],
        });

        results.push({
          religion: religion.name,
          success: true,
          courseStructure
        });
        
        coursesGenerated++;
        console.log(`✅ Course generated for ${religion.name}`);
        
      } catch (error) {
        console.error(`❌ Error generating course for ${religion.name}:`, error);
        errors.push(`${religion.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        
        results.push({
          religion: religion.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    console.log(`Course generation completed. Success: ${coursesGenerated}/${religions.length}`);
    
    res.status(200).json({
      success: errors.length === 0,
      coursesGenerated,
      errors
    });
    
  } catch (error) {
    console.error("Error in bulk course generation:", error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : "Failed to generate courses" 
    });
  }
}
