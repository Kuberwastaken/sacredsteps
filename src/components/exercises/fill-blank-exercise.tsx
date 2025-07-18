'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import type { FillBlankExercise } from '~/types';

interface FillBlankExerciseProps {
  exercise: FillBlankExercise;
  userAnswer: string | null;
  onAnswerChange: (answer: string) => void;
  disabled: boolean;
}

export function FillBlankExercise({ exercise, userAnswer, onAnswerChange, disabled }: FillBlankExerciseProps) {
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

  const renderSentenceWithBlank = () => {
    const parts = exercise.data.sentence.split('____');
    if (parts.length === 2) {
      return (
        <span className="text-lg">
          {parts[0]}
          <span className="inline-block min-w-[100px] border-b-2 border-blue-500 mx-2 text-center">
            {selectedOption && (
              <span className="font-semibold text-blue-600">{selectedOption}</span>
            )}
            {!selectedOption && (
              <span className="text-gray-400">____</span>
            )}
          </span>
          {parts[1]}
        </span>
      );
    }
    return exercise.data.sentence;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{exercise.prompt}</h3>
        <p className="text-sm text-gray-600">Fill in the blank with the correct word</p>
      </div>

      {/* Sentence with blank */}
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6 text-center">
          {renderSentenceWithBlank()}
        </CardContent>
      </Card>

      {/* Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700 text-center">Choose the correct word:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
          {exercise.data.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? "default" : "outline"}
              className="h-auto p-3 text-center"
              onClick={() => handleOptionSelect(option)}
              disabled={disabled}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 