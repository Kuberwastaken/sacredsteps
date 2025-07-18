'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import type { ImageAssocExercise } from '~/types';

interface ImageAssocExerciseProps {
  exercise: ImageAssocExercise;
  userAnswer: string | null;
  onAnswerChange: (answer: string) => void;
  disabled: boolean;
}

export function ImageAssocExercise({ exercise, userAnswer, onAnswerChange, disabled }: ImageAssocExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (userAnswer) {
      setSelectedOption(userAnswer);
    }
  }, [userAnswer]);

  useEffect(() => {
    const generateExerciseImage = async () => {
      if (exercise.data.imageUrl) {
        setImageUrl(exercise.data.imageUrl);
        return;
      }

      if (exercise.data.imagePrompt) {
        try {
          setImageLoading(true);
          setImageError(false);
          const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: exercise.data.imagePrompt
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to generate image');
          }

          const data = await response.json();
          if (data.success && data.data) {
            setImageUrl(data.data.imageDataUri);
          } else {
            throw new Error(data.error || 'Unknown error');
          }
        } catch (error) {
          console.error('Failed to generate image:', error);
          setImageError(true);
        } finally {
          setImageLoading(false);
        }
      }
    };

    generateExerciseImage();
  }, [exercise.data.imagePrompt, exercise.data.imageUrl]);

  const handleOptionSelect = (option: string) => {
    if (disabled) return;
    setSelectedOption(option);
    onAnswerChange(option);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">{exercise.prompt}</h3>
        <p className="text-sm text-gray-600">Select the correct answer for the image shown</p>
      </div>

      {/* Image Display */}
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            {imageLoading && (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Generating image...</span>
              </div>
            )}

            {imageError && (
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Image could not be generated</p>
                  <p className="text-sm text-gray-400">{exercise.data.imagePrompt}</p>
                </div>
              </div>
            )}

            {imageUrl && !imageLoading && !imageError && (
              <div className="flex justify-center">
                <img 
                  src={imageUrl} 
                  alt="Exercise image" 
                  className="max-w-full max-h-48 object-contain rounded-lg"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            {!imageUrl && !imageLoading && !imageError && (
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700 text-center">What do you see in the image?</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exercise.data.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? "default" : "outline"}
              className="h-auto p-4 text-left justify-center"
              onClick={() => handleOptionSelect(option)}
              disabled={disabled}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Selected Answer Display */}
      {selectedOption && (
        <div className="text-center">
          <Card className="inline-block">
            <CardContent className="p-3">
              <span className="text-sm text-gray-600">Selected: </span>
              <span className="font-medium">{selectedOption}</span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 