'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import type { TrueFalseExercise } from '~/types';

interface TrueFalseExerciseProps {
  exercise: TrueFalseExercise;
  userAnswer: boolean | null;
  onAnswerChange: (answer: boolean) => void;
  disabled: boolean;
}

export function TrueFalseExercise({ exercise, userAnswer, onAnswerChange, disabled }: TrueFalseExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    if (userAnswer !== null) {
      setSelectedAnswer(userAnswer);
    }
  }, [userAnswer]);

  const handleAnswerSelect = (answer: boolean) => {
    if (disabled) return;
    setSelectedAnswer(answer);
    onAnswerChange(answer);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{exercise.prompt}</h3>
        <p className="text-sm text-gray-600">Is this statement true or false?</p>
      </div>

      {/* Statement */}
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6 text-center">
          <p className="text-lg italic">"{exercise.data.statement}"</p>
        </CardContent>
      </Card>

      {/* True/False Options */}
      <div className="flex justify-center space-x-4 max-w-md mx-auto">
        <Button
          variant={selectedAnswer === true ? "default" : "outline"}
          className="flex-1 h-auto p-4 text-lg font-semibold"
          onClick={() => handleAnswerSelect(true)}
          disabled={disabled}
        >
          ✓ True
        </Button>
        <Button
          variant={selectedAnswer === false ? "default" : "outline"}
          className="flex-1 h-auto p-4 text-lg font-semibold"
          onClick={() => handleAnswerSelect(false)}
          disabled={disabled}
        >
          ✗ False
        </Button>
      </div>
    </div>
  );
} 