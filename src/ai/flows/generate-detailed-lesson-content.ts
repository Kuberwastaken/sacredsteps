import { ai } from '../genkit';
import { z } from 'zod';

// Define lesson content schema
const ConceptCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  keyPoints: z.array(z.string()),
  example: z.string().optional(),
  visualDescription: z.string().optional(),
  relatedTerms: z.array(z.object({
    term: z.string(),
    definition: z.string()
  })),
});

const ExerciseSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple_choice', 'true_false', 'match_pairs', 'fill_blank', 'drag_order']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  prompt: z.string(),
  data: z.object({
    question: z.string().optional(),
    options: z.array(z.string()).optional(),
    pairs: z.array(z.object({
      term: z.string(),
      definition: z.string()
    })).optional(),
    statement: z.string().optional(),
    correctAnswer: z.union([z.string(), z.number(), z.boolean()]),
    explanation: z.string(),
  }),
  learningObjective: z.string(),
});

const LessonContentSchema = z.object({
  lessonId: z.string(),
  title: z.string(),
  introduction: z.string(),
  teachingPhase: z.object({
    concepts: z.array(ConceptCardSchema),
    introduction: z.string(),
    learningObjectives: z.array(z.string()),
  }),
  practiceExercises: z.array(ExerciseSchema),
  assessmentQuiz: z.array(ExerciseSchema),
  culturalInsights: z.array(z.string()),
  modernConnections: z.array(z.string()),
  furtherReading: z.array(z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['book', 'article', 'video', 'website'])
  })),
});

const GenerateLessonContentInputSchema = z.object({
  religion: z.string(),
  unitTitle: z.string(),
  lessonTitle: z.string(),
  learningObjectives: z.array(z.string()),
  keyTerms: z.array(z.object({
    term: z.string(),
    definition: z.string()
  })),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  priorKnowledge: z.array(z.string()).optional(),
});

export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;
export type LessonContent = z.infer<typeof LessonContentSchema>;

const prompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: { schema: GenerateLessonContentInputSchema },
  output: { schema: LessonContentSchema },
  prompt: `Generate comprehensive lesson content for a {{difficulty}} level lesson about {{religion}}.

Unit: {{unitTitle}}
Lesson: {{lessonTitle}}
Difficulty: {{difficulty}}
{{#if priorKnowledge}}Building on: {{#each priorKnowledge}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}No prerequisites assumed{{/if}}

Learning Objectives:
{{#each learningObjectives}}
- {{this}}
{{/each}}

Key Terms to Cover:
{{#each keyTerms}}
- {{this.term}}: {{this.definition}}
{{/each}}

Create a complete lesson with:

1. TEACHING PHASE (3-5 concept cards):
   - Each concept should have 3-5 key points
   - Include relatable examples and analogies
   - Visual descriptions for potential illustrations
   - Related terms and definitions

2. PRACTICE EXERCISES (6-8 exercises):
   - Mix of question types: multiple choice, true/false, match pairs, fill blank
   - Gradual difficulty progression
   - Clear explanations for each answer
   - Focus on key concepts and terms

3. ASSESSMENT QUIZ (4-6 questions):
   - Test understanding of main learning objectives
   - Slightly more challenging than practice
   - Comprehensive explanations

4. CULTURAL INSIGHTS:
   - 3-4 interesting cultural facts or practices
   - Historical context
   - Regional variations if applicable

5. MODERN CONNECTIONS:
   - How these concepts apply today
   - Contemporary examples
   - Relevance to modern practitioners

6. FURTHER READING:
   - 2-3 recommended resources
   - Mix of academic and accessible sources

Guidelines:
- Keep content respectful and academically accurate
- Use clear, accessible language appropriate for {{difficulty}} level
- Include diverse perspectives within the tradition
- Emphasize understanding over memorization
- Connect abstract concepts to concrete examples
- Ensure cultural sensitivity and avoid stereotypes

Make this lesson engaging, educational, and comprehensive enough to achieve the stated learning objectives.

Return ONLY valid JSON following the exact schema provided.`,
});

const generateLessonContentFlow = ai.defineFlow(
  {
    name: 'generateLessonContentFlow',
    inputSchema: GenerateLessonContentInputSchema,
    outputSchema: LessonContentSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function generateDetailedLessonContent(
  input: GenerateLessonContentInput
): Promise<LessonContent> {
  return generateLessonContentFlow(input);
}
