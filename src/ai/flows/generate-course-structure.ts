import { generate } from '@genkit-ai/ai';
import { AZURE_MODEL_NAME } from '../genkit';
import { z } from 'zod';

// Define comprehensive course structure schema
const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
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
    type: z.literal('checkpoint')
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

export const generateCourseStructure = generate({
  name: 'generateCourseStructure',
  model: AZURE_MODEL_NAME,
  input: z.object({
    religion: z.string(),
    targetAudience: z.enum(['complete_beginner', 'some_knowledge', 'intermediate']),
    focusAreas: z.array(z.string()).optional(),
  }),
  output: CourseStructureSchema,
  prompt: async ({ religion, targetAudience, focusAreas }) => {
    const focus = focusAreas?.length ? `Special focus on: ${focusAreas.join(', ')}` : '';
    
    return `Create a comprehensive course structure for learning ${religion}, designed like Duolingo's language courses but for religious education.

Target Audience: ${targetAudience}
${focus}

Requirements:
1. Create 8-12 progressive units, each building on previous knowledge
2. Each unit should have 4-6 lessons plus 1 checkpoint lesson
3. Follow educational best practices with clear learning objectives
4. Include cultural context and modern relevance
5. Ensure content is respectful, accurate, and educational
6. Progress from basic concepts to more complex theological and philosophical ideas
7. Include practical applications and real-world connections

For each lesson, provide:
- Clear learning objectives (3-5 specific goals)
- Key terms and definitions that will be taught
- Estimated completion time
- Prerequisites if any

For units, assign appropriate Tailwind colors:
- Unit 1-2: Green theme (bg-green-400, text-green-600, border-green-500)
- Unit 3-4: Blue theme (bg-blue-400, text-blue-600, border-blue-500)  
- Unit 5-6: Purple theme (bg-purple-400, text-purple-600, border-purple-500)
- Unit 7-8: Orange theme (bg-orange-400, text-orange-600, border-orange-500)
- Unit 9-10: Pink theme (bg-pink-400, text-pink-600, border-pink-500)
- Unit 11-12: Indigo theme (bg-indigo-400, text-indigo-600, border-indigo-500)

Make this course structure comprehensive enough that someone could gain a solid foundational understanding of ${religion} through systematic study.

Focus on:
- Historical development and context
- Core beliefs and practices  
- Sacred texts and teachings
- Cultural traditions and customs
- Modern expressions and relevance
- Ethical teachings and values
- Community and worship practices
- Philosophical and theological concepts`;
  },
});
