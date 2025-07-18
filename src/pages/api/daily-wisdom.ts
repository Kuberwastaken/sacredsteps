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
    const wisdom = await generateDailyWisdom({});
    
    res.status(200).json({
      wisdom,
      success: true
    });

  } catch (error) {
    console.error("Daily wisdom generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate daily wisdom"
    });
  }
}
