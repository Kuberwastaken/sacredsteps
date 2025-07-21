import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCourseStore } from '~/stores/createCourseStore';
import { getLessonForQuizGeneration } from '~/utils/curriculum-converter';
import { BookOpen, Clock, Target, Heart, ArrowLeft, Play, CheckCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { MultipleChoiceExercise } from '~/components/exercises/multiple-choice-exercise';
import { TrueFalseExercise } from '~/components/exercises/true-false-exercise';
import { MatchPairsExercise } from '~/components/exercises/match-pairs-exercise';
import { FillBlankExercise } from '~/components/exercises/fill-blank-exercise';
import { useBoundStore } from '~/hooks/useBoundStore';

interface LessonPageProps {
  religion: string;
  unitId: string;
  lessonId: string;
}

type LessonPhase = 'intro' | 'teaching' | 'practice' | 'assessment' | 'complete';

interface Exercise {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'match-pairs' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function CurriculumLessonPage({ religion, unitId, lessonId }: LessonPageProps) {
  const router = useRouter();
  const { loadCourse, completeLesson } = useCourseStore();
  const { hearts, loseHeart } = useBoundStore();
  
  const [currentPhase, setCurrentPhase] = useState<LessonPhase>('intro');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const course = loadCourse(religion);
  const unit = course?.units.find(u => u.id === unitId);
  const lesson = unit?.lessons.find(l => l.id === lessonId);

  // Get curriculum data for this lesson
  const lessonData = getLessonForQuizGeneration(religion, unitId, lessonId);

  useEffect(() => {
    if (currentPhase === 'practice' && exercises.length === 0) {
      generateExercises();
    }
  }, [currentPhase]);

  const generateExercises = async () => {
    if (!lessonData) {
      setError('Lesson data not found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-curriculum-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          religion: lessonData.religion,
          unitId,
          lessonId,
          questionsPerType: 3, // Generate 3 of each type
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate exercises');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        const allExercises: Exercise[] = [
          ...result.data.multipleChoice,
          ...result.data.trueFalse,
          ...result.data.matchPairs.map((pair: any) => ({
            id: pair.id,
            type: 'match-pairs',
            question: 'Match the terms with their definitions',
            pairs: result.data.matchPairs,
            difficulty: pair.difficulty,
          })),
          ...result.data.fillBlanks,
        ];

        // Shuffle exercises for variety
        const shuffled = allExercises.sort(() => Math.random() - 0.5);
        setExercises(shuffled.slice(0, 8)); // Use 8 exercises total
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating exercises:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate exercises');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 10);
    } else {
      loseHeart();
      if (hearts <= 1) {
        // Game over - redirect to hearts page
        router.push('/hearts');
        return;
      }
    }

    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Move to assessment phase
      setCurrentPhase('assessment');
    }
  };

  const completeCurrentLesson = () => {
    if (lesson && course) {
      completeLesson(religion, unitId, lessonId, score);
      setCurrentPhase('complete');
    }
  };

  const handleContinue = () => {
    router.push(`/learn/${religion}`);
  };

  if (!course || !unit || !lesson || !lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <p className="text-gray-600">Lesson not found</p>
            <Button onClick={() => router.back()} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Intro Phase
  if (currentPhase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-2xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2 text-white">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              <span>{hearts}</span>
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">{lesson.title}</CardTitle>
              <p className="text-gray-600">{lesson.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lesson Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-xs text-gray-600">{lesson.estimatedMinutes} minutes</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Difficulty</p>
                  <p className="text-xs text-gray-600 capitalize">{lesson.difficulty}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">Key Terms</p>
                  <p className="text-xs text-gray-600">{lessonData.keyTerms.length} terms</p>
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">What You'll Learn:</h3>
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Terms Preview */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Key Terms:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lessonData.keyTerms.slice(0, 4).map((term, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm text-gray-800">{term.term}</p>
                      <p className="text-xs text-gray-600">{term.definition}</p>
                    </div>
                  ))}
                </div>
                {lessonData.keyTerms.length > 4 && (
                  <p className="text-xs text-gray-500 mt-2">
                    +{lessonData.keyTerms.length - 4} more terms to learn
                  </p>
                )}
              </div>

              <Button 
                onClick={() => setCurrentPhase('teaching')}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Begin Lesson
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Teaching Phase
  if (currentPhase === 'teaching') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-2xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setCurrentPhase('intro')} className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2 text-white">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              <span>{hearts}</span>
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Study Material</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cultural Context */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Cultural Context:</h3>
                <div className="space-y-2">
                  {lessonData.culturalContext.map((context, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">{context}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Terms Detail */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Key Terms & Definitions:</h3>
                <div className="space-y-3">
                  {lessonData.keyTerms.map((term, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">{term.term}</h4>
                      <p className="text-sm text-gray-600">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setCurrentPhase('practice')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                size="lg"
              >
                Start Practice Exercises
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Practice Phase
  if (currentPhase === 'practice') {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
            <h2 className="text-2xl font-bold text-white">Generating Exercises</h2>
            <p className="text-white/80">Creating practice questions for you...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center p-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => setCurrentPhase('teaching')}>
                Return to Study Material
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    const currentExercise = exercises[currentExerciseIndex];
    if (!currentExercise) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center p-8">
              <p className="text-gray-600 mb-4">No exercises available</p>
              <Button onClick={() => setCurrentPhase('teaching')}>
                Return to Study Material
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Render appropriate exercise component
    const renderExercise = () => {
      const commonProps = {
        onAnswer: handleAnswerSubmit,
        hearts,
      };

      switch (currentExercise.type) {
        case 'multiple-choice':
          return (
            <MultipleChoiceExercise
              exercise={{
                id: currentExercise.id,
                prompt: currentExercise.question,
                type: 'multiple-choice',
                data: {
                  question: currentExercise.question,
                  correctAnswer: currentExercise.correctAnswer as string,
                  options: currentExercise.options || []
                }
              }}
              userAnswer={null}
              onAnswerChange={(answer) => handleAnswerSubmit(answer === currentExercise.correctAnswer)}
              disabled={false}
            />
          );
        case 'true-false':
          return (
            <TrueFalseExercise
              exercise={{
                id: currentExercise.id,
                prompt: currentExercise.question,
                type: 'true-false',
                data: {
                  statement: currentExercise.question,
                  correctAnswer: currentExercise.correctAnswer === 'true',
                  explanation: currentExercise.explanation || ''
                }
              }}
              userAnswer={null}
              onAnswerChange={(answer) => handleAnswerSubmit(answer)}
              disabled={false}
            />
          );
        case 'match-pairs':
          return (
            <MatchPairsExercise
              exercise={{
                id: currentExercise.id,
                prompt: 'Match the terms with their definitions',
                type: 'match-pairs',
                data: (currentExercise as any).pairs || []
              }}
              userAnswer={null}
              onAnswerChange={(answer) => handleAnswerSubmit(answer.length === ((currentExercise as any).pairs || []).length)}
              disabled={false}
            />
          );
        case 'fill-blank':
          return (
            <FillBlankExercise
              exercise={{
                id: currentExercise.id,
                prompt: currentExercise.question,
                type: 'fill-in-the-blank',
                data: {
                  sentence: currentExercise.question,
                  correctAnswer: currentExercise.correctAnswer as string,
                  options: currentExercise.options || ['option1', 'option2', 'option3'] // fallback options
                }
              }}
              userAnswer={null}
              onAnswerChange={(answer) => handleAnswerSubmit(answer === currentExercise.correctAnswer)}
              disabled={false}
            />
          );
        default:
          return <div>Unsupported exercise type</div>;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-2xl mx-auto p-4">
          {/* Header with progress */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setCurrentPhase('teaching')} className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Study
            </Button>
            <div className="flex items-center space-x-4 text-white">
              <span className="text-sm">
                {currentExerciseIndex + 1} / {exercises.length}
              </span>
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              <span>{hearts}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
              />
            </div>
          </div>

          {renderExercise()}
        </div>
      </div>
    );
  }

  // Assessment Phase
  if (currentPhase === 'assessment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-center min-h-screen">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Lesson Assessment</CardTitle>
              <p className="text-gray-600">How did you do?</p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-green-600">{score}</div>
              <p className="text-gray-600">Total Points Earned</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{exercises.length}</p>
                  <p className="text-sm text-gray-600">Exercises Completed</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{Math.round((score / (exercises.length * 10)) * 100)}%</p>
                  <p className="text-sm text-gray-600">Accuracy</p>
                </div>
              </div>

              <Button 
                onClick={completeCurrentLesson}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="lg"
              >
                Complete Lesson
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Complete Phase
  if (currentPhase === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-center min-h-screen">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Lesson Complete!</CardTitle>
              <p className="text-gray-600">Great job learning about {lesson.title}</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{score}</p>
                <p className="text-sm text-gray-600">XP Earned</p>
              </div>

              <Button 
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                size="lg"
              >
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
