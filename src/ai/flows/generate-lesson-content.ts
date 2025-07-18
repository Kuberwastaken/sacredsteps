'use server';

/**
 * @fileOverview AI flow for generating dynamic lesson content
 * Replaces hardcoded lesson problems with AI-generated, adaptive content
 */

import { ai } from '../genkit';
import { z } from 'genkit';

const GenerateLessonContentInputSchema = z.object({
  religion: z.string().describe('The religion this lesson is about'),
  topic: z.string().describe('The specific topic/lesson title'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  lessonType: z.enum(['vocabulary', 'concept-matching', 'reading-comprehension', 'practice-application']).default('vocabulary'),
  exerciseCount: z.number().min(2).max(8).default(4).describe('Number of exercises to generate')
});

export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;

const GenerateLessonContentOutputSchema = z.object({
  lessonTitle: z.string(),
  lessonDescription: z.string(),
  exercises: z.array(z.object({
    id: z.string(),
    type: z.enum(['SELECT_1_OF_3', 'WRITE_IN_ENGLISH', 'MATCH_PAIRS', 'ARRANGE_ORDER', 'TRUE_FALSE']),
    question: z.string(),
    instruction: z.string().optional(),
    correctAnswer: z.union([z.number(), z.string(), z.array(z.number())]),
    options: z.array(z.object({
      text: z.string(),
      visual: z.string().optional().describe('Description for visual representation'),
      explanation: z.string().optional()
    })).optional(),
    answerTiles: z.array(z.string()).optional().describe('For WRITE_IN_ENGLISH type exercises'),
    explanation: z.string().describe('Educational explanation of the correct answer'),
    culturalContext: z.string().optional().describe('Additional cultural or historical context')
  }))
});

export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;

export async function generateLessonContent(
  input: GenerateLessonContentInput
): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: { schema: GenerateLessonContentInputSchema },
  output: { schema: GenerateLessonContentOutputSchema },
  prompt: `You are an innovative educational content creator specializing in interactive religious studies lessons. Your expertise lies in making complex spiritual concepts accessible and engaging through carefully designed exercises.

**Assignment Parameters:**
- Religion: {{religion}}
- Topic: {{topic}}
- Difficulty: {{difficulty}}
- Lesson Type: {{lessonType}}
- Exercise Count: {{exerciseCount}}

**Your Educational Philosophy:**
Transform abstract religious concepts into concrete, interactive learning experiences that respect the sacred nature of the material while making it genuinely engaging for modern learners.

**Exercise Design Guidelines:**

**SELECT_1_OF_3 Exercises:**
- Present visual or conceptual choices about religious symbols, figures, or concepts
- Use clear, distinctive options that test genuine understanding
- Include meaningful visual descriptions for symbols, artwork, or ritual objects

**WRITE_IN_ENGLISH Exercises:**
- Transform religious phrases, concepts, or teachings into English
- Provide word tiles that require thoughtful arrangement
- Focus on key terminology and meaningful phrases

**MATCH_PAIRS Exercises:**
- Connect related religious concepts, terms, or practices
- Create meaningful associations that enhance understanding
- Include historical figures with their contributions, terms with definitions

**ARRANGE_ORDER Exercises:**
- Sequence historical events, ritual steps, or conceptual progressions
- Help learners understand chronology and logical flow
- Focus on processes, ceremonies, or developmental stages

**TRUE_FALSE Exercises:**
- Address common misconceptions respectfully
- Clarify important distinctions and facts
- Include nuanced statements that require deeper understanding

**Content Quality Standards:**
1. **Cultural Authenticity**: Every element must be accurate and respectful
2. **Educational Value**: Each exercise should genuinely advance understanding
3. **Engagement Factor**: Make learning enjoyable and memorable
4. **Progressive Challenge**: Align difficulty with learner level
5. **Meaningful Context**: Provide explanations that enrich understanding

**Sensitivity Guidelines:**
- Treat all religious content with utmost respect
- Avoid stereotypes or oversimplifications
- Present diverse perspectives within traditions
- Focus on positive aspects and contributions
- Encourage appreciation rather than just memorization

**Technical Requirements:**
- correctAnswer format varies by exercise type:
  - SELECT_1_OF_3: number (index of correct option)
  - WRITE_IN_ENGLISH: array of numbers (indices of correct word tiles in order)
  - MATCH_PAIRS: array of numbers (correct pairing indices)
  - ARRANGE_ORDER: array of numbers (correct sequence indices)
  - TRUE_FALSE: string ("true" or "false")

Create {{exerciseCount}} engaging exercises that will deepen learners' appreciation and understanding of {{topic}} within {{religion}}.

Return ONLY valid JSON following the exact schema provided.`,
});

const generateLessonContentFlow = ai.defineFlow(
  {
    name: 'generateLessonContentFlow',
    inputSchema: GenerateLessonContentInputSchema,
    outputSchema: GenerateLessonContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
