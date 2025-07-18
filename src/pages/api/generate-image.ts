import type { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "~/ai/flows/generate-image";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await generateImage({ prompt });
    
    return res.status(200).json({ 
      success: true, 
      data: result 
    });

  } catch (error) {
    console.error("Image generation error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Failed to generate image" 
    });
  }
}
