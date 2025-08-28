import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useBoundStore } from "~/hooks/useBoundStore";

import { CloseSvg } from "~/components/Svgs";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { MatchPairsExercise } from "~/components/exercises/match-pairs-exercise";

type SimpleExercise = {
  type: 'multiple-choice' | 'true-false' | 'fill-in-the-blank' | 'match-pairs';
  question: string;
  options?: string[];
  answerTiles?: string[];
  pairs?: { term: string; definition: string }[];
  correctAnswer: number | number[];
  explanation: string;
  shuffledDefinitions?: string[]; // Added for shuffling
};

// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Lesson: NextPage = () => {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exercises, setExercises] = useState<SimpleExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [fillInAnswers, setFillInAnswers] = useState<string[]>([]);
  
  const religion = useBoundStore((x) => x.religion);
  const hearts = useBoundStore((x) => x.hearts);
  const loseHeart = useBoundStore((x) => x.loseHeart);

  // Generate lesson content - using hardcoded exercises for now
  useEffect(() => {
    console.log('Lesson page - religion:', religion);
    if (!religion?.name) {
      console.log('No religion selected, redirecting to learn page');
      router.push('/learn'); // Redirect to learn if no religion selected
      return;
    }
    
    console.log('Generating lesson content for:', religion.name);
    const generateLessonContent = () => {
      setIsLoading(true);
      
      // Create exercises based on the selected religion
      const exercises: SimpleExercise[] = [];
      
      switch (religion.name) {
        case 'Christianity':
          exercises.push(
            {
              type: 'multiple-choice',
              question: 'What is the primary holy book of Christianity?',
              options: ['Bible', 'Quran', 'Torah', 'Vedas'],
              correctAnswer: 0,
              explanation: 'The Bible is the central religious text of Christianity, containing the Old and New Testaments.'
            },
            {
              type: 'true-false',
              question: 'Jesus Christ is considered the founder of Christianity.',
              options: ['True', 'False'],
              correctAnswer: 0,
              explanation: 'Jesus Christ is indeed considered the founder and central figure of Christianity.'
            },
            {
              type: 'fill-in-the-blank',
              question: 'Complete the famous Christian teaching: "Blessed are the meek, for they shall inherit the _____."',
              answerTiles: ['earth'],
              correctAnswer: [0],
              explanation: 'This is from the Beatitudes in the Sermon on the Mount, teaching about humility and gentleness.'
            },
            {
              type: 'fill-in-the-blank',
              question: 'Complete the Christian prayer: "Our _____ who art in heaven."',
              answerTiles: ['Father'],
              correctAnswer: 'Father',
              explanation: 'This is the beginning of the Lord\'s Prayer, taught by Jesus to his disciples.'
            },
            {
              type: 'match-pairs',
              question: 'Match the Christian concepts with their correct definitions.',
              pairs: [
                { term: 'Trinity', definition: 'The Christian doctrine of God as three persons: Father, Son, and Holy Spirit' },
                { term: 'Resurrection', definition: 'Jesus rising from the dead on the third day after crucifixion' },
                { term: 'Communion', definition: 'Christian sacrament commemorating Jesus\' Last Supper with bread and wine' },
                { term: 'Gospel', definition: 'The teachings of Jesus and the New Testament books about his life' },
                { term: 'Salvation', definition: 'Deliverance from sin and its consequences through Jesus Christ' }
              ],
              correctAnswer: 5,
              explanation: 'These are fundamental concepts in Christian theology and practice.'
            }
          );
          break;
          
        case 'Islam':
          exercises.push(
            {
              type: 'multiple-choice',
              question: 'What is the holy book of Islam?',
              options: ['Bible', 'Quran', 'Torah', 'Vedas'],
              correctAnswer: 1,
              explanation: 'The Quran is the central religious text of Islam, believed to be the word of Allah revealed to Prophet Muhammad.'
            },
            {
              type: 'true-false',
              question: 'Muslims pray five times a day.',
              options: ['True', 'False'],
              correctAnswer: 0,
              explanation: 'Muslims perform five daily prayers (Salah) as one of the Five Pillars of Islam.'
            },
            {
              type: 'fill-in-the-blank',
              question: 'Complete the Islamic greeting: "As-salamu _____."',
              answerTiles: ['alaykum'],
              correctAnswer: [0],
              explanation: '"As-salamu alaykum" means "Peace be upon you" and is a common Islamic greeting.'
            },
            {
              type: 'fill-in-the-blank',
              question: 'Complete the Islamic phrase: "_____ is the messenger of Allah."',
              answerTiles: ['Muhammad'],
              correctAnswer: 'Muhammad',
              explanation: 'This is part of the Shahada, the Islamic declaration of faith.'
            },
            {
              type: 'match-pairs',
              question: 'Match the Islamic concepts with their correct definitions.',
              pairs: [
                { term: 'Shahada', definition: 'Islamic declaration of faith: "There is no god but Allah, Muhammad is his messenger"' },
                { term: 'Zakat', definition: 'Obligatory charity given to the poor and needy' },
                { term: 'Hajj', definition: 'Pilgrimage to Mecca that every Muslim must make at least once' },
                { term: 'Ramadan', definition: 'Holy month of fasting from dawn to sunset' },
                { term: 'Imam', definition: 'Islamic leader who leads prayers in a mosque' }
              ],
              correctAnswer: 5,
              explanation: 'These are key concepts in Islamic practice and belief.'
            }
          );
          break;
          
        case 'Judaism':
          exercises.push(
            {
              type: 'multiple-choice',
              question: 'What is the primary holy book of Judaism?',
              options: ['Bible', 'Quran', 'Torah', 'Vedas'],
              correctAnswer: 2,
              explanation: 'The Torah is the central religious text of Judaism, containing the Five Books of Moses.'
            },
            {
              type: 'true-false',
              question: 'The Sabbath in Judaism is observed from Friday evening to Saturday evening.',
              options: ['True', 'False'],
              correctAnswer: 0,
              explanation: 'The Jewish Sabbath (Shabbat) is observed from Friday evening to Saturday evening.'
            },
            {
              type: 'fill-in-the-blank',
              question: 'Complete the Jewish blessing: "Baruch atah Adonai, _____."',
              answerTiles: ['Eloheinu'],
              correctAnswer: 'Eloheinu',
              explanation: 'This is the beginning of many Jewish blessings, meaning "Blessed are You, Lord our God."'
            },
            {
              type: 'match-pairs',
              question: 'Match the Jewish concepts with their correct definitions.',
              pairs: [
                { term: 'Pharisees', definition: 'Jewish religious party emphasizing oral law and tradition' },
                { term: 'Sadducees', definition: 'Jewish priestly aristocracy associated with the Temple' },
                { term: 'Messiah', definition: 'Hebrew term meaning "anointed one," referring to an expected deliverer' },
                { term: 'Diaspora', definition: 'Jewish communities living outside of Palestine' },
                { term: 'Sanhedrin', definition: 'Jewish high court and governing body in Jerusalem' }
              ],
              correctAnswer: 5,
              explanation: 'These are key concepts in understanding Jewish history and tradition.'
            }
          );
          break;
          
        case 'Hinduism':
          exercises.push(
            {
              type: 'multiple-choice',
              question: 'What are the ancient sacred texts of Hinduism called?',
              options: ['Bible', 'Quran', 'Torah', 'Vedas'],
              correctAnswer: 3,
              explanation: 'The Vedas are the oldest sacred texts of Hinduism, containing hymns, rituals, and philosophical teachings.'
            },
            {
              type: 'true-false',
              question: 'Hindus believe in reincarnation.',
              options: ['True', 'False'],
              correctAnswer: 0,
              explanation: 'Reincarnation (samsara) is a central belief in Hinduism, where the soul is reborn after death.'
            },
            {
              type: 'fill-in-the-blank',
              question: 'Complete the Hindu greeting: "Namaste" means "I bow to the _____ in you."',
              answerTiles: ['divine'],
              correctAnswer: 'divine',
              explanation: 'Namaste recognizes the divine spark within each person, a fundamental Hindu concept.'
            },
            {
              type: 'match-pairs',
              question: 'Match the Hindu concepts with their correct definitions.',
              pairs: [
                { term: 'Karma', definition: 'The law of cause and effect where actions determine future consequences' },
                { term: 'Dharma', definition: 'Duty, righteousness, or moral order in Hindu life' },
                { term: 'Moksha', definition: 'Liberation from the cycle of rebirth and union with Brahman' },
                { term: 'Atman', definition: 'The eternal soul or true self in Hindu philosophy' },
                { term: 'Brahman', definition: 'The ultimate reality or supreme cosmic power' }
              ],
              correctAnswer: 5,
              explanation: 'These are fundamental concepts in Hindu philosophy and spirituality.'
            }
          );
          break;
          
        case 'Buddhism':
          exercises.push(
            {
              type: 'multiple-choice',
              question: 'Who founded Buddhism?',
              options: ['Jesus Christ', 'Muhammad', 'Siddhartha Gautama', 'Moses'],
              correctAnswer: 2,
              explanation: 'Buddhism was founded by Siddhartha Gautama, who became known as the Buddha.'
            },
            {
              type: 'true-false',
              question: 'The Four Noble Truths are central to Buddhist teaching.',
              options: ['True', 'False'],
              correctAnswer: 0,
              explanation: 'The Four Noble Truths are indeed the foundation of Buddhist philosophy and teaching.'
            },
            {
              type: 'fill-in-the-blank',
              question: 'Complete the Buddhist greeting: "Namo _____."',
              answerTiles: ['Buddhaya'],
              correctAnswer: 'Buddhaya',
              explanation: '"Namo Buddhaya" means "I bow to the Buddha" and is a common Buddhist greeting.'
            },
            {
              type: 'match-pairs',
              question: 'Match the Buddhist concepts with their correct definitions.',
              pairs: [
                { term: 'Nirvana', definition: 'The ultimate state of liberation from suffering and rebirth' },
                { term: 'Dharma', definition: 'The teachings of the Buddha and the path to enlightenment' },
                { term: 'Sangha', definition: 'The community of Buddhist monks, nuns, and practitioners' },
                { term: 'Eightfold Path', definition: 'The Buddha\'s guide to end suffering through right understanding and action' },
                { term: 'Meditation', definition: 'Mindfulness practice to develop awareness and achieve enlightenment' }
              ],
              correctAnswer: 5,
              explanation: 'These are core concepts in Buddhist philosophy and practice.'
            }
          );
          break;
          
        default:
          exercises.push({
            type: 'multiple-choice',
            question: 'What is the study of religion called?',
            options: ['Theology', 'Philosophy', 'Anthropology', 'Sociology'],
            correctAnswer: 0,
            explanation: 'Theology is the study of the nature of God and religious belief.'
          });
      }
      
      // Keep all exercises including match-pairs
      setExercises(exercises);
      setIsLoading(false);
    };

    // Add a small delay to show loading state
    setTimeout(generateLessonContent, 500);
  }, [religion.name]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const exercise = exercises[currentExercise];
    if (!exercise) return;
    
    const correct = answerIndex === exercise.correctAnswer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      loseHeart();
    }
  };

  const handleContinue = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      // Lesson complete - redirect to learn page
      router.push('/learn');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <TopBar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
            <p className="text-white text-lg">Preparing your lesson...</p>
          </div>
        </div>
        <BottomBar selectedTab={null} />
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <TopBar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4 bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md mx-4">
            <h1 className="text-2xl font-bold text-white">Lesson Unavailable</h1>
            <p className="text-white/80">
              We're having trouble loading your lesson content. Please try again later.
            </p>
            <Link 
              href="/learn"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              Return to Learn
            </Link>
          </div>
        </div>
        <BottomBar selectedTab={null} />
      </div>
    );
  }

  const exercise = exercises[currentExercise];
  if (!exercise) return null;
  
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <TopBar />
      
      {/* Progress Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 pt-[58px] md:pt-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            {/* Exit Button */}
            <Link 
              href="/learn" 
              className="text-white/70 hover:text-white transition-colors"
            >
              <CloseSvg />
            </Link>
            
            {/* Progress Bar */}
            <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Hearts */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 ${
                    i < hearts 
                      ? 'text-red-500' 
                      : 'text-white/30'
                  }`}
                >
                  ❤️
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            
            {/* Exercise Question */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {exercise.question}
              </h1>
              <p className="text-white/70">
                Question {currentExercise + 1} of {exercises.length}
              </p>
            </div>

            {/* Exercise Options */}
            <div className="mb-8 space-y-3">
              {exercise.type === 'multiple-choice' && exercise.options && exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    showResult
                      ? index === exercise.correctAnswer
                        ? 'bg-green-500/30 border-green-500 text-black border-2'
                        : index === selectedAnswer && index !== exercise.correctAnswer
                        ? 'bg-red-500/30 border-red-500 text-black border-2'
                        : 'bg-white/10 border border-white/20 text-black'
                      : 'bg-white/10 border border-white/20 text-black hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                      showResult
                        ? index === exercise.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : index === selectedAnswer && index !== exercise.correctAnswer
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-white/30 text-black'
                        : 'border-white/50 text-black'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
              
              {exercise.type === 'true-false' && exercise.options && exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    showResult
                      ? index === exercise.correctAnswer
                        ? 'bg-green-500/30 border-green-500 text-black border-2'
                        : index === selectedAnswer && index !== exercise.correctAnswer
                        ? 'bg-red-500/30 border-red-500 text-black border-2'
                        : 'bg-white/10 border border-white/20 text-black'
                      : 'bg-white/10 border border-white/20 text-black hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                      showResult
                        ? index === exercise.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : index === selectedAnswer && index !== exercise.correctAnswer
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-white/30 text-black'
                        : 'border-white/50 text-black'
                    }`}>
                      {option === 'true' ? 'T' : 'F'}
                    </div>
                    <span className="text-lg capitalize">{option}</span>
                  </div>
                </button>
              ))}
              
              {exercise.type === 'fill-in-the-blank' && exercise.answerTiles && (
                <div className="space-y-4">
                  {exercise.answerTiles.map((tile, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-white/50 text-white/70 flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={fillInAnswers[index] || ''}
                          onChange={(e) => {
                            const newAnswers = [...fillInAnswers];
                            newAnswers[index] = e.target.value;
                            setFillInAnswers(newAnswers);
                          }}
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={`Enter the missing word`}
                          disabled={showResult}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const userAnswer = fillInAnswers.join(' ').toLowerCase().trim();
                      const correctAnswer = exercise.correctAnswer.toString().toLowerCase().trim();
                      const isCorrect = userAnswer === correctAnswer;
                      
                      setIsCorrect(isCorrect);
                      setShowResult(true);
                      setSelectedAnswer(0);
                      
                      if (isCorrect) {
                        setCorrectCount(prev => prev + 1);
                      } else {
                        loseHeart();
                      }
                    }}
                    disabled={showResult}
                    className="w-full p-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                  >
                    Check Answer
                  </button>
                </div>
              )}
              
              {exercise.type === 'match-pairs' && exercise.pairs && (
                <MatchPairsExercise
                  pairs={exercise.pairs}
                  onAnswer={(isCorrect, answer) => {
                    setIsCorrect(isCorrect);
                    setShowResult(true);
                    if (!isCorrect) {
                      loseHeart();
                    }
                  }}
                  hearts={hearts}
                />
              )}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={`p-6 rounded-xl mb-6 ${
                isCorrect 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-2xl ${
                    isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                
                <p className="text-white/90 text-sm">
                  {exercise.explanation}
                </p>
              </div>
            )}

            {/* Continue Button */}
            {showResult && (
              <button
                onClick={handleContinue}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                  isCorrect
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {currentExercise < exercises.length - 1 ? 'Continue' : 'Complete Lesson'}
              </button>
            )}
          </div>
          </div>
        </div>
      </div>

      <BottomBar selectedTab={null} />
    </div>
  );
};

export default Lesson;
