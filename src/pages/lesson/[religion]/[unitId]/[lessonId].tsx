import { type NextPage } from "next";
import { useRouter } from "next/router";
import { CurriculumLessonPage } from "~/components/CurriculumLessonPage";

const LessonPage: NextPage = () => {
  const router = useRouter();
  const { religion, unitId, lessonId } = router.query;

  if (!religion || !unitId || !lessonId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p>Preparing your lesson</p>
        </div>
      </div>
    );
  }

  return (
    <CurriculumLessonPage
      religion={religion as string}
      unitId={unitId as string}
      lessonId={lessonId as string}
    />
  );
};

export default LessonPage;
