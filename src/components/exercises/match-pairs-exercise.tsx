'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

interface MatchPairsExerciseProps {
  pairs: { term: string; definition: string }[];
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void;
  hearts: number;
}

export function MatchPairsExercise({ pairs, onAnswer, hearts }: MatchPairsExerciseProps) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Debug: Log the pairs data
  console.log('MatchPairsExercise received pairs:', pairs);
  console.log('Pairs length:', pairs?.length);
  
  // Safety check: ensure pairs is an array and has data
  const safePairs = Array.isArray(pairs) ? pairs.filter(pair => pair && pair.term && pair.definition) : [];
  
  console.log('Safe pairs after filtering:', safePairs);

  // If no valid pairs, show an error message
  if (!safePairs || safePairs.length === 0) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              <h3 className="text-xl font-medium mb-4">No Match Pairs Data Available</h3>
              <p>Debug info:</p>
              <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
                {JSON.stringify({ pairs, safePairs }, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Shuffle the definitions to make it more challenging
  const [shuffledDefinitions] = useState(() => {
    const definitions = safePairs.map(item => item.definition);
    return definitions.sort(() => Math.random() - 0.5);
  });

  const handleAnswerChange = (termIndex: number, definitionIndex: number) => {
    if (answered) return;
    
    setAnswers(prev => ({
      ...prev,
      [termIndex]: definitionIndex
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== safePairs.length || answered) return;
    
    // Check if all matches are correct
    let correctCount = 0;
    safePairs.forEach((pair, termIndex) => {
      const selectedDefinitionIndex = answers[termIndex];
      if (selectedDefinitionIndex !== undefined) {
        const selectedDefinition = shuffledDefinitions[selectedDefinitionIndex];
        if (selectedDefinition === pair.definition) {
          correctCount++;
        }
      }
    });
    
    const isCorrect = correctCount === safePairs.length;
    
    setAnswered(true);
    setShowResult(true);
    onAnswer(isCorrect, `${correctCount}/${safePairs.length} correct matches`);
  };

  const canSubmit = Object.keys(answers).length === safePairs.length && !answered;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Study Material Section - Compact Table */}
      <Card className="mb-2">
        <CardContent className="p-4">
          <h4 className="text-lg font-semibold mb-2 text-center text-gray-900">Study Material</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Term</th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Definition</th>
                </tr>
              </thead>
              <tbody>
                {safePairs.map((item, idx) => (
                  <tr key={`${item.term}-${idx}`} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-3 py-2 font-semibold text-gray-900 whitespace-nowrap">{item.term}</td>
                    <td className="px-3 py-2 text-gray-700">{item.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-center mb-6 text-gray-900">Match the pairs</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column - Terms */}
              <div className="space-y-3">
                <h3 className="text-gray-700 font-semibold mb-3">Terms:</h3>
                {safePairs.map((pair, index) => (
                  <div key={`term-${index}`} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-gray-900 font-medium">{pair.term}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right Column - Definitions */}
              <div className="space-y-3">
                <h3 className="text-gray-700 font-semibold mb-3">Definitions:</h3>
                {shuffledDefinitions.map((def, index) => (
                  <div key={`def-${index}`} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-700 text-sm">{def}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Matching Instructions */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
              <p className="text-gray-900 text-center">
                <strong>Instructions:</strong> Match each term (left) with its correct definition (right) by selecting the corresponding letter.
              </p>
            </div>
            
            {/* Answer Selection */}
            <div className="space-y-3">
              <h3 className="text-gray-700 font-semibold">Your Matches:</h3>
              {safePairs.map((pair, index) => (
                <div key={`match-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-gray-900 font-medium flex-1">{pair.term}</span>
                  <span className="text-gray-500">→</span>
                  <select
                    value={answers[index] ?? ''}
                    onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                    className="p-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]"
                    disabled={answered}
                  >
                    <option value="">Choose...</option>
                    {shuffledDefinitions.map((_, i) => (
                      <option key={i} value={i}>{String.fromCharCode(65 + i)}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            
            {/* Submit Button */}
            {canSubmit && (
              <div className="text-center mt-6">
                <Button 
                  onClick={handleSubmit} 
                  className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white"
                >
                  Check Answers
                </Button>
              </div>
            )}

            {/* Results */}
            {showResult && (
              <div className="mt-6 p-4 rounded-lg bg-gray-50">
                <div className="text-center mb-3">
                  {safePairs.every((pair, termIndex) => {
                    const selectedDefinitionIndex = answers[termIndex];
                    if (selectedDefinitionIndex === undefined) return false;
                    const selectedDefinition = shuffledDefinitions[selectedDefinitionIndex];
                    return selectedDefinition === pair.definition;
                  }) ? (
                    <div className="text-green-600 font-semibold">✅ All matches correct!</div>
                  ) : (
                    <div className="text-red-600 font-semibold">❌ Some matches are incorrect</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}