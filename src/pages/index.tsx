import { type NextPage } from "next";
import Link from "next/link";
import { GlobeSvg } from "~/components/Svgs";
import React from "react";
import { ReligionHeader } from "~/components/ReligionHeader";
import { useLoginScreen, LoginScreen } from "~/components/LoginScreen";
import { MainNavThemeToggle } from "~/components/MainNavThemeToggle";
import { TopBar } from "~/components/TopBar";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";
import { ReligionCarousel } from "~/components/ReligionCarousel";

const bgSnow = _bgSnow as StaticImageData;

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  return (
    <>
      <TopBar backgroundColor="bg-blue-600" borderColor="border-blue-700" />
      <main
        className="pt-[58px] flex min-h-screen flex-col items-center justify-center bg-[#235390] dark:bg-gray-900 text-white transition-colors duration-300"
        style={{ backgroundImage: `url(${bgSnow.src})` }}
      >
        <MainNavThemeToggle />
        <ReligionHeader />
        <div className="flex w-full flex-col items-center justify-center gap-3 px-4 py-16 md:flex-row md:gap-36">
          <GlobeSvg className="h-fit w-7/12 md:w-[360px]" />
          <div>
            <p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12">
              The free, fun, and effective way to learn about religions!
            </p>
            <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
              <Link
                href="/register"
                className="w-full rounded-2xl border-b-4 border-green-700 dark:border-green-800 bg-green-600 dark:bg-green-700 px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 dark:hover:bg-green-600 md:min-w-[320px]"
              >
                Get started
              </Link>
              <button
                className="w-full rounded-2xl border-2 border-b-4 border-[#042c60] dark:border-gray-600 bg-[#235390] dark:bg-gray-700 px-8 py-3 font-bold uppercase transition hover:bg-[#204b82] dark:hover:bg-gray-600 md:min-w-[320px]"
                onClick={() => setLoginScreenState("LOGIN")}
              >
                I already have an account
              </button>
            </div>
          </div>
        </div>
        <ReligionCarousel />
        <LoginScreen
          loginScreenState={loginScreenState}
          setLoginScreenState={setLoginScreenState}
        />
      </main>
    </>
  );
};

export default Home;
