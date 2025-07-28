import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCourseStore } from '~/stores/createCourseStore';
import { religions } from '~/utils/religions';
import { BookOpen, Clock, Star, Trophy, Lock, CheckCircle, Play, RotateCcw } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface CoursePathProps {
  religion: string;
}

export function CoursePath({ religion }: CoursePathProps) {
  const {
    loadCourse,
    generateCourse,
    getCourseProgress,
    getCourseStats,
    getNextLesson,
    generating,
    error
  } = useCourseStore();

  const [course, setCourse] = useState(loadCourse(religion));
  const [progress, setProgress] = useState(getCourseProgress(religion));
  const [stats, setStats] = useState(getCourseStats(religion));
  const [selectedReligion] = useState(religions.find(r => r.name.toLowerCase() === religion.toLowerCase()));

  useEffect(() => {
    const courseData = loadCourse(religion);
    const progressData = getCourseProgress(religion);
    const statsData = getCourseStats(religion);
    
    setCourse(courseData);
    setProgress(progressData);
    setStats(statsData);
  }, [religion, loadCourse, getCourseProgress, getCourseStats]);

  const handleGenerateCourse = async () => {
    if (!selectedReligion) return;
    
    await generateCourse(selectedReligion.name, 'complete_beginner');
    
    // Refresh data after generation
    const newCourse = loadCourse(religion);
    const newProgress = getCourseProgress(religion);
    const newStats = getCourseStats(religion);
    
    setCourse(newCourse);
    setProgress(newProgress);
    setStats(newStats);
  };

  const nextLesson = course ? getNextLesson(religion) : null;

  if (generating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
          <h2 className="text-2xl font-bold text-white">Loading Your Learning Path</h2>
          <p className="text-white/80">Preparing comprehensive curriculum for {selectedReligion?.name}...</p>
          <p className="text-sm text-white/60">Setting up your structured learning journey</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Generation Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">{error}</p>
            <Button onClick={handleGenerateCourse} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              {selectedReligion && (
                <img 
                  src={selectedReligion.image} 
                  alt={selectedReligion.name}
                  className="w-8 h-8"
                />
              )}
            </div>
            <CardTitle className="text-2xl">Begin Your Journey in {selectedReligion?.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600 text-lg">
              Embark on a comprehensive learning journey designed like Duolingo, 
              but for religious education. Our expertly crafted curriculum provides 
              structured, academic-quality content with AI-generated interactive exercises.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="text-center p-4">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold">Structured Learning</h3>
                <p className="text-sm text-gray-600">Progressive units building on each other</p>
              </div>
              <div className="text-center p-4">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <h3 className="font-semibold">Interactive Exercises</h3>
                <p className="text-sm text-gray-600">Engaging activities and assessments</p>
              </div>
              <div className="text-center p-4">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm text-gray-600">Monitor your learning journey</p>
              </div>
            </div>

            <Button 
              onClick={handleGenerateCourse}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Learning {selectedReligion?.name}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={selectedReligion?.image} 
                alt={selectedReligion?.name}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">{course.courseTitle}</h1>
                <p className="text-white/80">{course.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">
                {stats.completedLessons} / {stats.totalLessons} lessons
              </div>
              <div className="text-white/80">
                {Math.round(stats.completionPercentage)}% complete
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercentage}%` }}
            ></div>
          </div>

          {/* Next Lesson Button */}
          {nextLesson && (
            <div className="mt-4">
              <Link href={`/lesson/${religion}/${nextLesson.unitId}/${nextLesson.lessonId}`}>
                <Button className="bg-green-500 hover:bg-green-600">
                  <Play className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Course Units */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {course.units.map((unit, unitIndex) => (
            <div key={unit.id} className="relative">
              {/* Unit Header */}
              <div className={`${unit.backgroundColor} rounded-lg p-6 mb-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-2xl font-bold ${unit.textColor}`}>
                      Unit {unit.unitNumber}: {unit.title}
                    </h2>
                    <p className={`${unit.textColor} opacity-80`}>{unit.description}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className={unit.textColor}>~{unit.estimatedWeeks} weeks</span>
                    </div>
                  </div>
                  {!unit.unlocked && (
                    <Lock className="w-8 h-8 text-gray-400" />
                  )}
                  {unit.completed && (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  )}
                </div>
              </div>

              {/* Lessons */}
              {unit.unlocked && (
                <div className="ml-8 space-y-4">
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <LessonTile
                      key={lesson.id}
                      lesson={lesson}
                      unitId={unit.id}
                      religion={religion}
                      isLocked={!unit.unlocked}
                      position={lessonIndex}
                    />
                  ))}
                  
                  {/* Checkpoint Lesson */}
                  <CheckpointTile
                    checkpoint={unit.checkpointLesson}
                    unitId={unit.id}
                    religion={religion}
                    isLocked={!unit.unlocked || !unit.lessons.every(l => l.completed)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Course Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cultural Context</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{course.culturalContext}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Modern Relevance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{course.modernRelevance}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface LessonTileProps {
  lesson: any;
  unitId: string;
  religion: string;
  isLocked: boolean;
  position: number;
}

function LessonTile({ lesson, unitId, religion, isLocked, position }: LessonTileProps) {
  const tileTypes = ['book', 'star', 'dumbbell', 'trophy'] as const;
  type TileType = typeof tileTypes[number];
  
  const tileType = tileTypes[position % tileTypes.length] as TileType;

  const iconMap: Record<TileType, React.ElementType> = {
    book: BookOpen,
    star: Star,
    dumbbell: Trophy,
    trophy: Trophy,
  };
  
  const IconComponent = iconMap[tileType];

  return (
    <Link href={isLocked ? '#' : `/lesson/${religion}/${unitId}/${lesson.id}`}>
      <div className={`
        relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
        ${lesson.completed 
          ? 'bg-green-50 border-green-300 hover:bg-green-100' 
          : isLocked
          ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50'
          : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-md'
        }
      `}>
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center mr-4
          ${lesson.completed 
            ? 'bg-green-500 text-white' 
            : isLocked
            ? 'bg-gray-400 text-white'
            : 'bg-blue-500 text-white'
          }
        `}>
          {lesson.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : isLocked ? (
            <Lock className="w-6 h-6" />
          ) : (
            <IconComponent className="w-6 h-6" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
          <p className="text-sm text-gray-600">{lesson.description}</p>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {lesson.estimatedMinutes} min
            {lesson.completed && lesson.score && (
              <span className="ml-2 text-green-600">
                Score: {lesson.score}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

interface CheckpointTileProps {
  checkpoint: any;
  unitId: string;
  religion: string;
  isLocked: boolean;
}

function CheckpointTile({ checkpoint, unitId, religion, isLocked }: CheckpointTileProps) {
  return (
    <Link href={isLocked ? '#' : `/checkpoint/${religion}/${unitId}`}>
      <div className={`
        relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
        bg-gradient-to-r
        ${checkpoint.completed 
          ? 'from-yellow-100 to-orange-100 border-yellow-400' 
          : isLocked
          ? 'from-gray-100 to-gray-200 border-gray-300 cursor-not-allowed opacity-50'
          : 'from-yellow-50 to-orange-50 border-yellow-300 hover:border-orange-400 hover:shadow-md'
        }
      `}>
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center mr-4
          ${checkpoint.completed 
            ? 'bg-yellow-500 text-white' 
            : isLocked
            ? 'bg-gray-400 text-white'
            : 'bg-yellow-500 text-white'
          }
        `}>
          {checkpoint.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : isLocked ? (
            <Lock className="w-6 h-6" />
          ) : (
            <Trophy className="w-6 h-6" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{checkpoint.title}</h3>
          <p className="text-sm text-gray-600">{checkpoint.description}</p>
          <div className="text-xs text-yellow-600 font-medium">
            Checkpoint Assessment
            {checkpoint.completed && checkpoint.score && (
              <span className="ml-2">
                Score: {checkpoint.score}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
