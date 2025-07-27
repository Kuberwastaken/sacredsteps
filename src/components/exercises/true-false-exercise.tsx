'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

interface TrueFalseExerciseProps {
  question: string;
  correctAnswer: boolean;
  explanation?: string;
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void;
  hearts: number;
}

export function TrueFalseExercise({ 
  question, 
  correctAnswer, 
  explanation, 
  onAnswer, 
  hearts 
}: TrueFalseExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (answer: boolean) => {
    if (answered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || answered) return;
    
    const isCorrect = selectedAnswer === correctAnswer;
    setAnswered(true);
    setShowResult(true);
    onAnswer(isCorrect, selectedAnswer.toString());
  };

  const getButtonClassName = (answer: boolean) => {
    if (!showResult) {
      return selectedAnswer === answer 
        ? "bg-blue-100 border-blue-500 text-blue-900" 
        : "bg-white border-gray-300 hover:bg-gray-50";
    }
    
    if (answer === correctAnswer) {
      return "bg-green-100 border-green-500 text-green-900";
    }
    
    if (answer === selectedAnswer && answer !== correctAnswer) {
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
          
          {/* True/False Options */}
          <div className="space-y-3">
            <button
              className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${getButtonClassName(true)}`}
              onClick={() => handleAnswerSelect(true)}
              disabled={answered}
            >
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-sm min-w-[24px]">A.</span>
                <span>True</span>
              </div>
            </button>
            
            <button
              className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${getButtonClassName(false)}`}
              onClick={() => handleAnswerSelect(false)}
              disabled={answered}
            >
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-sm min-w-[24px]">B.</span>
                <span>False</span>
              </div>
            </button>
          </div>

          {/* Submit Button */}
          {!answered && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
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
                {selectedAnswer === correctAnswer ? (
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
              
              {selectedAnswer !== correctAnswer && (
                <div className="text-sm text-gray-700 mt-2">
                  <strong>Correct answer:</strong> {correctAnswer ? 'True' : 'False'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}