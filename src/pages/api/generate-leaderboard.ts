import type { NextApiRequest, NextApiResponse } from "next";
import { generateLeaderboardUsers } from "~/ai/flows/generate-leaderboard-users";

export type GenerateLeaderboardRequest = {
  userCount?: number;
  currentUserXP?: number;
  includeDiversity?: boolean;
};

export type GenerateLeaderboardResponse = {
  users?: any[];
  communityStats?: any;
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateLeaderboardResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { 
      userCount = 20, 
      currentUserXP = 0, 
      includeDiversity = true 
    } = req.body as GenerateLeaderboardRequest;

    const result = await generateLeaderboardUsers({
      userCount,
      currentUserXP,
      includeDiversity
    });

    res.status(200).json({
      users: result.users,
      communityStats: result.communityStats,
      success: true
    });

  } catch (error) {
    console.error("Leaderboard generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate leaderboard"
    });
  }
}
