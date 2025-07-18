import React, { useState } from 'react';
import { useBoundStore } from '~/hooks/useBoundStore';
import { useRouter } from 'next/router';
import { religions } from '~/utils/religions';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedKnowledge, setSelectedKnowledge] = useState<string>('');
  const [selectedReligion, setSelectedReligion] = useState<string>('');
  const setName = useBoundStore((x) => x.setName);
  const setReligion = useBoundStore((x) => x.setReligion);
  const router = useRouter();

  const goalOptions = [
    { id: 'casual', title: '3 min / day', subtitle: 'Casual', description: 'Light spiritual exploration' },
    { id: 'regular', title: '10 min / day', subtitle: 'Regular', description: 'Consistent learning' },
    { id: 'serious', title: '15 min / day', subtitle: 'Serious', description: 'Deep understanding' },
    { id: 'intense', title: '30 min / day', subtitle: 'Intense', description: 'Comprehensive study' },
  ];

  const knowledgeOptions = [
    { id: 'new', title: "I'm new to religious studies", bars: 1 },
    { id: 'some', title: "I know some basic concepts", bars: 2 },
    { id: 'conversations', title: "I can understand basic teachings", bars: 3 },
    { id: 'topics', title: "I can discuss various topics", bars: 4 },
    { id: 'detail', title: "I can discuss most topics in detail", bars: 5 },
  ];

  const religionOptions = [
    { id: 'Christianity', name: 'Christianity', flag: '✝️' },
    { id: 'Islam', name: 'Islam', flag: '☪️' },
    { id: 'Buddhism', name: 'Buddhism', flag: '☸️' },
    { id: 'Hinduism', name: 'Hinduism', flag: '🕉️' },
    { id: 'Judaism', name: 'Judaism', flag: '✡️' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    // Set user preferences
    const selectedReligionData = religions.find(r => r.name === selectedReligion);
    if (selectedReligionData) {
      setReligion(selectedReligionData);
    }
    setName('Sacred Learner');
    onComplete();
  };

  const getProgressWidth = () => {
    return ((currentStep + 1) / 6) * 100;
  };

  return (
    <div className="min-h-screen bg-[#1a2b4a] text-white flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-gray-600 h-2">
        <div 
          className="bg-green-500 h-2 transition-all duration-300"
          style={{ width: `${getProgressWidth()}%` }}
        />
      </div>

      {/* Back button */}
      <div className="p-4">
        <button 
          onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ←
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        
        {/* Step 0: Welcome Screen */}
        {currentStep === 0 && (
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-32 h-32 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center">
                <span className="text-6xl">🦉</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 relative mb-8">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rotate-45"></div>
                <p className="text-lg">Hi there! I'm your Sacred Steps guide!</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Religion Selection */}
        {currentStep === 1 && (
          <div className="text-center max-w-md w-full">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🦉</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 relative">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rotate-45"></div>
                <p className="text-lg">What would you like to learn?</p>
              </div>
            </div>
            <div className="space-y-3">
              {religionOptions.map((religion) => (
                <button
                  key={religion.id}
                  onClick={() => setSelectedReligion(religion.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedReligion === religion.id
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <span className="text-lg">{religion.flag}</span>
                    </div>
                    <span className="text-left font-medium">{religion.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Knowledge Assessment */}
        {currentStep === 2 && (
          <div className="text-center max-w-md w-full">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🦉</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 relative">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rotate-45"></div>
                <p className="text-lg">How much about religion do you know?</p>
              </div>
            </div>
            <div className="space-y-3">
              {knowledgeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedKnowledge(option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedKnowledge === option.id
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-6 rounded ${
                            i < option.bars ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-left">{option.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Learning Routine */}
        {currentStep === 3 && (
          <div className="text-center max-w-md w-full">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🦉</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 relative">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rotate-45"></div>
                <p className="text-lg">What's your daily learning goal?</p>
              </div>
            </div>
            <div className="space-y-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedGoal === goal.id
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <h3 className="font-bold">{goal.title}</h3>
                      <p className="text-sm text-gray-400">{goal.description}</p>
                    </div>
                    <span className="text-lg font-bold text-orange-500">{goal.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Benefits */}
        {currentStep === 4 && (
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🦉</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 relative">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rotate-45"></div>
                <p className="text-lg">Here's what you can achieve in 3 months!</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Understand with confidence</h3>
                  <p className="text-gray-400">Stress-free reading and listening exercises</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Build up your knowledge</h3>
                  <p className="text-gray-400">Core concepts and practical wisdom</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏰</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Develop a learning habit</h3>
                  <p className="text-gray-400">Smart reminders, fun challenges, and more</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Final Message */}
        {currentStep === 5 && (
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-32 h-32 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center">
                <span className="text-6xl">🦉</span>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 relative mb-8">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rotate-45"></div>
                <p className="text-lg">Okay, we'll build on what you know!</p>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-green-500 mb-2">sacredsteps</h1>
              <p className="text-gray-400 text-lg">
                The free, fun, and effective way to learn about religion!
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-8 w-full max-w-md">
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedReligion) ||
              (currentStep === 2 && !selectedKnowledge) ||
              (currentStep === 3 && !selectedGoal)
            }
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
              (currentStep === 1 && !selectedReligion) ||
              (currentStep === 2 && !selectedKnowledge) ||
              (currentStep === 3 && !selectedGoal)
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {currentStep === 3 && selectedGoal ? "I'M COMMITTED" : 
             currentStep === 5 ? "GET STARTED" : "CONTINUE"}
          </button>
          
          {currentStep === 5 && (
            <button
              onClick={() => router.push('/login')}
              className="w-full py-4 mt-4 rounded-lg border-2 border-green-500 text-green-500 hover:bg-green-500/10 font-bold text-lg transition-all"
            >
              I ALREADY HAVE AN ACCOUNT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
