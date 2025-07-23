'use server';
/**
 * @fileOverview Flow to generate a personal growth quiz based on a given story or wisdom text.
 *
 * - generatePersonalGrowthQuiz - A function that generates a personal growth quiz.
 * - GeneratePersonalGrowthQuizInput - The input type for the generatePersonalGrowthQuiz function.
 * - GeneratePersonalGrowthQuizOutput - The return type for the generatePersonalGrowthQuiz function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GeneratePersonalGrowthQuizInputSchema = z.object({
  wisdomText: z
    .string()
    .describe('The wisdom text or story to generate the quiz from.'),
  numberOfQuestions: z
    .number()
    .default(3)
    .describe('The number of questions to generate for the quiz.'),
});
export type GeneratePersonalGrowthQuizInput = z.infer<
  typeof GeneratePersonalGrowthQuizInputSchema
>;

const GeneratePersonalGrowthQuizOutputSchema = z.object({
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
export type GeneratePersonalGrowthQuizOutput = z.infer<
  typeof GeneratePersonalGrowthQuizOutputSchema
>;

export async function generatePersonalGrowthQuiz(
  input: GeneratePersonalGrowthQuizInput
): Promise<GeneratePersonalGrowthQuizOutput> {
  return generatePersonalGrowthQuizFlow(input);
}

const generatePersonalGrowthQuizPrompt = ai.definePrompt({
  name: 'generatePersonalGrowthQuizPrompt',
  input: {schema: GeneratePersonalGrowthQuizInputSchema},
  output: {schema: GeneratePersonalGrowthQuizOutputSchema},
  prompt: `You are an AI that generates quizzes to reinforce lessons and track personal growth.

  Based on the following wisdom text, generate a quiz with {{numberOfQuestions}} questions.

  Wisdom Text: {{{wisdomText}}}

  Each question should have multiple choice answers, with one correct answer.

  Return the quiz in the following JSON format:
  {
    "quiz": [
      {
        "question": "Question 1",
        "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        "correctAnswerIndex": 0
      },
      {
        "question": "Question 2",
        "answers": ["Answer A", "Answer B", "Answer C", "Answer D"],
        "correctAnswerIndex": 2
      }
    ]
  }
  `,
});

const generatePersonalGrowthQuizFlow = ai.defineFlow(
  {
    name: 'generatePersonalGrowthQuizFlow',
    inputSchema: GeneratePersonalGrowthQuizInputSchema,
    outputSchema: GeneratePersonalGrowthQuizOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalGrowthQuizPrompt(input);
    return output!;
  }
); 
