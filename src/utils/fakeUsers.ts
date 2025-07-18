// This file now uses AI-generated dynamic users instead of hardcoded ones
// Users are generated based on the current user's XP and community diversity
import { generateLeaderboardUsers } from "~/ai/flows/generate-leaderboard-users";

// Cache for generated users to avoid regenerating on every request
let cachedUsers: any[] | null = null;
let lastGeneratedTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getDynamicUsers(currentUserXP: number = 0) {
  const now = Date.now();
  
  // Use cached users if they're still fresh
  if (cachedUsers && (now - lastGeneratedTime) < CACHE_DURATION) {
    return cachedUsers;
  }
  
  try {
    const result = await generateLeaderboardUsers({
      userCount: 20,
      currentUserXP,
      includeDiversity: true
    });
    
    cachedUsers = result.users;
    lastGeneratedTime = now;
    
    return result.users;
  } catch (error) {
    console.error("Failed to generate dynamic users:", error);
    
    // Fallback to minimal hardcoded users if AI fails
    return [
      { name: "Alex", xp: Math.max(currentUserXP - 50, 0), isCurrentUser: false, level: 1, streak: 3 },
      { name: "Jordan", xp: Math.max(currentUserXP - 25, 0), isCurrentUser: false, level: 1, streak: 5 },
      { name: "Sam", xp: currentUserXP + 25, isCurrentUser: false, level: 2, streak: 7 },
      { name: "Casey", xp: currentUserXP + 50, isCurrentUser: false, level: 2, streak: 10 }
    ];
  }
}

// Legacy export for backward compatibility
export const fakeUsers = [
  { name: "Loading...", xp: 0, isCurrentUser: false }
] as const;
