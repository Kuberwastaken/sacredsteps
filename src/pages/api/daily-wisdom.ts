import type { NextApiRequest, NextApiResponse } from "next";
import { generateDailyWisdom } from "~/ai/flows/generate-daily-wisdom";

export type DailyWisdomResponse = {
  wisdom?: {
    saying: string;
    religion: string;
  };
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DailyWisdomResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    // Check if API key is available
    if (!process.env.AZURE_OPENAI_API_KEY || !process.env.AZURE_OPENAI_ENDPOINT) {
      console.log('No Azure OpenAI credentials found, client will use fallback content');
      return res.status(503).json({ 
        success: false, 
        error: "AI service unavailable" 
      });
    }

    const wisdom = await generateDailyWisdom({});
    
    res.status(200).json({
      wisdom,
      success: true
    });

  } catch (error: any) {
    console.log("Daily wisdom generation error:", error);
    
    // Check if it's a Google AI API overload error
    if (error?.status === 503 || error?.message?.includes('overloaded')) {
      console.log('AI service temporarily overloaded, client will use fallback');
      res.status(503).json({
        success: false,
        error: "AI service temporarily overloaded"
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to generate daily wisdom"
      });
    }
  }
}
