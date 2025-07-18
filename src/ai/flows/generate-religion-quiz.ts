'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating religion quizzes.
 *
 * - generateReligionQuiz - A function that generates a religion quiz based on the provided material.
 * - GenerateReligionQuizInput - The input type for the generateReligionQuiz function.
 * - GenerateReligionQuizOutput - The return type for the generateReligionQuiz function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateReligionQuizInputSchema = z.object({
  religion: z.string().describe('The religion the quiz should be about.'),
  material: z.string().describe('The material to base the quiz on.'),
});
export type GenerateReligionQuizInput = z.infer<typeof GenerateReligionQuizInputSchema>;

const GenerateReligionQuizOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      answers: z.array(z.string()).describe('The possible answers.'),
      correctAnswerIndex: z
        .number()
        .describe('The index of the correct answer in the answers array.'),
    })
  ).describe('The generated quiz questions and answers.'),
});
export type GenerateReligionQuizOutput = z.infer<typeof GenerateReligionQuizOutputSchema>;

export async function generateReligionQuiz(input: GenerateReligionQuizInput): Promise<GenerateReligionQuizOutput> {
  return generateReligionQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReligionQuizPrompt',
  input: {schema: GenerateReligionQuizInputSchema},
  output: {schema: GenerateReligionQuizOutputSchema},
  prompt: `You are an expert in creating quizzes about religions.

  Based on the following material about {{religion}}, generate a quiz with multiple-choice questions. The quiz should test the user's understanding of the key concepts in the provided material.
  
  Return the quiz in the specified JSON format. Each question must have a 'question' field, an 'answers' field which is an array of strings, and a 'correctAnswerIndex' field that is the 0-based index of the correct answer in the 'answers' array.

  Material: {{{material}}}`,
});

const generateReligionQuizFlow = ai.defineFlow(
  {
    name: 'generateReligionQuizFlow',
    inputSchema: GenerateReligionQuizInputSchema,
    outputSchema: GenerateReligionQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
