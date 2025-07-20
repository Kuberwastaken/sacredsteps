import { ai } from '../genkit';
import { z } from 'zod';

// Define comprehensive course structure schema
const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.string().describe('beginner, intermediate, or advanced'),
  estimatedMinutes: z.number(),
  learningObjectives: z.array(z.string()),
  keyTerms: z.array(z.object({
    term: z.string(),
    definition: z.string()
  })),
  prerequisites: z.array(z.string()).optional(),
});

const UnitSchema = z.object({
  id: z.string(),
  unitNumber: z.number(),
  title: z.string(),
  description: z.string(),
  theme: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
  borderColor: z.string(),
  lessons: z.array(LessonSchema),
  checkpointLesson: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    type: z.string().describe('Should always be "checkpoint"')
  }),
  estimatedWeeks: z.number(),
});

const CourseStructureSchema = z.object({
  religion: z.string(),
  courseTitle: z.string(),
  description: z.string(),
  totalEstimatedWeeks: z.number(),
  difficultyProgression: z.array(z.string()),
  units: z.array(UnitSchema),
  culturalContext: z.string(),
  modernRelevance: z.string(),
});

const GenerateComprehensiveCourseInputSchema = z.object({
  religion: z.string(),
  targetAudience: z.string().describe('complete_beginner, some_knowledge, or intermediate'),
  focusAreas: z.array(z.string()).optional(),
});

export type GenerateComprehensiveCourseInput = z.infer<typeof GenerateComprehensiveCourseInputSchema>;
export type CourseStructure = z.infer<typeof CourseStructureSchema>;

const prompt = ai.definePrompt({
  name: 'generateComprehensiveCoursePrompt',
  input: { schema: GenerateComprehensiveCourseInputSchema },
  output: { schema: CourseStructureSchema },
  prompt: `Create a comprehensive course structure for learning {{religion}}, designed like Duolingo's language courses but for religious education.

Target Audience: {{targetAudience}}
{{#if focusAreas}}Special focus on: {{#each focusAreas}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

Requirements:
1. Create EXACTLY 8 progressive units, each building on previous knowledge
2. Each unit MUST have ALL these fields - NO EXCEPTIONS:
   - id: string (unit1, unit2, etc.)
   - unitNumber: number (1, 2, 3, 4, 5, 6, 7, 8) - CRITICAL FIELD
   - title: string (descriptive unit title)
   - description: string (what this unit covers)
   - theme: string (thematic focus)
   - backgroundColor: string (Tailwind class)
   - textColor: string (Tailwind class)
   - borderColor: string (Tailwind class)
   - lessons: array (4-6 lessons per unit)
   - checkpointLesson: object (review/assessment lesson)
   - estimatedWeeks: number (1 or 2 weeks)
3. Each unit should have 4-6 lessons plus 1 checkpoint lesson
4. Follow educational best practices with clear learning objectives
5. Include cultural context and modern relevance
6. Ensure content is respectful, accurate, and educational
7. Progress from basic concepts to more complex theological and philosophical ideas
8. Include practical applications and real-world connections

For each lesson, provide:
- Clear learning objectives (3-5 specific goals)
- Key terms and definitions that will be taught
- Estimated completion time
- Prerequisites if any

For units, assign appropriate Tailwind colors and ALWAYS include unitNumber:
- Unit 1 (unitNumber: 1): Green theme (bg-green-400, text-green-600, border-green-500)
- Unit 2 (unitNumber: 2): Green theme (bg-green-400, text-green-600, border-green-500)
- Unit 3 (unitNumber: 3): Blue theme (bg-blue-400, text-blue-600, border-blue-500)  
- Unit 4 (unitNumber: 4): Blue theme (bg-blue-400, text-blue-600, border-blue-500)
- Unit 5 (unitNumber: 5): Purple theme (bg-purple-400, text-purple-600, border-purple-500)
- Unit 6 (unitNumber: 6): Purple theme (bg-purple-400, text-purple-600, border-purple-500)
- Unit 7 (unitNumber: 7): Orange theme (bg-orange-400, text-orange-600, border-orange-500)
- Unit 8 (unitNumber: 8): Orange theme (bg-orange-400, text-orange-600, border-orange-500)
- Unit 9 (unitNumber: 9): Pink theme (bg-pink-400, text-pink-600, border-pink-500)
- Unit 10 (unitNumber: 10): Pink theme (bg-pink-400, text-pink-600, border-pink-500)
- Unit 11 (unitNumber: 11): Indigo theme (bg-indigo-400, text-indigo-600, border-indigo-500)
- Unit 12 (unitNumber: 12): Indigo theme (bg-indigo-400, text-indigo-600, border-indigo-500)

Make this course structure comprehensive enough that someone could gain a solid foundational understanding of {{religion}} through systematic study.

Focus on:
- Historical development and context
- Core beliefs and practices  
- Sacred texts and teachings
- Cultural traditions and customs
- Modern expressions and relevance
- Ethical teachings and values
- Community and worship practices
- Philosophical and theological concepts

Return ONLY valid JSON following the exact schema provided. ENSURE every unit has all required fields including unitNumber (1, 2, 3, 4, 5, 6, 7, 8). Generate EXACTLY 8 units, no more, no less.`,
});

const generateComprehensiveCourseFlow = ai.defineFlow(
  {
    name: 'generateComprehensiveCourseFlow',
    inputSchema: GenerateComprehensiveCourseInputSchema,
    outputSchema: CourseStructureSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function generateComprehensiveCourse(
  input: GenerateComprehensiveCourseInput
): Promise<CourseStructure> {
  return generateComprehensiveCourseFlow(input);
}
