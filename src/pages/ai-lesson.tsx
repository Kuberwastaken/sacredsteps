import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { CloseSvg, LessonTopBarHeart, LessonTopBarEmptyHeart } from "~/components/Svgs";
import Link from "next/link";

interface LessonExercise {
  id: string;
  type: 'SELECT_1_OF_3' | 'WRITE_IN_ENGLISH' | 'MATCH_PAIRS' | 'ARRANGE_ORDER' | 'TRUE_FALSE';
  question: string;
  instruction?: string;
  correctAnswer: number | string | number[];
  options?: Array<{
    text: string;
    visual?: string;
    explanation?: string;
  }>;
  answerTiles?: string[];
  explanation: string;
  culturalContext?: string;
}

const AILessonPage: NextPage = () => {
  const router = useRouter();
  const { religion, topic, difficulty } = router.query;
  
  const [exercises, setExercises] = useState<LessonExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessonComplete, setLessonComplete] = useState(false);

  const increaseXp = useBoundStore((x) => x.increaseXp);
  const increaseLingots = useBoundStore((x) => x.increaseLingots);
  const increaseLessonsCompleted = useBoundStore((x) => x.increaseLessonsCompleted);

  useEffect(() => {
    const loadLessonContent = async () => {
      if (!religion || !topic) return;

      try {
        setLoading(true);
        const response = await fetch('/api/generate-lesson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            religion: Array.isArray(religion) ? religion[0] : religion,
            topic: Array.isArray(topic) ? topic[0] : topic,
            difficulty: (Array.isArray(difficulty) ? difficulty[0] : difficulty) as 'beginner' | 'intermediate' | 'advanced' || 'beginner',
            lessonType: 'vocabulary',
            exerciseCount: 5
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to load lesson content');
        }

        const data = await response.json();
        if (data.success && data.lesson) {
          setExercises(data.lesson.exercises as LessonExercise[]);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Failed to load lesson content:', err);
        setError('Failed to load lesson content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadLessonContent();
  }, [religion, topic, difficulty]);

  const currentExercise = exercises[currentExerciseIndex];
  const totalExercises = exercises.length;
  const hearts = 3 - incorrectAnswerCount;

  const isAnswerCorrect = () => {
    if (!currentExercise) return false;
    
    switch (currentExercise.type) {
      case 'SELECT_1_OF_3':
        return selectedAnswer === currentExercise.correctAnswer;
      case 'WRITE_IN_ENGLISH':
        return JSON.stringify(selectedAnswers) === JSON.stringify(currentExercise.correctAnswer);
      case 'TRUE_FALSE':
        return selectedAnswer === currentExercise.correctAnswer;
      default:
        return false;
    }
  };

  const handleAnswerCheck = () => {
    setCorrectAnswerShown(true);
    
    if (isAnswerCorrect()) {
      setCorrectAnswerCount(prev => prev + 1);
    } else {
      setIncorrectAnswerCount(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentExerciseIndex >= totalExercises - 1) {
        // Lesson complete
        setLessonComplete(true);
        const xpGained = correctAnswerCount * 10;
        const lingotsGained = correctAnswerCount === totalExercises ? 3 : correctAnswerCount > totalExercises / 2 ? 2 : 1;
        increaseXp(xpGained);
        increaseLingots(lingotsGained);
        increaseLessonsCompleted(1);
      } else {
        // Next exercise
        setCurrentExerciseIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setSelectedAnswers([]);
        setCorrectAnswerShown(false);
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating personalized lesson content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/learn" className="text-blue-500 hover:text-blue-600 underline">
            Return to lessons
          </Link>
        </div>
      </div>
    );
  }

  if (lessonComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-400 to-green-600">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lesson Complete!</h2>
          <p className="text-gray-600 mb-6">
            You got {correctAnswerCount} out of {totalExercises} questions correct!
          </p>
          <Link
            href="/learn"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Learning
          </Link>
        </div>
      </div>
    );
  }

  if (hearts <= 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-red-400 to-red-600">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">💔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Out of Hearts!</h2>
          <p className="text-gray-600 mb-6">
            Don't worry! You can try again or practice more.
          </p>
          <Link
            href="/learn"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      {/* Progress Bar */}
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <header className="flex items-center gap-4">
            <Link href="/learn" className="text-gray-400">
              <CloseSvg />
            </Link>
            <div className="h-4 grow rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-700"
                style={{ width: `${(currentExerciseIndex / totalExercises) * 100}%` }}
              />
            </div>
            {[1, 2, 3].map((heart) => (
              heart <= hearts ? <LessonTopBarHeart key={heart} /> : <LessonTopBarEmptyHeart key={heart} />
            ))}
          </header>
        </div>

        {/* Exercise Content */}
        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24 sm:px-5">
          <h1 className="self-start text-2xl font-bold sm:text-3xl">
            {currentExercise?.question}
          </h1>

          {currentExercise?.instruction && (
            <p className="text-gray-600 text-sm italic">
              {currentExercise.instruction}
            </p>
          )}

          {/* Exercise-specific content */}
          {currentExercise?.type === 'SELECT_1_OF_3' && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {currentExercise.options?.map((option, i) => (
                <div
                  key={i}
                  className={`cursor-pointer rounded-xl border-2 border-b-4 p-4 ${
                    i === selectedAnswer
                      ? "border-blue-300 bg-blue-100 text-blue-400"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedAnswer(i)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{option.visual || "📖"}</div>
                    <h2 className="font-bold">{option.text}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentExercise?.type === 'TRUE_FALSE' && (
            <div className="flex gap-4 justify-center">
              {['true', 'false'].map((option) => (
                <button
                  key={option}
                  className={`px-8 py-4 rounded-xl border-2 border-b-4 font-bold uppercase ${
                    selectedAnswer === option
                      ? "border-blue-300 bg-blue-100 text-blue-400"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentExercise?.type === 'WRITE_IN_ENGLISH' && (
            <div className="w-full">
              <div className="min-h-[100px] rounded-xl border-2 border-b-4 border-gray-200 p-4 mb-4">
                <div className="flex flex-wrap gap-2">
                  {selectedAnswers.map((i) => (
                    <button
                      key={i}
                      className="rounded-2xl border-2 border-b-4 border-gray-200 p-2 text-gray-700"
                      onClick={() => setSelectedAnswers(prev => prev.filter(x => x !== i))}
                    >
                      {currentExercise.answerTiles?.[i]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {currentExercise.answerTiles?.map((tile, i) => (
                  <button
                    key={i}
                    className={`rounded-2xl border-2 border-b-4 p-2 ${
                      selectedAnswers.includes(i)
                        ? "border-gray-200 bg-gray-200 text-gray-200"
                        : "border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                    disabled={selectedAnswers.includes(i)}
                    onClick={() => setSelectedAnswers(prev => [...prev, i])}
                  >
                    {tile}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Check Answer Button */}
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl justify-center">
          <button
            onClick={handleAnswerCheck}
            disabled={selectedAnswer === null && selectedAnswers.length === 0}
            className={`grow rounded-2xl p-3 font-bold uppercase transition sm:min-w-[150px] sm:max-w-fit sm:grow-0 ${
              selectedAnswer === null && selectedAnswers.length === 0
                ? "bg-gray-200 text-gray-400"
                : "border-b-4 border-green-600 bg-green-500 text-white hover:brightness-105"
            }`}
          >
            Check
          </button>
        </div>
      </section>

      {/* Feedback */}
      <div className={`fixed ${correctAnswerShown ? 'bottom-0' : '-bottom-52'} left-0 right-0 transition-all ${
        correctAnswerShown 
          ? isAnswerCorrect() 
            ? "bg-lime-100 text-green-600" 
            : "bg-red-100 text-red-500"
          : ""
      }`}>
        <div className="mx-auto flex max-w-5xl justify-between p-4">
          <div>
            <div className="mb-2 text-2xl font-bold">
              {isAnswerCorrect() ? "Correct!" : "Incorrect"}
            </div>
            <div className="text-sm">
              {currentExercise?.explanation}
            </div>
            {currentExercise?.culturalContext && (
              <div className="text-xs mt-2 opacity-75">
                Cultural context: {currentExercise.culturalContext}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILessonPage;
