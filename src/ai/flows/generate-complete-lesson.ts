import { z } from 'zod';
import { ai, AZURE_MODEL_NAME } from '../genkit';

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
      
      // Helper function to delay between API calls
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      // Break down content generation into smaller chunks with rate limiting
      const MAX_TOKENS_PER_REQUEST = 500;
      const DELAY_BETWEEN_REQUESTS = 1000; // 1 second delay

      // Generate each concept with AI
      for (let i = 0; i < conceptCount; i++) {
        const conceptId = `concept_${i + 1}`;

        // First, generate an engaging title for this concept
        const titlePrompt = `Create a short, engaging title for part ${i + 1} of a lesson about ${topic} in ${religion}.
Focus on an interesting story, principle, or teaching.

Requirements:
- 3-6 words only
- Make it intriguing and clear
- Focus on ONE specific aspect
- No generic titles like "Introduction to ${topic}"
- No markdown or punctuation

Example good titles:
- "The Power of Daily Prayer"
- "Finding Peace Through Meditation"
- "Love Your Neighbor's Story"

Generate title:`;

        let conceptTitle = '';
        try {
          const titleResult = await ai.generate({
            model: 'openai/',
            prompt: titlePrompt,
            config: {
              temperature: 0.7,
              maxOutputTokens: 50
            }
          });
          conceptTitle = titleResult.text?.trim() || `${topic} - Part ${i + 1}`;
          await delay(DELAY_BETWEEN_REQUESTS);
        } catch (error) {
          console.error(`Error generating title for ${conceptId}:`, error);
          conceptTitle = `${topic} - Part ${i + 1}`;
        }

        // Generate unique content for this concept
        const conceptPrompt = `Create engaging religious content for ${difficulty} level students learning about ${topic} in ${religion}.

This is for part ${i + 1} titled: "${conceptTitle}"

Requirements:
- Write 2-3 short paragraphs
- Include a specific story, teaching, or principle from ${religion}
- Use clear, simple language for ${difficulty} level
- Make it interesting and memorable
- No markdown formatting
- Maximum 150 words

**Requirements:**
- Focus on ONE specific thing (a story, teaching, example, or principle)
- Use simple, clear language for ${difficulty} level
- Make it interesting and memorable
- No markdown formatting
- Keep it under 100 words total

Examples of good concepts:
- "The story of the Good Samaritan teaches about helping strangers"
- "Jesus turning water into wine shows God's care for celebration"
- "The parable of the lost sheep shows how much God values each person"

Create engaging content for part ${i + 1} about ${topic} in ${religion}:`;

        // Generate specific key points that relate to what was just taught
        const keyPointsPrompt = `Based on the concept you just taught about ${topic} in ${religion}, create 4 key takeaways that students should remember.

**Requirements:**
- Each point should be 3-6 words maximum
- Make them specific to the story/concept just taught
- Use simple language
- Focus on the main lessons learned
- Make them actionable or memorable

Create 4 key takeaways from the lesson, one per line:`;

        const [conceptResult, keyPointsResult] = await Promise.all([
          ai.generate({
            model: 'openai/',
            prompt: conceptPrompt,
            config: {
              temperature: 0.8,
              maxOutputTokens: 200,
            },
          }),
          ai.generate({
            model: 'openai/',
            prompt: keyPointsPrompt,
            config: {
              temperature: 0.8,
              maxOutputTokens: 100,
            },
          })
        ]);

        // Generate the main content
        let content = '';
        try {
          const conceptResult = await ai.generate({
            model: 'openai/',
            prompt: conceptPrompt,
            config: {
              temperature: 0.8,
              maxOutputTokens: MAX_TOKENS_PER_REQUEST
            }
          });
          content = conceptResult.text || `Learn about ${topic} in ${religion} and how it affects daily life.`;
          await delay(DELAY_BETWEEN_REQUESTS);
        } catch (error) {
          console.error(`Error generating content for ${conceptId}:`, error);
          content = `Learn about ${topic} in ${religion} and how it affects daily life.`;
        }

        // Generate fresh key points for this specific content
        let conceptKeyPoints: string[] = [];
        try {
          const keyPointsPrompt = `Based on this lesson content about ${topic} in ${religion}:

${content}

Generate 4 key takeaways that students should remember.
Each point should be 3-6 words.
Make them specific to the lesson.
Use simple language.
One point per line:`;

          const keyPointsResult = await ai.generate({
            model: 'openai/',
            prompt: keyPointsPrompt,
            config: {
              temperature: 0.7,
              maxOutputTokens: MAX_TOKENS_PER_REQUEST
            }
          });

          if (keyPointsResult.text) {
            conceptKeyPoints = keyPointsResult.text
              .split('\n')
              .filter(line => line.trim())
              .slice(0, 4)
              .map(point => point.replace(/^\d+\.?\s*/, '').trim());
          }
          
          await delay(DELAY_BETWEEN_REQUESTS);
        } catch (error) {
          console.error(`Error generating key points for ${conceptId}:`, error);
          // Keep using story's key points on error
        }
        
        // Generate a visual metaphor for the concept
        let visualDescription = '';
        try {
          const visualPrompt = `Create a visual metaphor to help understand this religious concept:

${content}

Requirements:
- Start with "Think of..." or "Imagine..."
- Use a simple, everyday image
- Make it memorable and clear
- One sentence only
- End with an exclamation mark
- No markdown formatting

Examples:
- "Think of prayer like a phone call to your closest friend!"
- "Imagine faith as a bright lantern in the dark!"`;

          const visualResult = await ai.generate({
            model: 'openai/',
            prompt: visualPrompt,
            config: {
              temperature: 0.8,
              maxOutputTokens: 100
            }
          });
          visualDescription = visualResult.text?.trim() || `Think of ${topic} as a guiding light in your life!`;
          await delay(DELAY_BETWEEN_REQUESTS);
        } catch (error) {
          console.error(`Error generating visual for ${conceptId}:`, error);
          visualDescription = `Think of ${topic} as a guiding light in your life!`;
        }
        
        // Generate a real-world example
        let example = '';
        try {
          const examplePrompt = `Create a practical, real-world example of how this lesson applies to daily life:

${content}

Requirements:
- Start with "In daily life:"
- Make it specific and relatable
- Use simple language
- One sentence only
- No markdown formatting`;

          const exampleResult = await ai.generate({
            model: 'openai/',
            prompt: examplePrompt,
            config: {
              temperature: 0.7,
              maxOutputTokens: 100
            }
          });
          example = exampleResult.text?.trim() || `In daily life: We can apply these teachings when facing challenges or helping others.`;
          await delay(DELAY_BETWEEN_REQUESTS);
        } catch (error) {
          console.error(`Error generating example for ${conceptId}:`, error);
          example = `In daily life: We can apply these teachings when facing challenges or helping others.`;
        }
        
        concepts.push({
          id: conceptId,
          title: conceptTitle,
          description: content,
          keyPoints: conceptKeyPoints,
          example: example,
          visualDescription: visualDescription,
          relatedTerms: [
            { term: 'Faith', definition: 'Trust in religious beliefs' },
            { term: 'Practice', definition: 'Living out religious principles' }
          ]
        });
      }

      // Generate practice exercises based on what was actually taught
      const exercises: Array<{
        type: 'SELECT_1_OF_3' | 'WRITE_IN_ENGLISH' | 'MATCH_PAIRS' | 'TRUE_FALSE';
        question: string;
        options?: string[];
        answerTiles?: string[];
        correctAnswer: number | number[];
        explanation: string;
      }> = [];
      
      // Generate exercises that test understanding of the specific concepts taught
      for (let i = 0; i < exerciseCount; i++) {
        const conceptIndex = i % concepts.length;
        const relatedConcept = concepts[conceptIndex];
        
        if (!relatedConcept) continue;
        
        const exercisePrompt = `Create a specific quiz question about this exact story: "${relatedConcept.title}"

**Story content:** ${relatedConcept.description}

**Requirements:**
- Ask about SPECIFIC details from this story (characters, actions, lessons)
- Create 3 answer choices that test if they actually read the story
- Make wrong answers plausible but clearly wrong based on the story details
- Test comprehension of the specific narrative, not generic concepts

Examples of good story-specific questions:
- "In the Good Samaritan story, who helped the injured man?" (not "what is compassion?")
- "What did the boy share in the feeding story?" (not "what is generosity?")
- "How many people did Jesus feed?" (not "what is sharing?")

Format:
QUESTION: [specific question about story details]
A) [correct answer from the story]
B) [wrong answer that sounds plausible]
C) [wrong answer that sounds plausible]
EXPLANATION: [brief explanation referring back to the story]`;

        const exerciseResult = await ai.generate({
          model: 'openai/',
          prompt: exercisePrompt,
          config: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        });

        // Parse the AI response or use fallback
        const exerciseText = exerciseResult.text || '';
        let question = `In the "${relatedConcept.title}" story, what happened?`;
        let options = ['The story teaches an important lesson', 'People ignored the message', 'Nothing significant occurred'];
        let explanation = `This story shows us an important lesson about how to treat others.`;

        // Create story-specific fallback questions
        const storySpecificFallbacks = {
          "The Good Samaritan": {
            question: "In the Good Samaritan story, who helped the injured man?",
            options: ["A Samaritan from a different group", "A priest from the temple", "No one helped him"],
            explanation: "The Samaritan helped even though he was from a different group, showing we should help anyone in need."
          },
          "Jesus Feeding 5000": {
            question: "What did the boy share in the feeding story?",
            options: ["His lunch of bread and fish", "His money for food", "His water bottle"],
            explanation: "The boy shared his small lunch, which Jesus used to feed thousands of people."
          },
          "The Lost Sheep": {
            question: "How many sheep did the shepherd have originally?",
            options: ["100 sheep", "50 sheep", "200 sheep"],
            explanation: "The shepherd had 100 sheep but left 99 to find the one that was lost."
          },
          "Jesus and the Children": {
            question: "What did Jesus say when people brought children to him?",
            options: ["Let the children come to me", "Children should wait their turn", "Only adults can approach me"],
            explanation: "Jesus welcomed the children, showing that everyone is important to God."
          },
          "The Golden Rule": {
            question: "What does the Golden Rule teach us to do?",
            options: ["Treat others how you want to be treated", "Always put yourself first", "Only be kind to friends"],
            explanation: "The Golden Rule teaches us to treat others with the same kindness we would want."
          }
        };

        const fallback = storySpecificFallbacks[relatedConcept.title as keyof typeof storySpecificFallbacks];
        if (fallback) {
          question = fallback.question;
          options = fallback.options;
          explanation = fallback.explanation;
        }

        if (exerciseText.includes('QUESTION:')) {
          const questionMatch = exerciseText.match(/QUESTION:\s*(.+?)(?=\n|A\))/);
          const optionMatches = exerciseText.match(/[ABC]\)\s*(.+?)(?=\n|$)/g);
          const explanationMatch = exerciseText.match(/EXPLANATION:\s*(.+?)$/);
          
          if (questionMatch && questionMatch[1]) question = questionMatch[1].trim();
          if (optionMatches && optionMatches.length >= 3) {
            options = optionMatches.slice(0, 3).map(opt => opt.replace(/[ABC]\)\s*/, '').trim());
          }
          if (explanationMatch && explanationMatch[1]) explanation = explanationMatch[1].trim();
        }
        
        exercises.push({
          type: 'SELECT_1_OF_3',
          question,
          options,
          correctAnswer: 0,
          explanation
        });
      }

      // Generate quiz questions based on the specific concepts taught
      const quizQuestions = [];
      for (let i = 0; i < quizCount; i++) {
        const conceptIndex = i % concepts.length;
        const relatedConcept = concepts[conceptIndex];
        
        if (!relatedConcept) continue;
        
        const quizPrompt = `Create a deeper understanding question about this specific story: "${relatedConcept.title}"

**Story details:** ${relatedConcept.description}

**Requirements:**
- Test application or deeper meaning of THIS SPECIFIC STORY
- Ask "how would you apply this?" or "what does this teach us about...?"
- Create 4 answer choices that show different levels of understanding
- Focus on the story's specific lesson, not generic religious concepts
- Test if they can apply the story's lesson to real life

Examples of good application questions:
- "How can you follow the Good Samaritan's example in your life?"
- "What does the feeding story teach about sharing?"
- "Why did Jesus welcome the children when others tried to send them away?"

Format:
QUESTION: [application question about this specific story]
A) [correct answer showing good understanding]
B) [wrong answer - missing the point]
C) [wrong answer - opposite of the lesson]
D) [wrong answer - irrelevant]
EXPLANATION: [why the correct answer shows understanding of the story]`;

        const quizResult = await ai.generate({
          model: 'openai/',
          prompt: quizPrompt,
          config: {
            temperature: 0.7,
            maxOutputTokens: 250,
          },
        });

        // Parse the AI response or use story-specific fallback
        const quizText = quizResult.text || '';
        let question = `How can you apply the lesson from "${relatedConcept.title}" in your daily life?`;
        let answers = [
          'By showing kindness and helping others in need',
          'By focusing only on personal success',
          'By avoiding difficult situations',
          'By following rules without understanding them'
        ];
        let explanation = `The lesson teaches us to apply spiritual principles through acts of kindness and service to others.`;

        // Story-specific fallback questions
        const storyQuizFallbacks = {
          "The Good Samaritan": {
            question: "How can you follow the Good Samaritan's example in your life?",
            answers: [
              "Help someone who is struggling, even if they're different from you",
              "Only help people who are exactly like you",
              "Ignore people who need help if you're busy",
              "Wait for someone else to help first"
            ],
            explanation: "The Good Samaritan teaches us to show compassion to anyone in need, regardless of differences."
          },
          "Jesus Feeding 5000": {
            question: "What does the feeding story teach us about sharing?",
            answers: [
              "Small acts of sharing can have big impacts",
              "Only share when you have plenty extra",
              "Sharing always leads to personal loss",
              "Only adults should be expected to share"
            ],
            explanation: "The story shows that even small acts of sharing can be multiplied into something amazing."
          },
          "The Lost Sheep": {
            question: "What does the lost sheep story teach about how much people matter?",
            answers: [
              "Every single person is valuable and worth searching for",
              "Only the majority group matters most",
              "Lost people should find their own way back",
              "Some people are more important than others"
            ],
            explanation: "The story shows that every individual person matters so much that God will search for them."
          },
          "Jesus and the Children": {
            question: "Why did Jesus welcome the children when others tried to send them away?",
            answers: [
              "To show that everyone is important to God, regardless of age",
              "Because children are more important than adults",
              "To prove that only young people can understand God",
              "Because he didn't have anything else to do"
            ],
            explanation: "Jesus welcomed children to show that God values every person, no matter how young or seemingly unimportant."
          },
          "The Golden Rule": {
            question: "How do you practice the Golden Rule in difficult situations?",
            answers: [
              "Treat someone kindly even when they're not kind to you",
              "Only be nice to people who are nice first",
              "Ignore people who are different from you",
              "Focus on what you can get from others"
            ],
            explanation: "The Golden Rule challenges us to show kindness even when it's hard or when others don't deserve it."
          }
        };

        const quizFallback = storyQuizFallbacks[relatedConcept.title as keyof typeof storyQuizFallbacks];
        if (quizFallback) {
          question = quizFallback.question;
          answers = quizFallback.answers;
          explanation = quizFallback.explanation;
        }

        if (quizText.includes('QUESTION:')) {
          const questionMatch = quizText.match(/QUESTION:\s*(.+?)(?=\n|A\))/);
          const answerMatches = quizText.match(/[ABCD]\)\s*(.+?)(?=\n|$)/g);
          const explanationMatch = quizText.match(/EXPLANATION:\s*(.+?)$/);
          
          if (questionMatch && questionMatch[1]) question = questionMatch[1].trim();
          if (answerMatches && answerMatches.length >= 4) {
            answers = answerMatches.slice(0, 4).map(ans => ans.replace(/[ABCD]\)\s*/, '').trim());
          }
          if (explanationMatch && explanationMatch[1]) explanation = explanationMatch[1].trim();
        }
        
        quizQuestions.push({
          question,
          answers,
          correctAnswerIndex: 0,
          explanation
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
      
      // Enhanced fallback with specific stories and lessons
      const concepts = [];
      const conceptTitles = [
        `The Good Samaritan`,
        `Jesus Feeding 5000`,
        `The Lost Sheep`,
        `Jesus and the Children`,
        `The Golden Rule`
      ];
      
      const conceptDescriptions = [
        `Jesus told a story about a man who was robbed and hurt on the road. A Samaritan (someone from a different group) stopped to help him when others walked by. This teaches us to help anyone in need, even strangers.`,
        `When 5000 people came to hear Jesus, there wasn't enough food. A boy shared his small lunch of bread and fish, and Jesus made it feed everyone. This shows that sharing what we have, even if it's small, can make a big difference.`,
        `Jesus told about a shepherd who had 100 sheep but lost one. He left the 99 safe sheep to find the lost one because each sheep mattered to him. This shows how much God values every single person.`,
        `When people brought children to Jesus, his followers tried to send them away. But Jesus said "Let the children come to me." This teaches that everyone is important to God, no matter how young or small.`,
        `Jesus taught "Treat others the way you want to be treated." This simple rule means being kind, fair, and respectful to everyone, just like you would want them to treat you.`
      ];
      
      const conceptKeyPoints = [
        [`Help people in need`, `Don't ignore suffering`, `Be a good neighbor`, `Show compassion to all`],
        [`Sharing multiplies blessings`, `Small gifts matter`, `God provides enough`, `Generosity creates miracles`],
        [`Every person matters`, `God searches for lost`, `No one is forgotten`, `Love finds everyone`],
        [`Children are valued`, `Everyone belongs with God`, `Age doesn't matter`, `All are welcome`],
        [`Treat others kindly`, `Be fair and respectful`, `Think before acting`, `Create positive relationships`]
      ];
      
      for (let i = 0; i < conceptCount; i++) {
        const conceptIndex = i % conceptTitles.length;
        concepts.push({
          id: `concept_${i + 1}`,
          title: conceptTitles[conceptIndex] || `Understanding ${topic} - Concept ${i + 1}`,
          description: conceptDescriptions[conceptIndex] || `${topic} is a fundamental concept in ${religion} that provides spiritual guidance and moral direction for believers.`,
          keyPoints: conceptKeyPoints[conceptIndex] || [`Core belief in ${religion}`, `Daily spiritual practice`, `Community connection`, `Personal growth tool`],
          example: `In daily life: You can practice this by helping others, sharing what you have, and treating everyone with kindness and respect.`,
          visualDescription: `Think of this story as a guide for how to live with love and compassion!`,
          relatedTerms: [
            { term: 'Compassion', definition: 'Caring deeply about others' },
            { term: 'Service', definition: 'Helping others in need' }
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
      
      // Create exercises based on the specific stories taught
      const exerciseQuestions = [
        {
          question: "In the Good Samaritan story, who helped the injured man?",
          options: ["A Samaritan from a different group", "A priest from the temple", "No one helped him"],
          explanation: "The Samaritan helped even though he was from a different group, showing we should help anyone in need."
        },
        {
          question: "What did the boy share in the feeding story?",
          options: ["His lunch of bread and fish", "His money for food", "His water bottle"],
          explanation: "The boy shared his small lunch, which Jesus used to feed thousands of people."
        },
        {
          question: "How many sheep did the shepherd have originally?",
          options: ["100 sheep", "50 sheep", "200 sheep"],
          explanation: "The shepherd had 100 sheep but left 99 to find the one that was lost."
        },
        {
          question: "What did Jesus say when people brought children to him?",
          options: ["Let the children come to me", "Children should wait their turn", "Only adults can approach me"],
          explanation: "Jesus welcomed the children, showing that everyone is important to God."
        },
        {
          question: "What does the Golden Rule teach us to do?",
          options: ["Treat others how you want to be treated", "Always put yourself first", "Only be kind to friends"],
          explanation: "The Golden Rule teaches us to treat others with the same kindness we would want."
        }
      ];
      
      for (let i = 0; i < exerciseCount; i++) {
        const exerciseIndex = i % exerciseQuestions.length;
        const exercise = exerciseQuestions[exerciseIndex];
        if (!exercise) continue;
        
        exercises.push({
          type: 'SELECT_1_OF_3',
          question: exercise.question,
          options: exercise.options,
          correctAnswer: 0,
          explanation: exercise.explanation
        });
      }

      const quizQuestions = [];
      const assessmentQuestions = [
        {
          question: "How can you follow the Good Samaritan's example in your life?",
          answers: [
            "Help someone who is struggling, even if they're different from you",
            "Only help people who are exactly like you",
            "Ignore people who need help if you're busy",
            "Wait for someone else to help first"
          ],
          explanation: "The Good Samaritan teaches us to show compassion to anyone in need, regardless of differences."
        },
        {
          question: "What does the feeding story teach us about sharing?",
          answers: [
            "Small acts of sharing can have big impacts",
            "Only share when you have plenty extra",
            "Sharing always leads to personal loss",
            "Only adults should be expected to share"
          ],
          explanation: "The story shows that even small acts of sharing can be multiplied into something amazing."
        },
        {
          question: "What does the lost sheep story teach about how much people matter?",
          answers: [
            "Every single person is valuable and worth searching for",
            "Only the majority group matters most",
            "Lost people should find their own way back",
            "Some people are more important than others"
          ],
          explanation: "The story shows that every individual person matters so much that God will search for them."
        },
        {
          question: "Why did Jesus welcome the children when others tried to send them away?",
          answers: [
            "To show that everyone is important to God, regardless of age",
            "Because children are more important than adults",
            "To prove that only young people can understand God",
            "Because he didn't have anything else to do"
          ],
          explanation: "Jesus welcomed children to show that God values every person, no matter how young or seemingly unimportant."
        },
        {
          question: "How do you practice the Golden Rule in difficult situations?",
          answers: [
            "Treat someone kindly even when they're not kind to you",
            "Only be nice to people who are nice first",
            "Ignore people who are different from you",
            "Focus on what you can get from others"
          ],
          explanation: "The Golden Rule challenges us to show kindness even when it's hard or when others don't deserve it."
        }
      ];
      
      for (let i = 0; i < quizCount; i++) {
        const quizIndex = i % assessmentQuestions.length;
        const quiz = assessmentQuestions[quizIndex];
        if (!quiz) continue;
        
        quizQuestions.push({
          question: quiz.question,
          answers: quiz.answers,
          correctAnswerIndex: 0,
          explanation: quiz.explanation
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
