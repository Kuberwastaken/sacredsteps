import { ai } from '../genkit';
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

export const generateCurriculumQuizFlow = ai.defineFlow(
  {
    name: 'generateCurriculumQuiz',
    inputSchema: CurriculumQuizInputSchema,
    outputSchema: QuizContentSchema,
  },
  async (input: z.infer<typeof CurriculumQuizInputSchema>) => {
    const prompt = `
You are an expert educational content creator specializing in religious studies. Generate quiz content for a ${input.religion} lesson that is educationally valuable, culturally sensitive, and academically accurate.

Your response must be a JSON object with exactly these arrays:
{
  "multipleChoice": [{
    "id": "string",
    "type": "multiple-choice",
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string",
    "explanation": "string",
    "difficulty": "easy" | "medium" | "hard"
  }],
  "trueFalse": [{
    "id": "string",
    "type": "true-false",
    "question": "string",
    "correctAnswer": "string",
    "explanation": "string",
    "difficulty": "easy" | "medium" | "hard"
  }],
  "matchPairs": [{
    "id": "string",
    "left": "string",
    "right": "string",
    "difficulty": "easy" | "medium" | "hard"
  }],
  "fillBlanks": [{
    "id": "string",
    "type": "fill-blank",
    "question": "string",
    "correctAnswer": "string",
    "explanation": "string",
    "difficulty": "easy" | "medium" | "hard"
  }]
}

Context for generating content:
**Lesson Context:**
- Religion: ${input.religion}
- Unit: ${input.unitTitle}
- Lesson: ${input.lessonTitle}
- Difficulty Level: ${input.difficulty}

**Learning Objectives:**
${input.learningObjectives.map((obj: { description: string }) => `- ${obj.description}`).join('\n')}

**Key Terms:**
${input.keyTerms.map((term: { term: string; definition: string }) => `- ${term.term}: ${term.definition}`).join('\n')}

**Topics to Cover:**
${input.topicsToGenerate.map((topic: string) => `- ${topic}`).join('\n')}

**Cultural Context:**
${input.culturalContext.map((context: string) => `- ${context}`).join('\n')}

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

IMPORTANT: Respond with ONLY the raw JSON object, no markdown formatting, no code blocks, no backticks.
The response must be valid JSON that matches the required schema.
`;

    const result = await ai.generate({
      prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 4000,
      },
    });

    try {
      // Clean up the response - remove any markdown formatting
      let cleanText = result.text
        .replace(/```json\s*/, '') // Remove opening json code block
        .replace(/```\s*$/, '')    // Remove closing code block
        .trim();                   // Remove extra whitespace

      // Ensure all required arrays exist with defaults
      const defaultContent = {
        multipleChoice: [],
        trueFalse: [],
        matchPairs: [],
        fillBlanks: []
      };

      // If it still starts with a backtick, try to extract JSON from within backticks
      if (cleanText.startsWith('`')) {
        const match = cleanText.match(/`([\s\S]*)`/);
        if (match && match[1]) {
          cleanText = match[1].trim();
        }
      }

      let quizContent;
      try {
        // Merge parsed content with default content to ensure all arrays exist
        quizContent = { ...defaultContent, ...JSON.parse(cleanText) };
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Failed to parse AI response as JSON. Please try again.');
      }

      try {
        return QuizContentSchema.parse(quizContent);
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          console.error('Validation Error:', validationError.errors);
          const issues = validationError.errors
            .map(e => `${e.path.join('.')}: ${e.message}`)
            .join(', ');
          throw new Error(`Invalid quiz content structure. Issues with: ${issues}`);
        }
        throw validationError;
      }
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

const SingleExerciseInputSchema = z.object({
  religion: z.string(),
  exerciseType: z.enum(['multiple-choice', 'true-false', 'match-pairs', 'fill-blank']),
  topic: z.string(),
  keyTerms: z.array(z.object({
    term: z.string(),
    definition: z.string(),
  })),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
  count: z.number().default(1),
});

export const generateSingleExerciseFlow = ai.defineFlow(
  {
    name: 'generateSingleExercise',
    inputSchema: SingleExerciseInputSchema,
    outputSchema: z.object({
      exercises: z.array(z.union([QuestionSchema, MatchPairSchema])),
    }),
  },
  async (input: z.infer<typeof SingleExerciseInputSchema>) => {
    const { religion, exerciseType, topic, keyTerms, difficulty, count } = input;

    let prompt = `
Generate ${count} ${exerciseType} exercise(s) for ${religion} on the topic: "${topic}"

**Available Key Terms:**
${keyTerms.map((term: { term: string; definition: string }) => `- ${term.term}: ${term.definition}`).join('\n')}

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
      prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    try {
      // Clean up the response text
      let cleanText = result.text
        .replace(/```json\s*/, '') // Remove opening json code block
        .replace(/```\s*$/, '')    // Remove closing code block
        .trim();                   // Remove extra whitespace

      // If it still starts with a backtick, try to extract JSON from within backticks
      if (cleanText.startsWith('`')) {
        const match = cleanText.match(/`([\s\S]*)`/);
        if (match && match[1]) {
          cleanText = match[1].trim();
        }
      }

      const exercises = JSON.parse(cleanText);
      return { exercises: exercises.exercises || [] };
    } catch (error) {
      console.error('Error parsing exercise content:', error);
      return { exercises: [] };
    }
  }
);
