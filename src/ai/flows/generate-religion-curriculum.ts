'use server';

/**
 * @fileOverview AI flow for generating dynamic religion curriculum structure
 * Replaces hardcoded religion units with AI-generated, personalized learning paths
 */

import { ai } from '../genkit';
import { z } from 'genkit';

const GenerateReligionCurriculumInputSchema = z.object({
  religion: z.string().describe('The religion to generate curriculum for'),
  userLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  focusAreas: z.array(z.string()).optional().describe('Specific areas of interest (e.g., ["history", "practices", "philosophy"])'),
  unitCount: z.number().min(2).max(6).default(3).describe('Number of units to generate')
});

export type GenerateReligionCurriculumInput = z.infer<typeof GenerateReligionCurriculumInputSchema>;

const GenerateReligionCurriculumOutputSchema = z.object({
  religion: z.object({
    name: z.string(),
    description: z.string(),
    keyThemes: z.array(z.string())
  }),
  units: z.array(z.object({
    unitNumber: z.number(),
    title: z.string(),
    description: z.string(),
    learningObjectives: z.array(z.string()),
    estimatedTime: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    lessons: z.array(z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(['introduction', 'deep-dive', 'practice', 'reflection', 'assessment']),
      keyTopics: z.array(z.string())
    }))
  }))
});

export type GenerateReligionCurriculumOutput = z.infer<typeof GenerateReligionCurriculumOutputSchema>;

export async function generateReligionCurriculum(
  input: GenerateReligionCurriculumInput
): Promise<GenerateReligionCurriculumOutput> {
  return generateReligionCurriculumFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReligionCurriculumPrompt',
  input: { schema: GenerateReligionCurriculumInputSchema },
  output: { schema: GenerateReligionCurriculumOutputSchema },
  prompt: `You are a master curriculum designer and religious studies scholar, tasked with creating an engaging, comprehensive learning journey for {{religion}}.

**Your Mission:**
Create a {{unitCount}}-unit curriculum that transforms learners from curious beginners into knowledgeable practitioners who deeply understand and appreciate {{religion}}.

**Student Profile:**
- Current Level: {{userLevel}}
- Learning Style: Interactive, progressive, respectful
- Goals: Understanding core beliefs, practices, history, and contemporary relevance
{{#if focusAreas}}
- Special Interests: {{focusAreas}}
{{/if}}

**Curriculum Design Principles:**
1. **Progressive Mastery**: Each unit builds upon previous knowledge
2. **Cultural Authenticity**: Present accurate, respectful representations
3. **Engaging Variety**: Mix theoretical learning with practical applications
4. **Contemporary Relevance**: Connect ancient wisdom to modern life
5. **Inclusive Perspective**: Honor diverse traditions within the religion

**Unit Structure Guidelines:**
- **Unit 1**: Foundation & Core Beliefs (always start here)
- **Unit 2+**: Choose from: History & Origins, Practices & Rituals, Sacred Texts, Philosophy & Ethics, Contemporary Issues, Cultural Expressions

**Lesson Types:**
- **Introduction**: Overview and context-setting
- **Deep-dive**: Detailed exploration of key concepts  
- **Practice**: Interactive exercises and applications
- **Reflection**: Personal connection and contemplation
- **Assessment**: Knowledge checking and synthesis

**Quality Standards:**
- Each unit should take 2-4 hours to complete
- Lessons should be 15-30 minutes each
- Include both intellectual and experiential learning
- Maintain scholarly accuracy while being accessible
- Foster genuine understanding, not just memorization

**Content Requirements:**
- Highlight the beauty and wisdom of the tradition
- Include historical context and development
- Explain core practices and their meanings
- Address common misconceptions respectfully
- Connect to universal human experiences

Create a curriculum that will leave learners feeling inspired, informed, and deeply respectful of {{religion}}'s rich spiritual heritage.

Return ONLY valid JSON following the exact schema provided.`,
});

const generateReligionCurriculumFlow = ai.defineFlow(
  {
    name: 'generateReligionCurriculumFlow',
    inputSchema: GenerateReligionCurriculumInputSchema,
    outputSchema: GenerateReligionCurriculumOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
