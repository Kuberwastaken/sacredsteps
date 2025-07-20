import { type NextPage } from "next";
import Link from "next/link";
import { GlobeSvg } from "~/components/Svgs";
import React, { useState, useEffect } from "react";
import { ReligionHeader } from "~/components/ReligionHeader";
import { useLoginScreen, LoginScreen } from "~/components/LoginScreen";
import { MainNavThemeToggle } from "~/components/MainNavThemeToggle";
import { OnboardingFlow } from "~/components/OnboardingFlow";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";
import { ReligionCarousel } from "~/components/ReligionCarousel";
import DailyWisdom from "~/components/daily-wisdom";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";

const bgSnow = _bgSnow as StaticImageData;

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const name = useBoundStore((x) => x.name);
  const religion = useBoundStore((x) => x.religion);
  const router = useRouter();

  // Check if user has completed onboarding
  useEffect(() => {
    // Check localStorage for onboarding completion (only on client-side)
    if (typeof window !== 'undefined') {
      const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
      // Only check onboarding completion flag - user data is now persisted separately
      if (hasCompletedOnboarding === 'true') {
        setShowOnboarding(false);
      }
    }
  }, []); // Remove dependency on name and religion to prevent re-showing onboarding

  const handleOnboardingComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_completed', 'true');
    }
    setShowOnboarding(false);
  };

  const handleStartLesson = () => {
    router.push('/lesson');
  };

  // Reset onboarding for testing (you can remove this in production)
  const resetOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('onboarding_completed');
      localStorage.removeItem('user_name');
      localStorage.removeItem('selected_religion');
      window.location.reload();
    }
  };

  // Show onboarding flow for new users
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} onStartLesson={handleStartLesson} />;
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-transparent text-white transition-colors duration-300"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <MainNavThemeToggle />
      <ReligionHeader />
      <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-16 md:flex-row md:gap-36">
        <GlobeSvg className="h-fit w-7/12 md:w-[360px]" />
        <div>
          <DailyWisdom />
          <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
            <Link
              href="/learn"
              className="w-full rounded-2xl border-b-4 border-green-700 dark:border-green-800 bg-green-600 dark:bg-green-700 px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 dark:hover:bg-green-600 md:min-w-[320px]"
            >
              Continue Learning
            </Link>
            {/* Development only: Reset onboarding button */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={resetOnboarding}
                className="text-xs text-gray-400 hover:text-white underline mt-2"
              >
                Reset Onboarding (Dev Only)
              </button>
            )}
          </div>
        </div>
      </div>
      <ReligionCarousel />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </main>
  );
};

export default Home;
