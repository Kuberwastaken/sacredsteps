'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating match pairs exercises.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateMatchPairsInputSchema = z.object({
  religion: z
    .string()
    .describe('The religion the exercise should be about.'),
  topic: z
    .string()
    .describe('The specific topic within the religion to base the exercise on.'),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .default('beginner')
    .describe('The learner skill level that the pairs should be geared towards.'),
  pairCount: z
    .number()
    .min(4)
    .max(10)
    .default(6)
    .describe('How many pairs to generate.'),
});
export type GenerateMatchPairsInput = z.infer<typeof GenerateMatchPairsInputSchema>;

const GenerateMatchPairsOutputSchema = z.object({
  instruction: z.string().describe('Clear instruction for the matching exercise'),
  pairs: z.array(
    z.object({
      term: z.string().describe('The term, concept, or key word'),
      definition: z.string().describe('The definition, explanation, or matching concept'),
    })
  ).describe('The pairs to be matched in the exercise'),
});
export type GenerateMatchPairsOutput = z.infer<typeof GenerateMatchPairsOutputSchema>;

const generateMatchPairsFlow = ai.defineFlow(
  {
    name: 'generateMatchPairs',
    inputSchema: GenerateMatchPairsInputSchema,
    outputSchema: GenerateMatchPairsOutputSchema,
  },
  async (input) => {
    const {religion, topic, difficulty, pairCount} = input;

    const difficultyPrompts = {
      beginner: 'Use simple, fundamental concepts that a newcomer would need to know.',
      intermediate: 'Include more specific terms and deeper concepts that require some background knowledge.',
      advanced: 'Focus on complex theological concepts, historical details, and nuanced interpretations.'
    };

    const response = await ai.generate({
      model: 'openai/',
      prompt: `Create a matching pairs exercise for learning about ${topic} in ${religion}.

${difficultyPrompts[difficulty]}

Generate exactly ${pairCount} pairs where:
- Each pair consists of a term/concept and its definition/explanation
- Terms should be key concepts, important figures, sacred texts, practices, or beliefs related to ${topic}
- Definitions should be clear, concise explanations (1-2 sentences max)
- Ensure variety: mix concepts, practices, figures, and beliefs
- Make sure each term has only ONE correct match
- Avoid overly obvious matches - make it educational but not trivial
- Use language appropriate for someone learning about ${religion}

Examples of good pairs:
- Term: "Meditation" → Definition: "Practice of focused attention to achieve mental clarity"
- Term: "Prophet Muhammad" → Definition: "Final messenger of God in Islamic belief"
- Term: "Torah" → Definition: "The first five books of the Hebrew Bible"

Provide a clear instruction for the exercise and the pairs to match.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    return response.output();
  }
);

export async function generateMatchPairs(input: GenerateMatchPairsInput): Promise<GenerateMatchPairsOutput> {
  return generateMatchPairsFlow(input);
}
