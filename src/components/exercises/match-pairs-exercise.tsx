'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { MatchPairsExercise } from '~/types';

interface MatchPairsExerciseProps {
  exercise: MatchPairsExercise;
  userAnswer: { term: string; definition: string }[] | null;
  onAnswerChange: (answer: { term: string; definition: string }[]) => void;
  disabled: boolean;
}

export function MatchPairsExercise({ exercise, userAnswer, onAnswerChange, disabled }: MatchPairsExerciseProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ term: string; definition: string }[]>([]);

  // Shuffle the definitions to make it more challenging
  const [shuffledDefinitions] = useState(() => {
    const definitions = exercise.data.map(item => item.definition);
    return definitions.sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    const validMatches = Array.isArray(matches) ? matches : [];
    onAnswerChange(validMatches);
  }, [matches, onAnswerChange]);

  useEffect(() => {
    if (userAnswer && Array.isArray(userAnswer)) {
      setMatches(userAnswer);
    }
  }, [userAnswer]);

  const handleTermClick = (term: string) => {
    if (disabled) return;
    
    if (selectedTerm === term) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(term);
      setSelectedDefinition(null);
    }
  };

  const handleDefinitionClick = (definition: string) => {
    if (disabled) return;
    
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
    if (disabled) return;
    setMatches(prev => prev.filter(match => 
      match.term !== matchToRemove.term || match.definition !== matchToRemove.definition
    ));
  };

  const isTermMatched = (term: string) => 
    matches.some(match => match.term === term);

  const isDefinitionMatched = (definition: string) => 
    matches.some(match => match.definition === definition);

  const getMatchForTerm = (term: string) => 
    matches.find(match => match.term === term);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{exercise.prompt}</h3>
        <p className="text-sm text-gray-600">Match terms with their definitions</p>
      </div>

      {/* Current Matches */}
      {matches.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Matches:</h4>
          <div className="space-y-2">
            {matches.map((match, index) => (
              <Card key={index} className="bg-green-50 border-green-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{match.term}</span>
                      <span className="text-gray-400">→</span>
                      <span>{match.definition}</span>
                    </div>
                    {!disabled && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMatch(match)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Terms */}
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-3">Terms:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exercise.data.map(item => (
            <Button
              key={item.term}
              variant={selectedTerm === item.term ? "default" : "outline"}
              className={`h-auto p-3 text-left justify-start ${
                isTermMatched(item.term) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleTermClick(item.term)}
              disabled={disabled || isTermMatched(item.term)}
            >
              {item.term}
            </Button>
          ))}
        </div>
      </div>

      {/* Definitions */}
      <div>
        <h4 className="font-medium text-sm text-gray-700 mb-3">Definitions:</h4>
        <div className="grid grid-cols-1 gap-2">
          {shuffledDefinitions.map(definition => (
            <Button
              key={definition}
              variant={selectedDefinition === definition ? "default" : "outline"}
              className={`h-auto p-3 text-left justify-start ${
                isDefinitionMatched(definition) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleDefinitionClick(definition)}
              disabled={disabled || isDefinitionMatched(definition)}
            >
              {definition}
            </Button>
          ))}
        </div>
      </div>

      {/* Create Match Button */}
      {selectedTerm && selectedDefinition && (
        <div className="text-center">
          <Button onClick={createMatch} className="bg-blue-600 hover:bg-blue-700">
            Match "{selectedTerm}" with this definition
          </Button>
        </div>
      )}
    </div>
  );
} 