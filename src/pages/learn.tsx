import { type NextPage } from "next";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { RightBar } from "~/components/RightBar";
import { LeftBar } from "~/components/LeftBar";
import { useRouter } from "next/router";
import { LoginScreen, useLoginScreen } from "~/components/LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useCourseStore } from "~/stores/createCourseStore";
import { getAvailableReligions, getCurriculumMetadata } from "~/utils/curriculum-converter";
import { CheckCircle, Lock, Play, Trophy, Star, BookOpen, Target, Clock, Heart, Zap } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const Learn: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  const router = useRouter();
  
  const religion = useBoundStore((x) => x.religion);
  const selectedReligion = religion?.name; // Convert to string for course store compatibility
  const hearts = useBoundStore((x) => x.hearts);
  const streak = useBoundStore((x) => x.streak);
  
  console.log('Learn page - religion:', religion, 'selectedReligion:', selectedReligion);
  
  const {
    loadCourse,
    generateCourse,
    getCourseProgress,
    getCourseStats,
    getNextLesson,
    generating,
    error
  } = useCourseStore();

  const [course, setCourse] = useState(selectedReligion ? loadCourse(selectedReligion) : null);
  const [progress, setProgress] = useState(selectedReligion ? getCourseProgress(selectedReligion) : null);
  const [stats, setStats] = useState(selectedReligion ? getCourseStats(selectedReligion) : null);

  useEffect(() => {
    if (selectedReligion) {
      const courseData = loadCourse(selectedReligion);
      const progressData = getCourseProgress(selectedReligion);
      const statsData = getCourseStats(selectedReligion);
      
      setCourse(courseData);
      setProgress(progressData);
      setStats(statsData);
    }
  }, [selectedReligion, loadCourse, getCourseProgress, getCourseStats]);

  const handleStartLearning = async () => {
    if (!selectedReligion) return;
    
    await generateCourse(selectedReligion, 'complete_beginner');
    
    // Refresh data after generation
    const newCourse = loadCourse(selectedReligion);
    const newProgress = getCourseProgress(selectedReligion);
    const newStats = getCourseStats(selectedReligion);
    
    setCourse(newCourse);
    setProgress(newProgress);
    setStats(newStats);
  };

  const nextLesson = course && selectedReligion ? getNextLesson(selectedReligion) : null;

  if (!selectedReligion) {
    return (
      <>
        <TopBar />
        <LeftBar selectedTab="Learn" />
        <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12 min-h-screen">
          <div className="flex max-w-4xl grow flex-col items-center justify-center">
            <div className="text-center py-20 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md">
              <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Choose a Religion to Begin Learning
              </h2>
              <p className="text-white/80 mb-6">
                Select a religion from the dropdown to start your personalized learning journey.
              </p>
              <div className="text-white/60 text-sm">
                Our expertly crafted curriculum with AI-generated exercises awaits!
              </div>
            </div>
          </div>
        </div>
        <BottomBar selectedTab="Learn" />
        <LoginScreen
          loginScreenState={loginScreenState}
          setLoginScreenState={setLoginScreenState}
        />
      </>
    );
  }

  if (generating) {
    return (
      <>
        <TopBar />
        <LeftBar selectedTab="Learn" />
        <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12 min-h-screen">
          <div className="flex max-w-4xl grow flex-col items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
              <h2 className="text-2xl font-bold text-white">Loading Your Learning Path</h2>
              <p className="text-white/80">Preparing comprehensive curriculum for {selectedReligion}...</p>
              <p className="text-sm text-white/60">Setting up your structured learning journey</p>
            </div>
          </div>
        </div>
        <BottomBar selectedTab="Learn" />
        <LoginScreen
          loginScreenState={loginScreenState}
          setLoginScreenState={setLoginScreenState}
        />
      </>
    );
  }

  if (!course) {
    const metadata = getCurriculumMetadata(selectedReligion);
    
    return (
      <>
        <TopBar />
        <LeftBar selectedTab="Learn" />
        <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12 min-h-screen">
          <div className="flex max-w-4xl grow flex-col items-center justify-center">
            <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Begin Your Journey in {selectedReligion}
                  </h1>
                  {metadata && (
                    <p className="text-gray-600 text-lg mb-6">
                      {metadata.description}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold text-black">Structured Learning</h3>
                    <p className="text-sm text-gray-600">Progressive units building on each other</p>
                    {metadata && (
                      <p className="text-xs text-gray-500 mt-1">{metadata.totalUnits} units, {metadata.totalLessons} lessons</p>
                    )}
                  </div>
                  <div className="text-center p-4">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <h3 className="font-semibold text-black">AI-Generated Exercises</h3>
                    <p className="text-sm text-gray-600">Interactive quizzes and assessments</p>
                  </div>
                  <div className="text-center p-4">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold text-black">Track Progress</h3>
                    <p className="text-sm text-gray-600">Monitor your learning journey</p>
                    {metadata && (
                      <p className="text-xs text-gray-500 mt-1">~{metadata.totalEstimatedWeeks} weeks total</p>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleStartLearning}
                  disabled={generating}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning {selectedReligion}
                </Button>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <BottomBar selectedTab="Learn" />
        <LoginScreen
          loginScreenState={loginScreenState}
          setLoginScreenState={setLoginScreenState}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen md:h-auto">
      <TopBar />
      <LeftBar selectedTab="Learn" />
      
      {/* Main content container with proper mobile layout */}
      <div className="flex-1 overflow-y-auto pt-[58px] pb-[88px] md:pt-0 md:pb-0 md:ml-24 lg:ml-64 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="flex justify-center gap-3 sm:p-6 lg:gap-12 min-h-full">
          <div className="flex max-w-2xl grow flex-col p-5">
          {/* Header with religion and stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedReligion}</h1>
                <p className="text-white/80">{course.courseTitle}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-red-400">
                  <Heart className="w-5 h-5 fill-red-400" />
                  <span className="font-bold">{hearts}</span>
                </div>
                <div className="flex items-center space-x-1 text-orange-400">
                  <Zap className="w-5 h-5 fill-orange-400" />
                  <span className="font-bold">{streak}</span>
                </div>
              </div>
            </div>
            
            {stats && (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{stats.completedLessons}</div>
                  <div className="text-sm text-white/70">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{Math.round(stats.completionPercentage)}%</div>
                  <div className="text-sm text-white/70">Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{Math.round(stats.averageScore)}</div>
                  <div className="text-sm text-white/70">Avg Score</div>
                </div>
              </div>
            )}
          </div>

          {/* Learning Path */}
          <div className="flex-1">
            {course.units.map((unit, unitIndex) => (
              <div key={unit.id} className="mb-12">
                {/* Unit Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                    <span className="text-white font-bold text-xl">{unit.unitNumber}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{unit.title}</h2>
                  <p className="text-white/80 max-w-md mx-auto">{unit.description}</p>
                  {!unit.unlocked && (
                    <div className="inline-flex items-center mt-2 px-3 py-1 bg-gray-500/20 rounded-full">
                      <Lock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-400 text-sm">Locked</span>
                    </div>
                  )}
                </div>

                {/* Lesson Path */}
                <div className="relative max-w-sm mx-auto">
                  {unit.lessons.map((lesson, lessonIndex) => {
                    const isEven = lessonIndex % 2 === 0;
                    const isLocked = !unit.unlocked;
                    const isCompleted = lesson.completed;
                    const isActive = !isLocked && !isCompleted && (lessonIndex === 0 || unit.lessons[lessonIndex - 1]?.completed);
                    
                    return (
                      <div key={lesson.id} className="relative mb-8">
                        {/* Connecting Path */}
                        {lessonIndex < unit.lessons.length - 1 && (
                          <div className={`absolute top-16 w-px h-12 bg-gray-300/30 z-0 ${
                            isEven ? 'left-1/2 transform -translate-x-1/2 ml-8' : 'left-1/2 transform -translate-x-1/2 -ml-8'
                          }`} />
                        )}
                        
                        {/* Lesson Tile */}
                        <div className={`relative z-10 ${isEven ? 'mr-auto' : 'ml-auto'} w-20`}>
                          <Link
                            href={isActive ? `/lesson/${selectedReligion}/${unit.id}/${lesson.id}` : '#'}
                            className={`block ${isActive ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                          >
                            <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${
                              isActive ? 'hover:scale-105 animate-pulse' : ''
                            } ${
                              isCompleted 
                                ? "bg-green-500 border-green-600 text-white shadow-lg" 
                                : isActive
                                ? "bg-white border-green-500 text-green-600 shadow-lg"
                                : "bg-gray-300/30 border-gray-400/30 text-gray-400"
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-8 h-8" />
                              ) : isActive ? (
                                <Play className="w-6 h-6" />
                              ) : (
                                <Lock className="w-6 h-6" />
                              )}
                            </div>
                          </Link>
                          
                          {/* Lesson Info */}
                          <div className="text-center mt-3">
                            <div className="text-sm font-medium text-white/90 mb-1">
                              {lesson.title.length > 15 ? `${lesson.title.substring(0, 15)}...` : lesson.title}
                            </div>
                            {lesson.completed && lesson.score && (
                              <div className="text-xs text-yellow-400 font-medium">
                                {lesson.score} XP
                              </div>
                            )}
                            {isActive && (
                              <div className="text-xs text-green-400 font-medium">
                                Start
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Unit Checkpoint */}
                  {unit.checkpointLesson && (
                    <div className="relative mb-8">
                      <div className="mx-auto w-24">
                        <Link
                          href={unit.completed ? `/checkpoint/${selectedReligion}/${unit.id}` : '#'}
                          className={`block ${unit.completed ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                          <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${
                            unit.checkpointLesson.completed 
                              ? "bg-yellow-500 border-yellow-600 text-white shadow-lg" 
                              : unit.completed
                              ? "bg-white border-yellow-500 text-yellow-600 shadow-lg hover:scale-105"
                              : "bg-gray-300/30 border-gray-400/30 text-gray-400"
                          }`}>
                            <Trophy className="w-10 h-10" />
                          </div>
                        </Link>
                        
                        <div className="text-center mt-3">
                          <div className="text-sm font-bold text-yellow-400">
                            Unit Test
                          </div>
                          {unit.checkpointLesson.completed && unit.checkpointLesson.score && (
                            <div className="text-xs text-yellow-400 font-medium">
                              {unit.checkpointLesson.score} XP
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Continue Learning Button */}
          {nextLesson && (
            <div className="sticky bottom-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <Link href={`/lesson/${selectedReligion}/${nextLesson.unitId}/${nextLesson.lessonId}`}>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Continue Learning
                </Button>
              </Link>
            </div>
          )}
          </div>
        </div>
      </div>
      
      <RightBar />
      <BottomBar selectedTab="Learn" />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </div>
  );
};

export default Learn;


