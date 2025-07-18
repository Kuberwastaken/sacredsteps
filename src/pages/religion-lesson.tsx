import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { QuizComponent } from "~/components/QuizComponent";
import { religionUnits } from "~/utils/religion-units";
import Link from "next/link";
import {
  CloseSvg,
  LessonTopBarHeart,
  LessonTopBarEmptyHeart,
} from "~/components/Svgs";

const ReligionLesson: NextPage = () => {
  const router = useRouter();
  const { religion: religionParam, unit, lesson } = router.query;
  
  const religion = useBoundStore((x) => x.religion);
  const increaseLessonsCompleted = useBoundStore((x) => x.increaseLessonsCompleted);
  const increaseXp = useBoundStore((x) => x.increaseXp);
  const increaseLingots = useBoundStore((x) => x.increaseLingots);

  const [hearts] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  // Find the current unit and lesson data
  const religionParamStr = Array.isArray(religionParam) ? religionParam[0] : religionParam;
  const unitStr = Array.isArray(unit) ? unit[0] : unit;
  const lessonStr = Array.isArray(lesson) ? lesson[0] : lesson;

  const religionUnit = religionUnits.find(ru => 
    ru.religion.name.toLowerCase() === religionParamStr?.toLowerCase()
  );
  
  const currentUnit = religionUnit?.units.find(u => 
    u.unitNumber === parseInt(unitStr || "1")
  );

  const lessonIndex = parseInt(lessonStr || "0");
  const currentLesson = currentUnit?.tiles[lessonIndex];

  useEffect(() => {
    if (!religionUnit || !currentUnit || !currentLesson) {
      void router.push("/learn");
    }
  }, [religionUnit, currentUnit, currentLesson, router]);

  const handleQuizComplete = (score: number, total: number) => {
    setFinalScore({ score, total });
    setShowResult(true);
    
    // Award XP and lingots based on performance
    const xpGained = score * 10;
    const lingotsGained = score === total ? 2 : score > total / 2 ? 1 : 0;
    
    increaseXp(xpGained);
    increaseLingots(lingotsGained);
    increaseLessonsCompleted(1);
  };

  const handleContinue = () => {
    // Check if this was the last lesson in the unit
    if (currentUnit && lessonIndex >= currentUnit.tiles.length - 1) {
      // Go to next unit or back to learn page
      void router.push(`/${religionParamStr || ""}`);
    } else {
      // Go to next lesson
      void router.push(`/religion-lesson?religion=${religionParamStr || ""}&unit=${unitStr || ""}&lesson=${lessonIndex + 1}`);
    }
  };

  if (!religionUnit || !currentUnit || !currentLesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
          <Link 
            href="/learn"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Return to lessons
          </Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((finalScore.score / finalScore.total) * 100);
    const isPassing = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className={`text-6xl mb-6 ${isPassing ? "text-green-500" : "text-orange-500"}`}>
            {isPassing ? "🎉" : "📚"}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isPassing ? "Lesson Complete!" : "Keep Learning!"}
          </h2>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-gray-700">
              You scored {finalScore.score} out of {finalScore.total}
            </p>
            <p className="text-sm text-gray-600">
              {percentage}% correct
            </p>
          </div>

          <div className="space-y-2 mb-6 text-sm text-gray-600">
            <p>+ {finalScore.score * 10} XP earned</p>
            {finalScore.score === finalScore.total && <p>+ 2 Lingots (Perfect score!)</p>}
            {finalScore.score > finalScore.total / 2 && finalScore.score < finalScore.total && <p>+ 1 Lingot</p>}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Continue
            </button>
            <Link
              href={`/${religionParamStr || ""}`}
              className="block w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Back to {religion.name}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/${religionParamStr || ""}`}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <CloseSvg className="w-6 h-6" />
          </Link>
          
          <div className="flex-1 mx-8">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((lessonIndex + 1) / currentUnit.tiles.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                {i < hearts ? (
                  <LessonTopBarHeart className="w-8 h-8" />
                ) : (
                  <LessonTopBarEmptyHeart className="w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {currentUnit.description}
          </h1>
          <h2 className="text-lg text-gray-600">
            {currentLesson.type === "treasure" ? "Bonus Lesson" : currentLesson.description}
          </h2>
        </div>

        <QuizComponent
          religion={religion.name}
          topic={currentLesson.type === "treasure" ? "Review" : currentLesson.description || "General"}
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
};

export default ReligionLesson;
