'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface MatchPairsExerciseProps {
  pairs: { term: string; definition: string }[];
  onAnswer: (isCorrect: boolean, selectedAnswer: string) => void;
  hearts: number;
}

export function MatchPairsExercise({ pairs, onAnswer, hearts }: MatchPairsExerciseProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ term: string; definition: string }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Shuffle the definitions to make it more challenging
  const [shuffledDefinitions] = useState(() => {
    const definitions = pairs.map(item => item.definition);
    return definitions.sort(() => Math.random() - 0.5);
  });

  const handleSubmit = () => {
    if (matches.length !== pairs.length || answered) return;
    
    // Check if all matches are correct
    const isCorrect = matches.every(match => 
      pairs.some(pair => pair.term === match.term && pair.definition === match.definition)
    );
    
    setAnswered(true);
    setShowResult(true);
    onAnswer(isCorrect, `${matches.length}/${pairs.length} correct matches`);
  };

  const handleTermClick = (term: string) => {
    if (answered) return;
    
    if (selectedTerm === term) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(term);
      setSelectedDefinition(null);
    }
  };

  const handleDefinitionClick = (definition: string) => {
    if (answered) return;
    
    if (selectedDefinition === definition) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(definition);
      setSelectedTerm(null);
    }
  };

  const createMatch = () => {
    if (!selectedTerm || !selectedDefinition) return;
    
    const newMatch = { term: selectedTerm, definition: selectedDefinition };
    setMatches(prev => [...prev, newMatch]);
    setSelectedTerm(null);
    setSelectedDefinition(null);
  };

  const removeMatch = (matchToRemove: { term: string; definition: string }) => {
    if (answered) return;
    setMatches(prev => prev.filter(match => 
      match.term !== matchToRemove.term || match.definition !== matchToRemove.definition
    ));
  };

  const isTermMatched = (term: string) => 
    matches.some(match => match.term === term);

  const isDefinitionMatched = (definition: string) => 
    matches.some(match => match.definition === definition);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Study Material Section - Compact Table */}
      <Card className="mb-2">
        <CardContent className="p-4">
          <h4 className="text-lg font-semibold mb-2 text-center">Study Material</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Term</th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Definition</th>
                </tr>
              </thead>
              <tbody>
                {pairs.map((item, idx) => (
                  <tr key={item.term} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
          <h3 className="text-xl font-medium text-center mb-6">Match the pairs</h3>
          {/* Current Matches */}
          {matches.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-sm text-gray-700 mb-3">Matches:</h4>
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{match.term}</span>
                      <span className="text-gray-400">→</span>
                      <span>{match.definition}</span>
                    </div>
                    {!answered && (
                      <button
                        onClick={() => removeMatch(match)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Terms */}
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">Terms:</h4>
              <div className="space-y-2">
                {pairs.map(item => (
                  <button
                    key={item.term}
                    className={`w-full p-3 text-left border-2 rounded-lg transition-colors text-black ${
                      selectedTerm === item.term 
                        ? 'bg-blue-100 border-blue-500 text-blue-900'
                        : isTermMatched(item.term)
                        ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleTermClick(item.term)}
                    disabled={answered || isTermMatched(item.term)}
                  >
                    {item.term}
                  </button>
                ))}
              </div>
            </div>

            {/* Definitions */}
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-3">Definitions:</h4>
              <div className="space-y-2">
                {shuffledDefinitions.map(definition => (
                  <button
                    key={definition}
                    className={`w-full p-3 text-left border-2 rounded-lg transition-colors text-black ${
                      selectedDefinition === definition 
                        ? 'bg-blue-100 border-blue-500 text-blue-900'
                        : isDefinitionMatched(definition)
                        ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleDefinitionClick(definition)}
                    disabled={answered || isDefinitionMatched(definition)}
                  >
                    {definition}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Create Match Button */}
          {selectedTerm && selectedDefinition && !answered && (
            <div className="text-center mt-6">
              <Button onClick={createMatch} className="w-full max-w-xs">
                Create Match
              </Button>
            </div>
          )}

          {/* Submit Button */}
          {matches.length === pairs.length && !answered && (
            <div className="text-center mt-6">
              <Button onClick={handleSubmit} className="w-full max-w-xs">
                Submit All Matches
              </Button>
            </div>
          )}

          {/* Results */}
          {showResult && (
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <div className="text-center mb-3">
                {matches.every(match => 
                  pairs.some(pair => pair.term === match.term && pair.definition === match.definition)
                ) ? (
                  <div className="text-green-600 font-semibold">✅ All matches correct!</div>
                ) : (
                  <div className="text-red-600 font-semibold">❌ Some matches are incorrect</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}