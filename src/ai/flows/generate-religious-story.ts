'use server';
/**
 * @fileOverview A flow to generate a story, takeaways, and quiz from a given religion.
 *
 * - generateReligiousStory - A function that generates a complete story lesson.
 * - GenerateReligiousStoryInput - The input type for the function.
 * - GenerateReligiousStoryOutput - The return type for the function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateReligiousStoryInputSchema = z.object({
  religionName: z.string().describe('The name of the religion to generate a story for.'),
});
export type GenerateReligiousStoryInput = z.infer<typeof GenerateReligiousStoryInputSchema>;

const GenerateReligiousStoryOutputSchema = z.object({
    title: z.string().describe('A simple, clear title for the story.'),
    story: z.string().describe('A short, compelling story or parable (around 150-300 words) that illustrates a key value or teaching of the religion.'),
    takeaways: z.array(z.string()).describe('A list of 3-4 key lessons or takeaways from the story.'),
    quiz: z.array(z.object({
      question: z.string().describe('The quiz question.'),
      answers: z.array(z.string()).describe('The possible answers.'),
      correctAnswerIndex: z
        .number()
        .describe('The index of the correct answer in the answers array.'),
    })).describe('A short, 3-question quiz based on the story.'),
});
export type GenerateReligiousStoryOutput = z.infer<typeof GenerateReligiousStoryOutputSchema>;

export async function generateReligiousStory(input: GenerateReligiousStoryInput): Promise<GenerateReligiousStoryOutput> {
  return generateReligiousStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReligiousStoryPrompt',
  input: {schema: GenerateReligiousStoryInputSchema},
  output: {schema: GenerateReligiousStoryOutputSchema},
  prompt: `You are an AI assistant that creates educational content about world religions. Your goal is to find a short story, parable, or piece of wisdom from the holy texts or traditions of a specific religion.

  For the religion "{{religionName}}", please do the following:
  1.  Find or create a short, compelling story or parable (around 150-300 words) that illustrates a key value or teaching of the religion. The story should be engaging and easy to understand for a general audience.
  2.  Give the story a simple, clear title.
  3.  Based on the story, generate a list of 3-4 key takeaways or moral lessons from the story. These should be insightful and thought-provoking.
  4.  Generate a short quiz with 3 multiple-choice questions to test comprehension and reflection on the story's message.

  Return the result in the specified JSON format.
  `,
});

const generateReligiousStoryFlow = ai.defineFlow(
  {
    name: 'generateReligiousStoryFlow',
    inputSchema: GenerateReligiousStoryInputSchema,
    outputSchema: GenerateReligiousStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
); 
