'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

interface MultipleChoiceExerciseProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void;
  hearts: number;
}

export function MultipleChoiceExercise({ 
  question, 
  options, 
  correctAnswer, 
  explanation, 
  onAnswer, 
  hearts 
}: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || answered) return;
    
    const isCorrect = selectedOption === correctAnswer;
    setAnswered(true);
    setShowResult(true);
    onAnswer(isCorrect, selectedOption);
  };

  const getOptionClassName = (option: string) => {
    if (!showResult) {
      return selectedOption === option 
        ? "bg-blue-100 border-blue-500 text-blue-900" 
        : "bg-white border-gray-300 hover:bg-gray-50";
    }
    
    if (option === correctAnswer) {
      return "bg-green-100 border-green-500 text-green-900";
    }
    
    if (option === selectedOption && option !== correctAnswer) {
      return "bg-red-100 border-red-500 text-red-900";
    }
    
    return "bg-gray-100 border-gray-300 text-gray-600";
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Question */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-center mb-6">{question}</h3>
          
          {/* Options */}
          <div className="space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${getOptionClassName(option)}`}
                onClick={() => handleOptionSelect(option)}
                disabled={answered}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-sm min-w-[24px]">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Submit Button */}
          {!answered && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="w-full max-w-xs"
              >
                Submit Answer
              </Button>
            </div>
          )}

          {/* Results and Explanation */}
          {showResult && (
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <div className="text-center mb-3">
                {selectedOption === correctAnswer ? (
                  <div className="text-green-600 font-semibold">✅ Correct!</div>
                ) : (
                  <div className="text-red-600 font-semibold">❌ Incorrect</div>
                )}
              </div>
              
              {explanation && (
                <div className="text-sm text-gray-700">
                  <strong>Explanation:</strong> {explanation}
                </div>
              )}
              
              {selectedOption !== correctAnswer && (
                <div className="text-sm text-gray-700 mt-2">
                  <strong>Correct answer:</strong> {correctAnswer}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 