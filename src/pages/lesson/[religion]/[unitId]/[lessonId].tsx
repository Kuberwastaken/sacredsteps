import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCourseStore } from '~/stores/createCourseStore';
import { generateDetailedLessonContent, type LessonContent } from '~/ai/flows/generate-detailed-lesson-content';
import { QuizComponent } from '~/components/QuizComponent';
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { RightBar } from "~/components/RightBar";
import { LeftBar } from "~/components/LeftBar";
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { BookOpen, Clock, Target, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';

export default function LessonPage() {
  const router = useRouter();
  const { religion, unitId, lessonId } = router.query;
  
  const { loadCourse, completeLesson, updateProgress } = useCourseStore();
  
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentUnit, setCurrentUnit] = useState(null);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phase, setPhase] = useState('teaching'); // 'teaching', 'practice', 'assessment'
  const [lessonStartTime] = useState(new Date());

  useEffect(() => {
    if (!religion || !unitId || !lessonId) return;

    const loadLessonData = async () => {
      try {
        setLoading(true);
        
        // Load course data
        const courseData = loadCourse(religion as string);
        if (!courseData) {
          setError('Course not found. Please generate a course first.');
          return;
        }
        
        setCourse(courseData);
        
        // Find the specific unit and lesson
        const unit = courseData.units.find(u => u.id === unitId);
        const lesson = unit?.lessons.find(l => l.id === lessonId);
        
        if (!unit || !lesson) {
          setError('Lesson not found.');
          return;
        }
        
        setCurrentUnit(unit);
        setCurrentLesson(lesson);
        
        // Generate lesson content using AI
        const content = await generateDetailedLessonContent({
          religion: religion as string,
          unitTitle: unit.title,
          lessonTitle: lesson.title,
          learningObjectives: lesson.learningObjectives,
          keyTerms: lesson.keyTerms,
          difficulty: lesson.difficulty,
          priorKnowledge: lesson.prerequisites,
        });
        
        setLessonContent(content);
        setLoading(false);
        
      } catch (err) {
        console.error('Error loading lesson:', err);
        setError('Failed to load lesson content.');
        setLoading(false);
      }
    };

    loadLessonData();
  }, [religion, unitId, lessonId, loadCourse]);

  const handleLessonComplete = async (score, totalQuestions) => {
    if (!currentLesson || !currentUnit) return;
    
    const finalScore = Math.round((score / totalQuestions) * 100);
    const minutesSpent = Math.round((new Date().getTime() - lessonStartTime.getTime()) / 60000);
    
    // Update course progress
    completeLesson(religion as string, unitId as string, lessonId as string, finalScore);
    updateProgress(religion as string, minutesSpent);
    
    // Navigate back to course or next lesson
    router.push(`/learn`);
  };

  const startAssessment = () => {
    setPhase('assessment');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
          <h2 className="text-2xl font-bold text-white">Loading Lesson Content</h2>
          <p className="text-white/80">Generating personalized learning material...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{error}</p>
            <div className="flex gap-2">
              <Link href="/learn">
                <Button variant="outline">Back to Course</Button>
              </Link>
              <Button onClick={() => router.reload()}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === 'assessment' && lessonContent) {
    return (
      <>
        <TopBar />
        <LeftBar />
        <div className="flex justify-center gap-3 px-6 pt-6 pb-28">
          <div className="max-w-4xl flex-1">
            <QuizComponent
              religion={religion as string}
              topic={currentLesson?.title || ''}
              onComplete={handleLessonComplete}
            />
          </div>
        </div>
        <RightBar />
        <BottomBar />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <LeftBar />
      <div className="flex justify-center gap-3 px-6 pt-6 pb-28">
        <div className="max-w-4xl flex-1">
          {/* Lesson Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/learn">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Button>
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{currentLesson?.title}</h1>
                  <p className="text-white/80">{currentUnit?.title} • {currentLesson?.difficulty}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentLesson?.estimatedMinutes} minutes
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {currentLesson?.learningObjectives.length} objectives
                </div>
              </div>
            </div>
          </div>

          {/* Teaching Phase */}
          {phase === 'teaching' && lessonContent && (
            <div className="space-y-8">
              {/* Introduction */}
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{lessonContent.introduction}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Learning Objectives:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {lessonContent.teachingPhase.learningObjectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Concept Cards */}
              {lessonContent.teachingPhase.concepts.map((concept, index) => (
                <Card key={concept.id} className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{concept.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{concept.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Points:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {concept.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {concept.example && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Example:</h4>
                        <p className="text-gray-700">{concept.example}</p>
                      </div>
                    )}
                    
                    {concept.relatedTerms.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Terms:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {concept.relatedTerms.map((term, termIndex) => (
                            <div key={termIndex} className="bg-gray-50 p-3 rounded">
                              <span className="font-medium">{term.term}:</span>
                              <span className="text-gray-700 ml-2">{term.definition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Cultural Insights */}
              {lessonContent.culturalInsights.length > 0 && (
                <Card className="border-l-4 border-yellow-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Cultural Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {lessonContent.culturalInsights.map((insight, index) => (
                        <li key={index} className="text-gray-700">• {insight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Modern Connections */}
              {lessonContent.modernConnections.length > 0 && (
                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Modern Relevance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {lessonContent.modernConnections.map((connection, index) => (
                        <li key={index} className="text-gray-700">• {connection}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Continue Button */}
              <div className="text-center py-8">
                <Button 
                  onClick={startAssessment}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <RightBar />
      <BottomBar />
    </>
  );
}
