import { z } from 'zod';
import { ai } from '../genkit';

// Input schema for complete lesson generation
const GenerateCompleteLessonInputSchema = z.object({
  religion: z.string().describe('The religion being studied'),
  topic: z.string().describe('The specific topic or concept to teach'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level'),
  duration: z.number().default(15).describe('Target lesson duration in minutes'),
  conceptCount: z.number().default(3).describe('Number of concepts to introduce'),
  exerciseCount: z.number().default(4).describe('Number of practice exercises'),
  quizCount: z.number().default(5).describe('Number of assessment questions')
});

// Output schema for complete lesson structure
const GenerateCompleteLessonOutputSchema = z.object({
  lesson: z.object({
    id: z.string(),
    title: z.string(),
    topic: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedTime: z.number(),
    teachingPhase: z.object({
      introduction: z.string().describe('Brief introduction to the lesson'),
      learningObjectives: z.array(z.string()).describe('What students will learn'),
      concepts: z.array(z.object({
        id: z.string(),
        title: z.string().describe('Concept title'),
        description: z.string().describe('Clear explanation of the concept'),
        keyPoints: z.array(z.string()).describe('Key takeaways'),
        example: z.string().optional().describe('Real-world example'),
        visualDescription: z.string().optional().describe('Description for visual representation'),
        relatedTerms: z.array(z.object({
          term: z.string(),
          definition: z.string()
        })).optional().describe('Related vocabulary terms')
      }))
    }),
    practiceExercises: z.array(z.object({
      type: z.enum(['SELECT_1_OF_3', 'WRITE_IN_ENGLISH', 'MATCH_PAIRS', 'TRUE_FALSE']),
      question: z.string(),
      options: z.array(z.string()).optional(),
      answerTiles: z.array(z.string()).optional(),
      correctAnswer: z.union([z.number(), z.array(z.number())]),
      explanation: z.string()
    })),
    assessmentQuiz: z.array(z.object({
      question: z.string(),
      answers: z.array(z.string()),
      correctAnswerIndex: z.number(),
      explanation: z.string()
    }))
  })
});

export type GenerateCompleteLessonInput = z.infer<typeof GenerateCompleteLessonInputSchema>;
export type GenerateCompleteLessonOutput = z.infer<typeof GenerateCompleteLessonOutputSchema>;

/**
 * Generate a complete lesson with MINIMAL AI calls to avoid rate limits
 */
const generateCompleteLessonFlow = ai.defineFlow(
  {
    name: 'generateCompleteLesson',
    inputSchema: GenerateCompleteLessonInputSchema,
    outputSchema: GenerateCompleteLessonOutputSchema,
  },
  async (input) => {
    const { religion, topic, difficulty, duration, conceptCount, exerciseCount, quizCount } = input;
    
    try {
      console.log(`Generating lesson with MINIMAL AI usage to avoid rate limits`);
      
      // Helper function to delay between API calls
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      // VERY conservative settings
      const DELAY_BETWEEN_REQUESTS = 5000; // 5 second delay
      const MAX_API_CALLS = 1; // Only ONE AI call for the entire lesson
      
      let aiGeneratedContent = '';
      
      // Single AI call to generate core lesson content
      if (MAX_API_CALLS > 0) {
        try {
          const lessonPrompt = `Create a simple lesson about ${topic} in ${religion} for ${difficulty} students.

Please provide:
1. A brief introduction (1-2 sentences)
2. 3 key learning points about ${topic}
3. One simple example of how this applies to daily life

Keep it very short and simple. No special formatting, em dashes, or unusual punctuation.`;

          const result = await ai.generate({
            model: 'googleai/gemini-2.0-flash-exp',
            prompt: lessonPrompt,
            config: {
              temperature: 0.7,
              maxOutputTokens: 150 // Very small token limit
            }
          });
          
          aiGeneratedContent = result.text || '';
          console.log('Generated AI content successfully');
          await delay(DELAY_BETWEEN_REQUESTS);
        } catch (error) {
          console.error('AI generation failed:', error);
          aiGeneratedContent = '';
        }
      }

      // Generate concepts with mostly static content
      const concepts = [];
      for (let i = 0; i < conceptCount; i++) {
        const conceptId = `concept_${i + 1}`;
        
        concepts.push({
          id: conceptId,
          title: `${topic} - Part ${i + 1}`,
          description: aiGeneratedContent || `Learn about ${topic} in ${religion}. This teaches important values that guide believers in making good decisions and treating others with kindness and respect.`,
          keyPoints: [
            `Understand ${topic}`,
            'Apply in daily life',
            'Help others',
            'Find peace'
          ],
          example: `In daily life: People practice ${topic} when making important decisions and helping others.`,
          visualDescription: `Think of ${topic} as a guiding light in your spiritual journey!`,
          relatedTerms: [
            { term: 'Faith', definition: 'Trust in religious beliefs' },
            { term: 'Practice', definition: 'Living out religious principles' }
          ]
        });
      }

      // Generate simple practice exercises without AI
      const exercises: Array<{
        type: 'SELECT_1_OF_3' | 'WRITE_IN_ENGLISH' | 'MATCH_PAIRS' | 'TRUE_FALSE';
        question: string;
        options?: string[];
        answerTiles?: string[];
        correctAnswer: number | number[];
        explanation: string;
      }> = [];
      
      const exerciseTemplates = [
        {
          type: 'SELECT_1_OF_3' as const,
          question: `What is the main teaching about ${topic} in ${religion}?`,
          options: [
            `${topic} helps guide daily decisions`,
            `${topic} is only for special occasions`,
            `${topic} doesn't affect daily life`
          ],
          correctAnswer: 0,
          explanation: `${topic} in ${religion} provides guidance for everyday life and decision-making.`
        },
        {
          type: 'TRUE_FALSE' as const,
          question: `${topic} in ${religion} teaches people to help others.`,
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: `Most religious teachings about ${topic} emphasize helping and caring for others.`
        }
      ];

      for (let i = 0; i < Math.min(exerciseCount, exerciseTemplates.length); i++) {
        const template = exerciseTemplates[i];
        if (template) {
          exercises.push(template);
        }
      }

      // Generate simple quiz questions without AI
      const assessmentQuiz: Array<{
        question: string;
        answers: string[];
        correctAnswerIndex: number;
        explanation: string;
      }> = [];
      
      const quizTemplates = [
        {
          question: `How does ${topic} guide believers in ${religion}?`,
          answers: [
            'It helps them make good decisions',
            'It tells them what to wear',
            'It controls their thoughts',
            'It replaces their free will'
          ],
          correctAnswerIndex: 0,
          explanation: `${topic} in ${religion} provides guidance for making moral and ethical decisions.`
        },
        {
          question: `What is important about practicing ${topic}?`,
          answers: [
            'It should be done alone',
            'It helps build community',
            'It requires special equipment',
            'It only happens on holidays'
          ],
          correctAnswerIndex: 1,
          explanation: `Practicing ${topic} often involves community and helping others.`
        }
      ];

      for (let i = 0; i < Math.min(quizCount, quizTemplates.length); i++) {
        const template = quizTemplates[i];
        if (template) {
          assessmentQuiz.push(template);
        }
      }

      // Create the complete lesson structure
      const lesson = {
        id: `lesson_${Date.now()}`,
        title: `Learning About ${topic} in ${religion}`,
        topic,
        difficulty,
        estimatedTime: duration,
        teachingPhase: {
          introduction: aiGeneratedContent || `Welcome to this lesson about ${topic} in ${religion}. We'll explore how this important concept guides believers in their daily lives.`,
          learningObjectives: [
            `Understand the meaning of ${topic} in ${religion}`,
            `Learn how ${topic} applies to daily life`,
            `Discover ways to practice ${topic}`
          ],
          concepts
        },
        practiceExercises: exercises,
        assessmentQuiz
      };

      console.log('Lesson generated successfully with minimal AI usage');
      return { lesson };

    } catch (error) {
      console.error('Error generating lesson:', error);
      
      // Return a basic fallback lesson
      const fallbackLesson = {
        id: `lesson_fallback_${Date.now()}`,
        title: `Introduction to ${topic}`,
        topic,
        difficulty,
        estimatedTime: duration,
        teachingPhase: {
          introduction: `Learn about ${topic} in ${religion}.`,
          learningObjectives: [`Understand ${topic}`],
          concepts: [{
            id: 'concept_1',
            title: `${topic} Basics`,
            description: `${topic} is an important concept in ${religion}.`,
            keyPoints: ['Learn', 'Practice', 'Grow', 'Share']
          }]
        },
        practiceExercises: [],
        assessmentQuiz: []
      };

      return { lesson: fallbackLesson };
    }
  }
);

export default generateCompleteLessonFlow;
