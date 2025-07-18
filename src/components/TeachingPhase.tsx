import { useState } from 'react';
import { ConceptCard, TeachingPhase } from '~/types';

interface TeachingPhaseComponentProps {
  teachingPhase: TeachingPhase;
  onComplete: () => void;
  currentStep: number;
  totalSteps: number;
}

const ConceptCardComponent = ({ concept, onNext }: { concept: ConceptCard; onNext: () => void }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentKeyPoint, setCurrentKeyPoint] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Interactive quiz question about the concept
  const conceptQuiz = {
    question: `What is the main purpose of understanding this concept?`,
    options: [
      'To provide spiritual guidance and understanding',
      'To gain material wealth',
      'To show off to others'
    ],
    correctAnswer: 0,
    explanation: `This concept is primarily about spiritual growth and understanding, helping believers deepen their connection with their faith.`
  };

  const handleNextKeyPoint = () => {
    if (currentKeyPoint < concept.keyPoints.length - 1) {
      setCurrentKeyPoint(currentKeyPoint + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setQuizAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const handleQuizComplete = () => {
    setShowDetails(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-2xl space-glass p-8 rounded-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{concept.title}</h1>
          <p className="text-white/80 text-lg">{concept.description}</p>
        </div>

        {/* Visual Description */}
        {concept.visualDescription && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
            <p className="text-white/90 text-center italic">{concept.visualDescription}</p>
          </div>
        )}

        {/* Interactive Key Points Display */}
        {!showQuiz && !showDetails && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Key Points:</h3>
            <div className="space-y-3">
              {concept.keyPoints.map((point, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    index <= currentKeyPoint ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index <= currentKeyPoint ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <p className="text-white/90">{point}</p>
                </div>
              ))}
            </div>
            
            {/* Continue Button */}
            <div className="text-center mt-6">
              <button
                onClick={handleNextKeyPoint}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {currentKeyPoint < concept.keyPoints.length - 1 ? 'Next Point' : 'Test Your Understanding'}
              </button>
            </div>
          </div>
        )}

        {/* Interactive Quiz */}
        {showQuiz && !showDetails && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Check:</h3>
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
              <p className="text-white/90 text-lg mb-4">{conceptQuiz.question}</p>
              
              <div className="space-y-3">
                {conceptQuiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={quizAnswer !== null}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      quizAnswer === null 
                        ? 'bg-white/10 hover:bg-white/20 text-white' 
                        : quizAnswer === index
                          ? index === conceptQuiz.correctAnswer
                            ? 'bg-green-500/30 text-green-100 border-2 border-green-400'
                            : 'bg-red-500/30 text-red-100 border-2 border-red-400'
                          : index === conceptQuiz.correctAnswer
                            ? 'bg-green-500/30 text-green-100 border-2 border-green-400'
                            : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showQuizResult && (
                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                  <p className="text-white/90 mb-4">
                    <strong>{quizAnswer === conceptQuiz.correctAnswer ? '✓ Correct!' : '✗ Not quite right.'}</strong>
                  </p>
                  <p className="text-white/80">{conceptQuiz.explanation}</p>
                  
                  <div className="text-center mt-4">
                    <button
                      onClick={handleQuizComplete}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Detailed Information (after quiz) */}
        {showDetails && (
          <div className="space-y-6">
            {/* Example */}
            {concept.example && (
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
                <h4 className="text-lg font-semibold text-white mb-3">Example:</h4>
                <p className="text-white/90">{concept.example}</p>
              </div>
            )}

            {/* Related Terms */}
            {concept.relatedTerms && concept.relatedTerms.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Related Terms:</h4>
                <div className="space-y-3">
                  {concept.relatedTerms.map((term, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <strong className="text-white">{term.term}:</strong>
                      <p className="text-white/80 mt-1">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Continue Button */}
            <div className="text-center">
              <button
                onClick={onNext}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TeachingIntroduction = ({ 
  introduction, 
  learningObjectives, 
  onNext 
}: { 
  introduction: string;
  learningObjectives: string[];
  onNext: () => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-2xl space-glass p-8 rounded-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Let's Learn Together!</h1>
          <p className="text-white/80 text-lg">{introduction}</p>
        </div>

        {/* Learning Objectives */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn:</h3>
          <div className="space-y-3">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-white/90">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={onNext}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export const TeachingPhaseComponent = ({ 
  teachingPhase, 
  onComplete, 
  currentStep, 
  totalSteps 
}: TeachingPhaseComponentProps) => {
  const [currentConceptIndex, setCurrentConceptIndex] = useState(-1); // -1 for intro

  const handleNext = () => {
    if (currentConceptIndex < teachingPhase.concepts.length - 1) {
      setCurrentConceptIndex(currentConceptIndex + 1);
    } else {
      onComplete();
    }
  };

  // Progress bar
  const progress = ((currentConceptIndex + 2) / (teachingPhase.concepts.length + 1)) * 100;

  return (
    <div className="relative min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 bg-gray-700 rounded-full h-2 mr-4">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white text-sm font-semibold">
            Teaching: {currentConceptIndex + 2} of {teachingPhase.concepts.length + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16">
        {currentConceptIndex === -1 ? (
          <TeachingIntroduction 
            introduction={teachingPhase.introduction}
            learningObjectives={teachingPhase.learningObjectives}
            onNext={handleNext}
          />
        ) : (
          teachingPhase.concepts[currentConceptIndex] && (
            <ConceptCardComponent 
              concept={teachingPhase.concepts[currentConceptIndex]}
              onNext={handleNext}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TeachingPhaseComponent;
