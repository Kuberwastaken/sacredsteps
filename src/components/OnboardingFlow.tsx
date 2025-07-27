import React, { useState } from 'react';
import { useBoundStore } from '~/hooks/useBoundStore';
import { useRouter } from 'next/router';
import { religions } from '~/utils/religions';

interface OnboardingFlowProps {
  onComplete: () => void;
  onStartLesson: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onStartLesson }) => {
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
    } else if (currentStep === 5) {
      // Move to 2-minute lesson screen
      setCurrentStep(6);
    } else {
      // On 2-minute lesson screen, redirect to actual lesson
      startFirstLesson();
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

  const startFirstLesson = () => {
    // Set user preferences first
    const selectedReligionData = religions.find(r => r.name === selectedReligion);
    if (selectedReligionData) {
      setReligion(selectedReligionData);
    }
    setName('Sacred Learner');
    
    // Complete onboarding and start lesson
    onComplete();
    onStartLesson();
  };

  const getProgressWidth = () => {
    return ((currentStep + 1) / 7) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Progress bar */}
      <div className="w-full bg-black/20 backdrop-blur-sm h-3 relative">
        <div 
          className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-3 transition-all duration-700 ease-out relative shadow-lg"
          style={{ width: `${getProgressWidth()}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
        </div>
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

      {/* Content - flexible to fill remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24">{/* Added pb-24 for button space */}
        
        {/* Step 0: Welcome Screen */}
        {currentStep === 0 && (
          <div className="text-center max-w-md relative z-10">
            <div className="mb-8">
              <div className="w-36 h-36 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-float relative">
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="text-7xl relative z-10">🧙‍♂️</span>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-lg animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 backdrop-blur-xl rounded-2xl p-6 relative mb-8 border border-white/20 shadow-2xl">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-800 to-purple-800 rotate-45 border-r border-b border-white/20"></div>
                <p className="text-xl text-white font-medium">Hi there! I'm your Sacred Steps guide!</p>
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Religion Selection */}
        {currentStep === 1 && (
          <div className="text-center max-w-md w-full relative z-10">
            <div className="mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-float relative">
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="text-5xl relative z-10">🧙‍♂️</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 backdrop-blur-xl rounded-2xl p-5 relative border border-white/20 shadow-xl">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-800 to-purple-800 rotate-45 border-r border-b border-white/20"></div>
                <p className="text-lg text-white font-medium">What would you like to learn?</p>
              </div>
            </div>
            <div className="space-y-3">
              {religionOptions.map((religion) => (
                <button
                  key={religion.id}
                  onClick={() => setSelectedReligion(religion.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedReligion === religion.id
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm'
                      : 'border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <span className="text-xl">{religion.flag}</span>
                    </div>
                    <span className="text-left font-medium text-white">{religion.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Knowledge Assessment */}
        {currentStep === 2 && (
          <div className="text-center max-w-md w-full relative z-10">
            <div className="mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-float relative">
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="text-5xl relative z-10">🧙‍♂️</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 backdrop-blur-xl rounded-2xl p-5 relative border border-white/20 shadow-xl">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-800 to-purple-800 rotate-45 border-r border-b border-white/20"></div>
                <p className="text-lg text-white font-medium">How much about religion do you know?</p>
              </div>
            </div>
            <div className="space-y-3">
              {knowledgeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedKnowledge(option.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedKnowledge === option.id
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm'
                      : 'border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-6 rounded transition-all duration-300 ${
                            i < option.bars 
                              ? 'bg-gradient-to-t from-cyan-500 to-blue-400 shadow-sm' 
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-left text-white font-medium">{option.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Learning Routine */}
        {currentStep === 3 && (
          <div className="text-center max-w-md w-full relative z-10">
            <div className="mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-float relative">
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="text-5xl relative z-10">🧙‍♂️</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 backdrop-blur-xl rounded-2xl p-5 relative border border-white/20 shadow-xl">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-800 to-purple-800 rotate-45 border-r border-b border-white/20"></div>
                <p className="text-lg text-white font-medium">What's your daily learning goal?</p>
              </div>
            </div>
            <div className="space-y-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedGoal === goal.id
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm'
                      : 'border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <h3 className="font-bold text-white">{goal.title}</h3>
                      <p className="text-sm text-white/70">{goal.description}</p>
                    </div>
                    <span className="text-lg font-bold text-orange-400">{goal.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Benefits */}
        {currentStep === 4 && (
          <div className="text-center max-w-md relative z-10">
            <div className="mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-float relative">
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="text-5xl relative z-10">🧙‍♂️</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 backdrop-blur-xl rounded-2xl p-5 relative border border-white/20 shadow-xl">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-800 to-purple-800 rotate-45 border-r border-b border-white/20"></div>
                <p className="text-lg text-white font-medium">Here's what you can achieve in 3 months!</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-white">Understand with confidence</h3>
                  <p className="text-white/70">Stress-free reading and listening exercises</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📖</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-white">Build up your knowledge</h3>
                  <p className="text-white/70">Core concepts and practical wisdom</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⏰</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-white">Develop a learning habit</h3>
                  <p className="text-white/70">Smart reminders, fun challenges, and more</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Final Message */}
        {currentStep === 5 && (
          <div className="text-center max-w-md relative z-10">
            <div className="mb-8">
              <div className="w-36 h-36 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-float relative">
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="text-7xl relative z-10">🧙‍♂️</span>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-lg animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 backdrop-blur-xl rounded-2xl p-6 relative mb-8 border border-white/20 shadow-2xl">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-800 to-purple-800 rotate-45 border-r border-b border-white/20"></div>
                <p className="text-xl text-white font-medium">Okay, we'll build on what you know!</p>
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">sacredsteps</h1>
              <p className="text-white/80 text-lg">
                The free, fun, and effective way to learn about religion!
              </p>
            </div>
          </div>
        )}

        {/* Step 6: 2-Minute Lesson */}
        {currentStep === 6 && (
          <div className="text-center max-w-md relative z-10">
            <div className="mb-8">
              <div className="w-36 h-36 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-float relative">
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                <span className="text-7xl relative z-10">🧙‍♂️</span>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-lg animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-800/90 to-purple-800/90 backdrop-blur-xl rounded-2xl p-6 relative mb-8 border border-white/20 shadow-2xl">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-800 to-purple-800 rotate-45 border-r border-b border-white/20"></div>
                <p className="text-xl text-white font-medium">Okay! Here's your first <span className="text-purple-400 font-bold">2 minute</span> lesson.</p>
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Continue Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedReligion) ||
              (currentStep === 2 && !selectedKnowledge) ||
              (currentStep === 3 && !selectedGoal)
            }
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              (currentStep === 1 && !selectedReligion) ||
              (currentStep === 2 && !selectedKnowledge) ||
              (currentStep === 3 && !selectedGoal)
                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed backdrop-blur-sm border border-gray-500/50'
                : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-lg border border-cyan-400/50'
            }`}
          >
            {currentStep === 3 && selectedGoal ? "I'M COMMITTED" : 
             currentStep === 5 ? "GET STARTED" : 
             currentStep === 6 ? "CONTINUE" : "CONTINUE"}
          </button>
          
          {currentStep === 5 && (
            <button
              onClick={() => router.push('/login')}
              className="w-full py-4 mt-4 rounded-xl border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-bold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              I ALREADY HAVE AN ACCOUNT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
