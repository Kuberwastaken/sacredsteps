'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import type { MultipleChoiceExercise } from '~/types';

interface MultipleChoiceExerciseProps {
  exercise: MultipleChoiceExercise;
  userAnswer: string | null;
  onAnswerChange: (answer: string) => void;
  disabled: boolean;
}

export function MultipleChoiceExercise({ exercise, userAnswer, onAnswerChange, disabled }: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    if (userAnswer) {
      setSelectedOption(userAnswer);
    }
  }, [userAnswer]);

  const handleOptionSelect = (option: string) => {
    if (disabled) return;
    setSelectedOption(option);
    onAnswerChange(option);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{exercise.prompt}</h3>
      </div>

      {/* Question */}
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6 text-center">
          <p className="text-lg">{exercise.data.question}</p>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="space-y-3 max-w-2xl mx-auto">
        {exercise.data.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? "default" : "outline"}
            className="w-full h-auto p-4 text-left justify-start"
            onClick={() => handleOptionSelect(option)}
            disabled={disabled}
          >
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-400 text-sm">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{option}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
} 