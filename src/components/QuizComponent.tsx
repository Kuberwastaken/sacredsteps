import { useState, useEffect } from "react";
import type { QuizQuestion } from "~/pages/api/generate-quiz";

type QuizComponentProps = {
  religion: string;
  topic: string;
  onComplete: (score: number, total: number) => void;
};

export const QuizComponent = ({ religion, topic, onComplete }: QuizComponentProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | number)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      if (isLastQuestion) {
        // Calculate score and complete quiz
        const score = newUserAnswers.reduce((acc: number, answer, index) => {
          return acc + (answer === questions[index]?.correctAnswer ? 1 : 0);
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 ml-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {currentQuestion.question}
        </h2>
      </div>

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
  );
};
