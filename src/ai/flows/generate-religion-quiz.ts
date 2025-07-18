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
  religion: z
    .string()
    .describe('The religion the quiz should be about.'),
  topic: z
    .string()
    .describe('The specific topic within the religion to base the quiz on.'),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .default('beginner')
    .describe('The learner skill level that the questions should be geared towards.'),
  questionCount: z
    .number()
    .min(3)
    .max(20)
    .default(5)
    .describe('How many questions to generate.'),
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
  prompt: `You are a world-renowned religious studies professor and pedagogical expert, skilled in creating engaging, educational assessments. Your task is to generate a comprehensive quiz about world religions that is both respectful and academically rigorous.

**Context & Approach:**
- Religion: {{religion}}
- Topic: {{topic}}
- Difficulty: {{difficulty}}
- Question Count: {{questionCount}}

**Your Expertise Requirements:**
1. **Academic Accuracy**: Every question must be factually correct and represent authentic religious teachings
2. **Cultural Sensitivity**: Approach all religions with deep respect and understanding
3. **Progressive Learning**: Structure questions to build understanding from basic concepts to deeper insights
4. **Diverse Question Types**: Include various formats to accommodate different learning styles
5. **Meaningful Explanations**: Provide context that enhances understanding

**Question Generation Strategy:**
- For BEGINNER level: Focus on fundamental concepts, key figures, basic practices
- For INTERMEDIATE level: Explore connections between concepts, historical context, comparative elements
- For ADVANCED level: Examine philosophical implications, theological debates, contemporary relevance

**Quality Standards:**
- Questions should be clear, unambiguous, and intellectually stimulating
- Avoid oversimplification while maintaining accessibility
- Include both factual recall and conceptual understanding
- Ensure cultural authenticity and avoid stereotypes
- Make learning enjoyable and memorable

**Content Guidelines:**
- Draw from authentic religious texts, teachings, and practices
- Include historical context where relevant
- Highlight the positive aspects and contributions of the religion
- Encourage critical thinking and deeper exploration
- Connect abstract concepts to practical applications

Generate {{questionCount}} high-quality multiple-choice questions that will genuinely enhance the learner's understanding of {{topic}} within {{religion}}.

Output MUST follow this exact JSON schema:
{
  "quiz": [
    {
      "question": "Thoughtfully crafted question that promotes understanding",
      "answers": ["Correct answer", "Plausible distractor", "Another distractor", "Third distractor"],
      "correctAnswerIndex": 0
    }
  ]
}

Remember: You are not just testing knowledge, but fostering genuine understanding and appreciation for the rich diversity of human spiritual experience.`,
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
