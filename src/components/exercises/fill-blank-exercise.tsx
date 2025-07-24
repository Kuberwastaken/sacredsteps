'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

interface FillBlankExerciseProps {
  sentence: string;
  correctAnswer: string;
  explanation?: string;
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void;
  hearts: number;
}

export function FillBlankExercise({ 
  sentence, 
  correctAnswer, 
  explanation, 
  onAnswer, 
  hearts 
}: FillBlankExerciseProps) {
  const [userInput, setUserInput] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSubmit = () => {
    if (!userInput.trim() || answered) return;
    
    const isCorrect = userInput.trim().toLowerCase() === correctAnswer.toLowerCase();
    setAnswered(true);
    setShowResult(true);
    onAnswer(isCorrect, userInput.trim());
  };

  const renderSentenceWithBlank = () => {
    const parts = sentence.split('____');
    if (parts.length === 2) {
      return (
        <span className="text-lg">
          {parts[0]}
          <input
            value={userInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
            disabled={answered}
            className="inline-block w-32 mx-2 text-center border-2 border-blue-500 rounded px-2 py-1"
            placeholder="..."
          />
          {parts[1]}
        </span>
      );
    }
    return sentence;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Sentence with blank */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-center mb-6">Fill in the blank</h3>
          <div className="text-center">
            {renderSentenceWithBlank()}
          </div>

          {/* Submit Button */}
          {!answered && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleSubmit}
                disabled={!userInput.trim()}
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
                {userInput.trim().toLowerCase() === correctAnswer.toLowerCase() ? (
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
              
              {userInput.trim().toLowerCase() !== correctAnswer.toLowerCase() && (
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