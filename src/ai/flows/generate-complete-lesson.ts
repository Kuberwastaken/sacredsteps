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
 * Generate a complete Duolingo-style lesson with teaching, practice, and assessment phases
 * This replaces simple exercise generation with a full pedagogical structure
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
      // Generate structured concepts using AI content
      const concepts = [];
      
      // Generate individual concept content for each part
      for (let i = 0; i < conceptCount; i++) {
        const conceptId = `concept_${i + 1}`;
        
        // Generate a meaningful title for this concept
        const conceptTitles = [
          `God's Love and Care`,
          `The Power of Prayer`,
          `Faith in Daily Life`,
          `Community and Service`,
          `Finding Peace and Hope`
        ];
        
        const conceptTitle = conceptTitles[i % conceptTitles.length] || `Understanding ${topic} - Part ${i + 1}`;
        
        // Generate engaging content for this concept
        const conceptPrompt = `You're teaching about "${topic}" in ${religion} to ${difficulty} level students. Create engaging content for lesson part ${i + 1} of ${conceptCount}.

**Requirements:**
- Generate content about a SPECIFIC aspect of "${topic}" (not just repeat the topic name)
- Maximum 2-3 sentences
- Simple, clear language for ${difficulty} level
- Focus on ONE specific element/principle/practice related to ${topic}
- No markdown formatting
- Make it conversational and educational

If "${topic}" is too broad, break it down into specific elements like:
- For "Basic Concepts": Focus on specific beliefs like "God's love", "salvation", "prayer", etc.
- For "Prayer": Focus on specific aspects like "talking to God", "finding peace", "asking for help", etc.
- For "Faith": Focus on specific aspects like "trusting God", "believing in hope", "finding strength", etc.

Part ${i + 1} of ${conceptCount} about ${topic} in ${religion}:`;

        // Generate specific key points for this concept
        const keyPointsPrompt = `Generate 4 SHORT, specific key points about "${topic}" in ${religion} for part ${i + 1} of ${conceptCount}.

**Requirements:**
- Each point should be 3-6 words maximum
- Make them about SPECIFIC aspects of ${topic} (not just repeat the topic name)
- Use simple language
- Focus on what learners actually need to know
- Make them interesting and memorable
- If ${topic} is broad, focus on specific elements like beliefs, practices, or principles

Example good key points:
- "God loves everyone equally"
- "Prayer brings inner peace"
- "Helping others shows faith"
- "Bible teaches life lessons"

Generate 4 specific key points about ${topic} in ${religion}, one per line:`;

        const [conceptResult, keyPointsResult] = await Promise.all([
          ai.generate({
            model: 'googleai/gemini-2.0-flash-exp',
            prompt: conceptPrompt,
            config: {
              temperature: 0.8,
              maxOutputTokens: 150,
            },
          }),
          ai.generate({
            model: 'googleai/gemini-2.0-flash-exp',
            prompt: keyPointsPrompt,
            config: {
              temperature: 0.8,
              maxOutputTokens: 100,
            },
          })
        ]);

        const conceptContent = conceptResult.text || `Learn about the important role that faith and belief play in ${religion} and how they guide people in their daily lives.`;
        
        // Parse key points from AI response
        const keyPointsText = keyPointsResult.text || '';
        const keyPoints = keyPointsText.split('\n')
          .filter(line => line.trim())
          .slice(0, 4)
          .map(point => point.replace(/^\d+\.?\s*/, '').trim());
        
        // Fallback key points if AI doesn't generate good ones
        const fallbackKeyPoints = [
          `God loves everyone`,
          `Prayer connects us`,
          `Helping others matters`,
          `Faith brings peace`
        ];
        
        const finalKeyPoints = keyPoints.length >= 4 ? keyPoints : fallbackKeyPoints;
        
        // Generate a fun visual description
        const visualDescriptions = [
          `Think of God's love as your spiritual GPS!`,
          `Imagine prayer as a bright lighthouse guiding ships!`,
          `Picture faith as a warm campfire bringing people together!`,
          `Visualize hope as a strong bridge connecting hearts!`,
          `Think of peace as a gentle river flowing through life!`
        ];
        
        const randomVisual = visualDescriptions[i % visualDescriptions.length];
        
        concepts.push({
          id: conceptId,
          title: conceptTitle,
          description: conceptContent,
          keyPoints: finalKeyPoints,
          example: `In daily life: People practice this when making important decisions, helping others, and finding peace during tough times.`,
          visualDescription: randomVisual,
          relatedTerms: [
            { term: 'Faith', definition: 'Trust in religious beliefs' },
            { term: 'Practice', definition: 'Living out religious principles' }
          ]
        });
      }

      // Generate practice exercises
      const exercises: Array<{
        type: 'SELECT_1_OF_3' | 'WRITE_IN_ENGLISH' | 'MATCH_PAIRS' | 'TRUE_FALSE';
        question: string;
        options?: string[];
        answerTiles?: string[];
        correctAnswer: number | number[];
        explanation: string;
      }> = [];
      
      for (let i = 0; i < exerciseCount; i++) {
        const exerciseTypes: ('SELECT_1_OF_3' | 'TRUE_FALSE')[] = ['SELECT_1_OF_3', 'TRUE_FALSE'];
        const selectedType = exerciseTypes[i % exerciseTypes.length];
        
        const exerciseQuestion = `What is an important aspect of ${topic} in ${religion}?`;
        const exerciseOptions = selectedType === 'SELECT_1_OF_3' ? 
          ['Spiritual growth and understanding', 'Material wealth', 'Social status'] :
          ['True', 'False'];
        const exerciseExplanation = `${topic} in ${religion} focuses on spiritual growth and understanding, helping believers deepen their connection with their faith.`;
        
        exercises.push({
          type: selectedType as 'SELECT_1_OF_3' | 'WRITE_IN_ENGLISH' | 'MATCH_PAIRS' | 'TRUE_FALSE',
          question: exerciseQuestion,
          options: exerciseOptions,
          correctAnswer: 0,
          explanation: exerciseExplanation
        });
      }

      // Generate quiz questions
      const quizQuestions = [];
      for (let i = 0; i < quizCount; i++) {
        const quizQuestion = `How does ${topic} influence believers in ${religion}?`;
        const quizAnswers = [
          'It provides spiritual guidance and moral direction',
          'It guarantees worldly success',
          'It replaces the need for personal effort',
          'It is purely ceremonial'
        ];
        const quizExplanation = `${topic} is significant in ${religion} because it provides spiritual guidance and moral direction, helping believers navigate life's challenges while staying true to their faith.`;
        
        quizQuestions.push({
          question: quizQuestion,
          answers: quizAnswers,
          correctAnswerIndex: 0,
          explanation: quizExplanation
        });
      }

      // Create lesson structure
      const lessonId = `lesson_${Date.now()}`;
      const lessonTitle = `${topic} in ${religion}`;
      const lessonIntroduction = `Welcome to your lesson on ${topic} in ${religion}. This lesson will help you understand the fundamental concepts and their practical applications in daily life. You'll discover how ${topic} guides believers and shapes their spiritual journey through authentic teachings and real-world examples.`;
      
      const learningObjectives = [
        `Understand the core principles of ${topic} in ${religion}`,
        `Apply ${topic} concepts to real-world situations`,
        `Recognize ${topic} in religious practices and teachings`
      ];

      // Return structured lesson with AI-generated content
      return {
        lesson: {
          id: lessonId,
          title: lessonTitle,
          topic,
          difficulty,
          estimatedTime: duration,
          teachingPhase: {
            introduction: lessonIntroduction,
            learningObjectives,
            concepts
          },
          practiceExercises: exercises,
          assessmentQuiz: quizQuestions
        }
      };
    } catch (error) {
      console.error('Error generating AI content:', error);
      
      // Enhanced fallback with better content
      const concepts = [];
      for (let i = 0; i < conceptCount; i++) {
        concepts.push({
          id: `concept_${i + 1}`,
          title: `Understanding ${topic} - Concept ${i + 1}`,
          description: `${topic} is a fundamental concept in ${religion} that provides spiritual guidance and moral direction for believers.`,
          keyPoints: [
            `${topic} represents core spiritual values in ${religion}`,
            `It provides guidance for moral and ethical decisions`,
            `Understanding ${topic} deepens one's spiritual connection`,
            `It influences daily religious practices and community life`
          ],
          example: `In daily life, ${topic} might be practiced through prayer, meditation, acts of service to others, or following religious guidelines.`,
          visualDescription: `Imagine ${topic} as a guiding light that illuminates the path of spiritual growth and understanding.`,
          relatedTerms: [
            { term: 'Spirituality', definition: 'The quality of being concerned with the human spirit or soul' },
            { term: 'Faith', definition: 'Complete trust or confidence in religious beliefs' }
          ]
        });
      }

      const exercises: Array<{
        type: 'SELECT_1_OF_3' | 'WRITE_IN_ENGLISH' | 'MATCH_PAIRS' | 'TRUE_FALSE';
        question: string;
        options?: string[];
        answerTiles?: string[];
        correctAnswer: number | number[];
        explanation: string;
      }> = [];
      
      for (let i = 0; i < exerciseCount; i++) {
        const exerciseTypes: ('SELECT_1_OF_3' | 'TRUE_FALSE')[] = ['SELECT_1_OF_3', 'TRUE_FALSE'];
        const selectedType = exerciseTypes[i % exerciseTypes.length];
        
        exercises.push({
          type: selectedType as 'SELECT_1_OF_3' | 'WRITE_IN_ENGLISH' | 'MATCH_PAIRS' | 'TRUE_FALSE',
          question: `What is the primary focus of ${topic} in ${religion}?`,
          options: selectedType === 'SELECT_1_OF_3' ? 
            ['Spiritual growth and understanding', 'Material wealth', 'Social status'] :
            ['True', 'False'],
          correctAnswer: 0,
          explanation: `${topic} in ${religion} primarily focuses on spiritual growth and understanding, helping believers deepen their connection with their faith.`
        });
      }

      const quizQuestions = [];
      for (let i = 0; i < quizCount; i++) {
        quizQuestions.push({
          question: `How does ${topic} influence believers in ${religion}?`,
          answers: [
            'It provides spiritual guidance and moral direction',
            'It guarantees worldly success',
            'It replaces the need for personal effort',
            'It is purely ceremonial'
          ],
          correctAnswerIndex: 0,
          explanation: `${topic} is significant in ${religion} because it provides spiritual guidance and moral direction, helping believers navigate life's challenges while staying true to their faith.`
        });
      }

      return {
        lesson: {
          id: `lesson_${Date.now()}`,
          title: `${topic} in ${religion}`,
          topic,
          difficulty,
          estimatedTime: duration,
          teachingPhase: {
            introduction: `Welcome to your lesson on ${topic} in ${religion}. This lesson will help you understand the fundamental concepts and their practical applications in daily life.`,
            learningObjectives: [
              `Understand the core principles of ${topic} in ${religion}`,
              `Apply ${topic} concepts to real-world situations`,
              `Recognize ${topic} in religious practices and teachings`
            ],
            concepts
          },
          practiceExercises: exercises,
          assessmentQuiz: quizQuestions
        }
      };
    }
  }
);

export const generateCompleteLesson = generateCompleteLessonFlow;
