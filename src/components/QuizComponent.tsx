import { useState, useEffect } from "react";
import type { QuizQuestion } from "~/pages/api/generate-quiz";
import { useBoundStore } from "~/hooks/useBoundStore";
import { LessonTopBarHeart, LessonTopBarEmptyHeart, CloseSvg } from "./Svgs";
import Link from "next/link";
import { MatchPairsExercise } from "./exercises/match-pairs-exercise";

type QuizComponentProps = {
  religion: string;
  topic: string;
  onComplete: (score: number, total: number) => void;
};

export const QuizComponent = ({ religion, topic, onComplete }: QuizComponentProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | { term: string; definition: string }[] | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | number | { term: string; definition: string }[])[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hearts system
  const hearts = useBoundStore((x) => x.hearts);
  const loseHeart = useBoundStore((x) => x.loseHeart);
  const resetHearts = useBoundStore((x) => x.resetHearts);

  // Load quiz questions
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            religion,
            topic,
            difficulty: "beginner",
            questionCount: 5
          })
        });

        const data = await response.json() as {
          success: boolean;
          questions?: QuizQuestion[];
          error?: string;
        };
        if (data.success && data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          setError(data.error || "AI quiz generation failed. Please try again later.");
        }
      } catch (err) {
        setError("Unable to connect to AI service. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    void loadQuiz();
  }, [religion, topic]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string | number | { term: string; definition: string }[]) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);
    
    // Check if answer is correct and lose heart if incorrect
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion?.type === "match_pairs") {
      // For match pairs, check if all pairs are correctly matched
      const userPairs = selectedAnswer as unknown as { term: string; definition: string }[] | null;
      const correctPairs = currentQuestion.pairs || [];
      
      if (!userPairs || !Array.isArray(userPairs)) {
        isCorrect = false;
      } else {
        isCorrect = userPairs.length === correctPairs.length && 
                    userPairs.every(userPair => 
                      correctPairs.some(correctPair => 
                        correctPair.term === userPair.term && 
                        correctPair.definition === userPair.definition
                      )
                    );
      }
    } else {
      // For other question types
      isCorrect = Boolean(currentQuestion && selectedAnswer === currentQuestion.correctAnswer);
    }
    
    if (!isCorrect) {
      loseHeart();
    }
    
    setShowFeedback(true);

    setTimeout(() => {
      if (isLastQuestion) {
        // Calculate score and complete quiz
        const score = newUserAnswers.reduce((acc: number, answer, index) => {
          const question = questions[index];
          if (!question) return acc;
          
          if (question.type === "match_pairs") {
            // For match pairs, check if all pairs are correctly matched
            const userPairs = answer as { term: string; definition: string }[];
            const correctPairs = question.pairs || [];
            const isCorrect = Array.isArray(userPairs) && 
              userPairs.length === correctPairs.length && 
              userPairs.every(userPair => 
                correctPairs.some(correctPair => 
                  correctPair.term === userPair.term && 
                  correctPair.definition === userPair.definition
                )
              );
            return acc + (isCorrect ? 1 : 0);
          } else {
            // For other question types
            return acc + (answer === question.correctAnswer ? 1 : 0);
          }
        }, 0);
        onComplete(score, questions.length);
      } else {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 2000);
  };

  // Game over if hearts reach 0
  if (hearts <= 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-glass p-8 rounded-lg max-w-md">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Out of Hearts!</h2>
          <p className="text-white/80 mb-6">
            You've run out of hearts. Take a break and try again later!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/learn" className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded">
              Back to Lessons
            </Link>
            <button 
              onClick={resetHearts}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Reset Hearts (Dev)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No questions available for this topic.</p>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-transparent">
      {/* Top Bar with Progress and Hearts */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Close Button */}
          <Link href="/learn" className="text-gray-400 hover:text-white">
            <CloseSvg />
            <span className="sr-only">Exit lesson</span>
          </Link>
          
          {/* Progress Bar */}
          <div
            className="h-4 grow rounded-full bg-gray-200/30"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={(currentQuestionIndex + 1) / questions.length}
          >
            <div
              className={
                "h-full rounded-full bg-green-500 transition-all duration-700 " +
                (currentQuestionIndex > 0 ? "px-2 pt-1 " : "")
              }
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            >
              <div className="h-[5px] w-full rounded-full bg-green-400"></div>
            </div>
          </div>
          
          {/* Hearts Display */}
          {[1, 2, 3, 4, 5].map((heart) => {
            if (heart <= hearts) {
              return <LessonTopBarHeart key={heart} />;
            }
            return <LessonTopBarEmptyHeart key={heart} />;
          })}
        </div>
      </div>

      {/* Question Content */}
      <div className="space-glass p-8 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-6">
          {currentQuestion.question}
        </h2>

      <div className="space-y-3 mb-6">
        {currentQuestion.type === "multiple_choice" && currentQuestion.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showFeedback}
            className={`w-full p-4 text-left rounded-lg border-2 transition-colors text-gray-800 ${
              selectedAnswer === index
                ? showFeedback
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
            } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {option}
          </button>
        ))}

        {currentQuestion.type === "true_false" && (
          <div className="flex space-x-4">
            {['true', 'false'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors capitalize text-gray-800 ${
                  selectedAnswer === option
                    ? showFeedback
                      ? isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === "match_pairs" && currentQuestion.pairs && (
          <div className="bg-white/10 rounded-lg p-4">
            {/* Study Material Table (from MatchPairsExercise) */}
            <div className="mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Term</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Definition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestion.pairs.map((item: any, idx: number) => (
                      <tr key={item.term} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-3 py-2 font-semibold text-gray-900 whitespace-nowrap">{item.term}</td>
                        <td className="px-3 py-2 text-gray-700">{item.definition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <MatchPairsExercise
              pairs={currentQuestion.pairs}
              onAnswer={(isCorrect, answer) => handleAnswerSelect(answer)}
              hearts={5}
            />
          </div>
        )}

        {currentQuestion.type === "fill_blank" && (
          <input
            type="text"
            value={selectedAnswer as string || ""}
            onChange={(e) => handleAnswerSelect(e.target.value)}
            disabled={showFeedback}
            placeholder="Type your answer here..."
            className={`w-full p-4 border-2 rounded-lg text-gray-800 ${
              showFeedback
                ? isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-200 bg-gray-50 focus:border-blue-500"
            }`}
          />
        )}
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <p className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          {currentQuestion.explanation && (
            <p className="text-sm text-gray-600 mt-2">{currentQuestion.explanation}</p>
          )}
          {!isCorrect && (
            <p className="text-sm text-gray-600 mt-2">
              Correct answer: {
                currentQuestion.type === "multiple_choice" 
                  ? currentQuestion.options?.[currentQuestion.correctAnswer as number]
                  : currentQuestion.correctAnswer
              }
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleSubmitAnswer}
        disabled={selectedAnswer === null || showFeedback}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          selectedAnswer === null || showFeedback
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {showFeedback ? "Loading next question..." : (isLastQuestion ? "Finish Quiz" : "Submit Answer")}
      </button>
      </div>
    </div>
  );
};
