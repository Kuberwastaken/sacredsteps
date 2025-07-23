import { defineFlow } from '@genkit-ai/flow';
import { ai, AZURE_MODEL_NAME } from '../genkit';
import { z } from 'zod';

// Schemas for quiz content generation
const QuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple-choice', 'true-false', 'match-pairs', 'fill-blank']),
  question: z.string(),
  options: z.array(z.string()).optional(), // For multiple choice
  correctAnswer: z.string(),
  explanation: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  learningObjectiveId: z.string().optional(),
});

const MatchPairSchema = z.object({
  id: z.string(),
  left: z.string(), // Term or concept
  right: z.string(), // Definition or description
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

const QuizContentSchema = z.object({
  multipleChoice: z.array(QuestionSchema),
  trueFalse: z.array(QuestionSchema),
  matchPairs: z.array(MatchPairSchema),
  fillBlanks: z.array(QuestionSchema),
});

const CurriculumQuizInputSchema = z.object({
  religion: z.string(),
  unitTitle: z.string(),
  lessonTitle: z.string(),
  learningObjectives: z.array(z.object({
    id: z.string(),
    description: z.string(),
    assessmentCriteria: z.array(z.string()),
  })),
  keyTerms: z.array(z.object({
    term: z.string(),
    definition: z.string(),
  })),
  topicsToGenerate: z.array(z.string()),
  culturalContext: z.array(z.string()),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  questionsPerType: z.number().default(5),
});

export const generateCurriculumQuizFlow = defineFlow(
  {
    name: 'generateCurriculumQuiz',
    inputSchema: CurriculumQuizInputSchema,
    outputSchema: QuizContentSchema,
  },
  async (input) => {
    const prompt = `
You are an expert educational content creator specializing in religious studies. Generate quiz content for a ${input.religion} lesson that is educationally valuable, culturally sensitive, and academically accurate.

**Lesson Context:**
- Religion: ${input.religion}
- Unit: ${input.unitTitle}
- Lesson: ${input.lessonTitle}
- Difficulty Level: ${input.difficulty}

**Learning Objectives:**
${input.learningObjectives.map(obj => `- ${obj.description}`).join('\n')}

**Key Terms:**
${input.keyTerms.map(term => `- ${term.term}: ${term.definition}`).join('\n')}

**Topics to Cover:**
${input.topicsToGenerate.map(topic => `- ${topic}`).join('\n')}

**Cultural Context:**
${input.culturalContext.map(context => `- ${context}`).join('\n')}

Generate ${input.questionsPerType} questions for each type:

**MULTIPLE CHOICE QUESTIONS:**
- Create questions that test understanding of key concepts
- Provide 4 options (A, B, C, D) with one correct answer
- Include plausible distractors that address common misconceptions
- Questions should align with learning objectives

**TRUE/FALSE QUESTIONS:**
- Focus on important facts and concepts
- Avoid trick questions or ambiguous statements
- Test fundamental understanding

**MATCH PAIRS:**
- Create term-definition pairs using key vocabulary
- Include concepts that students should memorize
- Ensure definitions are clear and unambiguous

**FILL-IN-THE-BLANK:**
- Test recall of important names, dates, concepts
- Provide sentences with one key missing word/phrase
- Focus on essential knowledge students should retain

**Important Guidelines:**
1. Maintain cultural sensitivity and respect for religious traditions
2. Ensure academic accuracy - no oversimplifications or stereotypes
3. Questions should be educational, not trivial
4. Include diverse perspectives within the tradition when appropriate
5. Avoid controversial or sectarian interpretations
6. Use inclusive language that respects all students

For each question, provide:
- A unique ID
- The question text
- Correct answer
- Clear explanation of why the answer is correct
- Appropriate difficulty level
- Link to learning objective ID when relevant

Format your response as valid JSON matching the required schema.
`;

    const result = await ai.generate({
      model: AZURE_MODEL_NAME,
      prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 4000,
      },
    });

    try {
      const quizContent = JSON.parse(result.text);
      return QuizContentSchema.parse(quizContent);
    } catch (error) {
      console.error('Error parsing quiz content:', error);
      
      // Fallback: create minimal valid response
      return {
        multipleChoice: [],
        trueFalse: [],
        matchPairs: [],
        fillBlanks: [],
      };
    }
  }
);

export const generateSingleExerciseFlow = defineFlow(
  {
    name: 'generateSingleExercise',
    inputSchema: z.object({
      religion: z.string(),
      exerciseType: z.enum(['multiple-choice', 'true-false', 'match-pairs', 'fill-blank']),
      topic: z.string(),
      keyTerms: z.array(z.object({
        term: z.string(),
        definition: z.string(),
      })),
      difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
      count: z.number().default(1),
    }),
    outputSchema: z.object({
      exercises: z.array(z.union([QuestionSchema, MatchPairSchema])),
    }),
  },
  async (input) => {
    const { religion, exerciseType, topic, keyTerms, difficulty, count } = input;

    let prompt = `
Generate ${count} ${exerciseType} exercise(s) for ${religion} on the topic: "${topic}"

**Available Key Terms:**
${keyTerms.map(term => `- ${term.term}: ${term.definition}`).join('\n')}

**Difficulty Level:** ${difficulty}

**Exercise Type Instructions:**
`;

    switch (exerciseType) {
      case 'multiple-choice':
        prompt += `
Create multiple choice questions with:
- Clear question about the topic
- 4 answer options (A, B, C, D)
- One correct answer
- Plausible distractors
- Educational explanation`;
        break;
      
      case 'true-false':
        prompt += `
Create true/false statements that:
- Test important facts about the topic
- Are clearly true or false (no ambiguity)
- Include educational explanation`;
        break;
      
      case 'match-pairs':
        prompt += `
Create matching pairs with:
- Terms/concepts on the left
- Definitions/descriptions on the right
- Clear, unambiguous matches`;
        break;
      
      case 'fill-blank':
        prompt += `
Create fill-in-the-blank questions with:
- Sentences with one key missing word/phrase
- Context that makes the answer clear
- Focus on important terminology`;
        break;
    }

    prompt += `

**Cultural Sensitivity:**
- Respect religious traditions and beliefs
- Use accurate, academic language
- Avoid stereotypes or oversimplifications
- Include diverse perspectives when appropriate

Respond with valid JSON matching the required schema.`;

    const result = await ai.generate({
      model: AZURE_MODEL_NAME,
      prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    try {
      const exercises = JSON.parse(result.text);
      return { exercises: exercises.exercises || [] };
    } catch (error) {
      console.error('Error parsing exercise content:', error);
      return { exercises: [] };
    }
  }
);
