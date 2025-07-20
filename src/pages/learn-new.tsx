import { type NextPage } from "next";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { RightBar } from "~/components/RightBar";
import { LeftBar } from "~/components/LeftBar";
import { LoginScreen, useLoginScreen } from "~/components/LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import { CoursePath } from "~/components/CoursePath";

const Learn: NextPage = () => {
  const selectedReligion = useBoundStore((x) => x.selectedReligion);
  const { loggedIn, LoginScreenEl } = useLoginScreen();

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return (
    <>
      <TopBar />
      <LeftBar />
      <div className="flex justify-center gap-3 px-6 pt-6 pb-28">
        <div className="relative top-5 hidden lg:block">
          {/* Left sidebar content */}
        </div>

        <div className="max-w-6xl flex-1">
          {selectedReligion ? (
            <CoursePath religion={selectedReligion} />
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
              <div className="text-center py-20 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Choose a Religion to Begin Learning
                </h2>
                <p className="text-white/80 mb-6">
                  Select a religion from the dropdown to start your personalized learning journey.
                </p>
                <div className="text-white/60 text-sm">
                  Our AI will generate a comprehensive course structure just for you!
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative top-5 hidden lg:block">
          {/* Right sidebar content */}
        </div>
      </div>
      <RightBar />
      <BottomBar />
      {LoginScreenEl}
    </>
  );
};

export default Learn;
