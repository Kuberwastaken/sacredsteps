'use server';

/**
 * @fileOverview AI flow for generating dynamic leaderboard users
 * Replaces hardcoded fake users with AI-generated, diverse community members
 */

import { ai } from '../genkit';
import { z } from 'genkit';

const GenerateLeaderboardUsersInputSchema = z.object({
  userCount: z.number().min(10).max(50).default(20).describe('Number of users to generate'),
  currentUserXP: z.number().default(0).describe('Current user XP to create realistic competition'),
  includeDiversity: z.boolean().default(true).describe('Include culturally diverse names and backgrounds')
});

export type GenerateLeaderboardUsersInput = z.infer<typeof GenerateLeaderboardUsersInputSchema>;

const GenerateLeaderboardUsersOutputSchema = z.object({
  users: z.array(z.object({
    name: z.string(),
    xp: z.number(),
    isCurrentUser: z.boolean(),
    level: z.number(),
    streak: z.number(),
    favoriteReligion: z.string().optional(),
    country: z.string().optional(),
    joinDate: z.string().optional().describe('When they joined, in relative terms like "2 weeks ago"')
  })),
  communityStats: z.object({
    totalMembers: z.number(),
    averageXP: z.number(),
    topReligionStudied: z.string(),
    diversityScore: z.number().describe('Score from 0-100 representing cultural diversity')
  })
});

export type GenerateLeaderboardUsersOutput = z.infer<typeof GenerateLeaderboardUsersOutputSchema>;

export async function generateLeaderboardUsers(
  input: GenerateLeaderboardUsersInput
): Promise<GenerateLeaderboardUsersOutput> {
  return generateLeaderboardUsersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLeaderboardUsersPrompt',
  input: { schema: GenerateLeaderboardUsersInputSchema },
  output: { schema: GenerateLeaderboardUsersOutputSchema },
  prompt: `You are a community manager for a global religious studies learning platform. Your task is to create a vibrant, diverse leaderboard that reflects the international nature of spiritual learning.

**Community Parameters:**
- User Count: {{userCount}}
- Current User XP: {{currentUserXP}}
- Include Diversity: {{includeDiversity}}

**Community Vision:**
Create a welcoming, inclusive learning community where people from all backgrounds come together to explore world religions with curiosity, respect, and genuine interest in understanding each other's spiritual traditions.

**User Generation Guidelines:**

**Name Diversity:**
{{#if includeDiversity}}
- Include names from various cultural backgrounds: European, Asian, African, Middle Eastern, Latin American, Indigenous, etc.
- Use both traditional and modern names
- Represent different language origins and cultural traditions
- Ensure gender balance across all cultures
{{else}}
- Focus on common international names
- Maintain cultural variety but keep names broadly recognizable
{{/if}}

**XP Distribution Strategy:**
- Create realistic skill levels around the current user ({{currentUserXP}})
- Include users both above and below the current user's level
- Generate a natural bell curve distribution
- Include some high achievers (500+ XP) and some newcomers (0-50 XP)
- Make progression feel achievable and motivating

**Community Characteristics:**
- **Engagement Levels**: Mix of daily learners, casual explorers, and dedicated scholars
- **Study Preferences**: Diverse religious interests reflecting global curiosity
- **Geographic Spread**: Represent different time zones and cultural contexts
- **Learning Journeys**: Various join dates showing ongoing community growth

**Streak Patterns:**
- Realistic streak numbers (1-365 days)
- Reflect genuine learning patterns
- Include both consistent learners and those taking breaks
- Show achievable goals for motivation

**Favorite Religion Distribution:**
- Represent major world religions proportionally
- Include both mainstream and lesser-known traditions
- Show people studying religions different from their cultural background
- Reflect genuine cross-cultural learning interests

**Community Statistics:**
- Calculate meaningful averages and trends
- Identify the most popular religion being studied
- Generate a diversity score reflecting cultural representation
- Create stats that celebrate the global learning community

**Authenticity Standards:**
- Names should feel real and respectful
- XP levels should reflect genuine learning investment
- Geographic spread should represent global internet access
- Learning patterns should feel human and varied

Create a leaderboard that makes every user feel part of a thriving, diverse, respectful community of spiritual learners.

Return ONLY valid JSON following the exact schema provided.`,
});

const generateLeaderboardUsersFlow = ai.defineFlow(
  {
    name: 'generateLeaderboardUsersFlow',
    inputSchema: GenerateLeaderboardUsersInputSchema,
    outputSchema: GenerateLeaderboardUsersOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
