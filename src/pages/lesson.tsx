import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useBoundStore } from "~/hooks/useBoundStore";

import { CloseSvg } from "~/components/Svgs";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";

type SimpleExercise = {
  type: 'multiple-choice' | 'true-false';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const Lesson: NextPage = () => {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exercises, setExercises] = useState<SimpleExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
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
              type: 'multiple-choice',
              question: 'Which day is traditionally observed as the Christian Sabbath?',
              options: ['Friday', 'Saturday', 'Sunday', 'Monday'],
              correctAnswer: 2,
              explanation: 'Sunday is traditionally observed as the Christian Sabbath, commemorating the resurrection of Jesus.'
            },
            {
              type: 'multiple-choice',
              question: 'What are the three persons of the Christian Trinity?',
              options: ['Father, Son, Holy Spirit', 'Jesus, Mary, Joseph', 'God, Angels, Saints', 'Creator, Redeemer, Sanctifier'],
              correctAnswer: 0,
              explanation: 'The Trinity consists of the Father, Son (Jesus Christ), and Holy Spirit as three persons in one God.'
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
              type: 'multiple-choice',
              question: 'What is the Islamic pilgrimage to Mecca called?',
              options: ['Jihad', 'Hajj', 'Ramadan', 'Zakat'],
              correctAnswer: 1,
              explanation: 'Hajj is the annual Islamic pilgrimage to Mecca, which every Muslim must undertake at least once if able.'
            },
            {
              type: 'multiple-choice',
              question: 'Who is considered the final prophet in Islam?',
              options: ['Jesus', 'Moses', 'Muhammad', 'Abraham'],
              correctAnswer: 2,
              explanation: 'Prophet Muhammad is considered the final messenger and prophet in Islam.'
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
              type: 'multiple-choice',
              question: 'What is the Jewish coming-of-age ceremony called?',
              options: ['Confirmation', 'Bar/Bat Mitzvah', 'Baptism', 'First Communion'],
              correctAnswer: 1,
              explanation: 'Bar Mitzvah (for boys) and Bat Mitzvah (for girls) mark the coming of age in Jewish tradition.'
            },
            {
              type: 'multiple-choice',
              question: 'Which holiday commemorates the Jewish exodus from Egypt?',
              options: ['Yom Kippur', 'Rosh Hashanah', 'Passover', 'Hanukkah'],
              correctAnswer: 2,
              explanation: 'Passover commemorates the liberation of the Israelites from slavery in Egypt.'
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
              type: 'multiple-choice',
              question: 'What is the Hindu concept of duty and righteousness called?',
              options: ['Karma', 'Dharma', 'Moksha', 'Samsara'],
              correctAnswer: 1,
              explanation: 'Dharma refers to the moral and ethical duties and righteousness in Hindu philosophy.'
            },
            {
              type: 'multiple-choice',
              question: 'Which river is considered most sacred in Hinduism?',
              options: ['Yamuna', 'Godavari', 'Ganges', 'Narmada'],
              correctAnswer: 2,
              explanation: 'The Ganges (Ganga) is considered the most sacred river in Hinduism.'
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
              type: 'multiple-choice',
              question: 'What is the Buddhist path to enlightenment called?',
              options: ['Four Noble Truths', 'Eightfold Path', 'Middle Way', 'Nirvana'],
              correctAnswer: 1,
              explanation: 'The Noble Eightfold Path is the Buddhist guide to ethical and spiritual development leading to enlightenment.'
            },
            {
              type: 'multiple-choice',
              question: 'What is the ultimate goal in Buddhism?',
              options: ['Heaven', 'Nirvana', 'Moksha', 'Paradise'],
              correctAnswer: 1,
              explanation: 'Nirvana is the ultimate goal in Buddhism, representing liberation from suffering and the cycle of rebirth.'
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
              {exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    showResult
                      ? index === exercise.correctAnswer
                        ? 'bg-green-500/30 border-green-500 text-white border-2'
                        : index === selectedAnswer && index !== exercise.correctAnswer
                        ? 'bg-red-500/30 border-red-500 text-white border-2'
                        : 'bg-white/10 border border-white/20 text-white/70'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                      showResult
                        ? index === exercise.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : index === selectedAnswer && index !== exercise.correctAnswer
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-white/30 text-white/50'
                        : 'border-white/50 text-white/70'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
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
