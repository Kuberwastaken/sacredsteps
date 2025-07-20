import { useState } from 'react';
import { useCourseStore } from '~/stores/createCourseStore';
import { religions } from '~/utils/religions';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { 
  BookOpen, 
  Clock, 
  Users, 
  TrendingUp, 
  Download, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function CourseAdmin() {
  const {
    courses,
    progress,
    generateCourse,
    loadCourse,
    getCourseStats,
    resetCourse,
    generating,
    error
  } = useCourseStore();

  const [selectedReligion, setSelectedReligion] = useState('');
  const [bulkGenerating, setBulkGenerating] = useState(false);
  const [bulkResults, setBulkResults] = useState(null);

  const handleGenerateSingle = async () => {
    if (!selectedReligion) return;
    await generateCourse(selectedReligion, 'complete_beginner');
  };

  const handleGenerateAll = async () => {
    setBulkGenerating(true);
    try {
      const response = await fetch('/api/generate-all-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const results = await response.json();
      setBulkResults(results);
    } catch (error) {
      console.error('Bulk generation error:', error);
      setBulkResults({ success: false, errors: ['Failed to generate courses'] });
    } finally {
      setBulkGenerating(false);
    }
  };

  const handleResetCourse = (religion) => {
    if (confirm(`Are you sure you want to reset the course for ${religion}?`)) {
      resetCourse(religion);
    }
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Course Management</h1>
            <p className="text-white/80">Generate and manage AI-powered religion courses</p>
          </div>

          {/* Generation Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Generate Single Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <select
                  value={selectedReligion}
                  onChange={(e) => setSelectedReligion(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select a religion</option>
                  {religions.map((religion) => (
                    <option key={religion.name} value={religion.name}>
                      {religion.name}
                    </option>
                  ))}
                </select>
                
                <Button 
                  onClick={handleGenerateSingle}
                  disabled={!selectedReligion || generating}
                  className="w-full"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Generate Course
                    </>
                  )}
                </Button>
                
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generate All Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Generate comprehensive courses for all {religions.length} religions.
                  This may take several minutes.
                </p>
                
                <Button 
                  onClick={handleGenerateAll}
                  disabled={bulkGenerating}
                  className="w-full"
                  variant="outline"
                >
                  {bulkGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating All Courses...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Generate All Courses
                    </>
                  )}
                </Button>

                {bulkResults && (
                  <div className="mt-4 space-y-2">
                    <div className={`flex items-center gap-2 text-sm ${
                      bulkResults.success ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {bulkResults.success ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      Generated {bulkResults.coursesGenerated} / {religions.length} courses
                    </div>
                    
                    {bulkResults.errors.length > 0 && (
                      <div className="text-red-600 text-xs">
                        Errors: {bulkResults.errors.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Course Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {religions.map((religion) => {
              const course = courses[religion.name];
              const courseProgress = progress[religion.name];
              const stats = course ? getCourseStats(religion.name) : null;

              return (
                <Card key={religion.name} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={religion.image} 
                        alt={religion.name}
                        className="w-8 h-8"
                      />
                      <div>
                        <CardTitle className="text-lg">{religion.name}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {course ? 'Generated' : 'Not Generated'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {course ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>{Math.round(stats?.completionPercentage || 0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all"
                              style={{ width: `${stats?.completionPercentage || 0}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold">{course.units.length}</div>
                            <div className="text-gray-600">Units</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{stats?.totalLessons || 0}</div>
                            <div className="text-gray-600">Lessons</div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">
                          Generated: {new Date(course.generatedAt).toLocaleDateString()}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleResetCourse(religion.name)}
                            className="flex-1"
                          >
                            Reset
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => window.open(`/learn-new?religion=${religion.name}`, '_blank')}
                            className="flex-1"
                          >
                            View
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <XCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 mb-4">No course generated</p>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedReligion(religion.name);
                            handleGenerateSingle();
                          }}
                          disabled={generating}
                        >
                          Generate
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Global Stats */}
          {Object.keys(courses).length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Global Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {Object.keys(courses).length}
                    </div>
                    <div className="text-gray-600">Courses Generated</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {Object.values(courses).reduce((total, course) => total + course.units.length, 0)}
                    </div>
                    <div className="text-gray-600">Total Units</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {Object.values(courses).reduce((total, course) => 
                        total + course.units.reduce((unitTotal, unit) => unitTotal + unit.lessons.length, 0), 0
                      )}
                    </div>
                    <div className="text-gray-600">Total Lessons</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {Object.values(progress).reduce((total, prog) => total + prog.totalLessonsCompleted, 0)}
                    </div>
                    <div className="text-gray-600">Lessons Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <BottomBar />
    </>
  );
}
