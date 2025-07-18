'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import type { AnyExercise, SkillNode } from '~/types';
import { MatchPairsExercise } from './exercises/match-pairs-exercise';
import { FillBlankExercise } from './exercises/fill-blank-exercise';
import { ImageAssocExercise } from './exercises/image-assoc-exercise';
import { MultipleChoiceExercise } from './exercises/multiple-choice-exercise';
import { TrueFalseExercise } from './exercises/true-false-exercise';

interface AILessonPlayerProps {
  religion: string;
  skillTitle: string;
  description: string;
  nodeId: string;
  onComplete: (score: number, total: number) => void;
}

export function AILessonPlayer({ religion, skillTitle, description, nodeId, onComplete }: AILessonPlayerProps) {
  const [skillNode, setSkillNode] = useState<SkillNode | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate lesson content on mount
  useEffect(() => {
    const generateLesson = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/test-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'skill',
            religion,
            skillTitle,
            description,
            nodeId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate lesson');
        }

        const data = await response.json();
        if (data.success && data.data) {
          setSkillNode(data.data);
          setUserAnswers(new Array(data.data.exercises.length).fill(null));
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Failed to generate lesson:', err);
        setError('Failed to generate lesson content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    generateLesson();
  }, [religion, skillTitle, description, nodeId]);

  const currentExercise = skillNode?.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === (skillNode?.exercises.length ?? 0) - 1;

  const handleAnswerChange = (answer: any) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentExerciseIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    if (!currentExercise || userAnswers[currentExerciseIndex] === null) return;

    setShowFeedback(true);

    setTimeout(() => {
      if (isLastExercise) {
        // Calculate final score
        const score = calculateScore();
        const total = skillNode?.exercises.length ?? 0;
        onComplete(score, total);
      } else {
        // Move to next exercise
        setCurrentExerciseIndex(prev => prev + 1);
        setShowFeedback(false);
      }
    }, 2000);
  };

  const calculateScore = () => {
    if (!skillNode) return 0;
    
    let correct = 0;
    skillNode.exercises.forEach((exercise, index) => {
      const userAnswer = userAnswers[index];
      if (isAnswerCorrect(exercise, userAnswer)) {
        correct++;
      }
    });
    return correct;
  };

  const isAnswerCorrect = (exercise: AnyExercise, userAnswer: any): boolean => {
    if (userAnswer === null || userAnswer === undefined) return false;

    switch (exercise.type) {
      case 'match-pairs':
        if (!Array.isArray(userAnswer) || !Array.isArray(exercise.data)) return false;
        return userAnswer.length === exercise.data.length &&
               userAnswer.every(match => 
                 exercise.data.some(correct => 
                   correct.term === match.term && correct.definition === match.definition
                 )
               );
      
      case 'fill-in-the-blank':
        return userAnswer === exercise.data.correctAnswer;
      
      case 'image-association':
        return userAnswer === exercise.data.correctAnswer;
      
      case 'multiple-choice':
        return userAnswer === exercise.data.correctAnswer;
      
      case 'true-false':
        return userAnswer === exercise.data.correctAnswer;
      
      default:
        return false;
    }
  };

  const getCurrentAnswerFeedback = () => {
    if (!currentExercise) return null;
    const userAnswer = userAnswers[currentExerciseIndex];
    const isCorrect = isAnswerCorrect(currentExercise, userAnswer);
    
    return {
      isCorrect,
      explanation: currentExercise.type === 'true-false' && 'explanation' in currentExercise.data 
        ? currentExercise.data.explanation 
        : null
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating personalized lesson...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!skillNode || !currentExercise) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">No exercises available</p>
      </div>
    );
  }

  const feedback = getCurrentAnswerFeedback();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Exercise {currentExerciseIndex + 1} of {skillNode.exercises.length}
          </span>
          <span className="text-sm text-gray-500">{skillNode.title}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExerciseIndex + 1) / skillNode.exercises.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="mb-6">
        {currentExercise.type === 'match-pairs' && (
          <MatchPairsExercise
            exercise={currentExercise}
            userAnswer={userAnswers[currentExerciseIndex]}
            onAnswerChange={handleAnswerChange}
            disabled={showFeedback}
          />
        )}
        {currentExercise.type === 'fill-in-the-blank' && (
          <FillBlankExercise
            exercise={currentExercise}
            userAnswer={userAnswers[currentExerciseIndex]}
            onAnswerChange={handleAnswerChange}
            disabled={showFeedback}
          />
        )}
        {currentExercise.type === 'image-association' && (
          <ImageAssocExercise
            exercise={currentExercise}
            userAnswer={userAnswers[currentExerciseIndex]}
            onAnswerChange={handleAnswerChange}
            disabled={showFeedback}
          />
        )}
        {currentExercise.type === 'multiple-choice' && (
          <MultipleChoiceExercise
            exercise={currentExercise}
            userAnswer={userAnswers[currentExerciseIndex]}
            onAnswerChange={handleAnswerChange}
            disabled={showFeedback}
          />
        )}
        {currentExercise.type === 'true-false' && (
          <TrueFalseExercise
            exercise={currentExercise}
            userAnswer={userAnswers[currentExerciseIndex]}
            onAnswerChange={handleAnswerChange}
            disabled={showFeedback}
          />
        )}
      </div>

      {/* Feedback */}
      {showFeedback && feedback && (
        <Card className={`mb-6 ${feedback.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {feedback.isCorrect ? '✓' : '✗'}
              </span>
              <span className={`font-semibold ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {feedback.isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            {feedback.explanation && (
              <p className="text-sm text-gray-600 mt-2">{feedback.explanation}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Check Answer Button */}
      {!showFeedback && (
        <div className="text-center">
          <Button
            onClick={checkAnswer}
            disabled={userAnswers[currentExerciseIndex] === null}
            className="px-8 py-3 text-lg"
          >
            {isLastExercise ? 'Finish Lesson' : 'Check Answer'}
          </Button>
        </div>
      )}

      {/* Next/Loading Button */}
      {showFeedback && (
        <div className="text-center">
          <Button disabled className="px-8 py-3 text-lg">
            {isLastExercise ? 'Completing...' : 'Loading next exercise...'}
          </Button>
        </div>
      )}
    </div>
  );
} 