import { type NextPage } from "next";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  ActiveBookSvg,
  LockedBookSvg,
  CheckmarkSvg,
  LockedDumbbellSvg,
  FastForwardSvg,
  GoldenBookSvg,
  GoldenDumbbellSvg,
  GoldenTreasureSvg,
  GoldenTrophySvg,
  GuidebookSvg,
  LessonCompletionSvg0,
  LessonCompletionSvg1,
  LessonCompletionSvg2,
  LessonCompletionSvg3,
  LockSvg,
  StarSvg,
  LockedTreasureSvg,
  LockedTrophySvg,
  UpArrowSvg,
  ActiveTreasureSvg,
  ActiveTrophySvg,
  ActiveDumbbellSvg,
  PracticeExerciseSvg,
} from "~/components/Svgs";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { RightBar } from "~/components/RightBar";
import { LeftBar } from "~/components/LeftBar";
import { useRouter } from "next/router";
import { LoginScreen, useLoginScreen } from "~/components/LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import { religionUnits, type Unit } from "~/utils/religion-units";

type TileStatus = "LOCKED" | "ACTIVE" | "COMPLETE";





const tileLeftClassNames = [
  "left-0",
  "left-[-45px]",
  "left-[-70px]",
  "left-[-45px]",
  "left-0",
  "left-[45px]",
  "left-[70px]",
  "left-[45px]",
] as const;

type TileLeftClassName = (typeof tileLeftClassNames)[number];



const tileTooltipLeftOffsets = [140, 95, 70, 95, 140, 185, 210, 185] as const;

type TileTooltipLeftOffset = (typeof tileTooltipLeftOffsets)[number];









const UnitHeader = () => {
  const religion = useBoundStore((x) => x.religion);
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white mb-2">{religion.name}</h1>
      <p className="text-white/80">Learn through interactive lessons</p>
    </div>
  );
};

const UnitSection = ({ unit }: { unit: Unit }): JSX.Element => {
  const religion = useBoundStore((x) => x.religion);
  
  return (
    <div className="relative mb-16 mt-8 flex max-w-2xl flex-col items-center">
      {/* Unit title */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-white mb-2">Unit {unit.unitNumber}</h2>
        <p className="text-white/80">{unit.description}</p>
      </div>
      
      {/* Lesson tiles in a path-like pattern */}
      <div className="relative w-full max-w-sm">
        {unit.tiles.map((tile, index) => {
          const isEven = index % 2 === 0;
          const positionClass = isEven ? "ml-0" : "ml-auto mr-0";
          const tileStatus: TileStatus = index === 0 ? "ACTIVE" : index < 1 ? "COMPLETE" : "LOCKED";
          
          return (
            <div key={index} className={`relative mb-6 w-20 ${positionClass}`}>
              {/* Connecting line */}
              {index < unit.tiles.length - 1 && (
                <div className={`absolute top-16 w-px h-8 bg-gray-300 ${isEven ? 'left-10 ml-8' : 'right-10 mr-8'}`} />
              )}
              
              <Link
                href={`/religion-lesson?religion=${religion.name}&unit=${unit.unitNumber}&lesson=${index}`}
                className="block"
              >
                <div className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 ${
                  tileStatus === "COMPLETE" 
                    ? "bg-green-500 border-green-600 text-white" 
                    : tileStatus === "ACTIVE"
                    ? "bg-white dark:bg-gray-800 border-green-500 text-green-600 dark:text-green-400 hover:border-green-600"
                    : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                }`}>
                  <div className="text-2xl">
                    {tileStatus === "COMPLETE" && <CheckmarkSvg className="w-8 h-8" />}
                    {tileStatus === "ACTIVE" && (
                      <>
                        {tile.type === "book" && "📖"}
                        {tile.type === "star" && "⭐"}
                        {tile.type === "trophy" && "🏆"}
                        {tile.type === "dumbbell" && "💪"}
                        {tile.type === "fast-forward" && "⏩"}
                        {tile.type === "treasure" && "💎"}
                      </>
                    )}
                    {tileStatus === "LOCKED" && <LockSvg className="w-6 h-6" />}
                  </div>
                </div>
                
                {/* Lesson label */}
                <div className="text-center mt-2">
                  <div className="text-sm font-medium text-white/90">
                    {tile.description?.substring(0, 20)}
                    {(tile.description?.length ?? 0) > 20 ? "..." : ""}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Learn: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const updateScrollY = () => setScrollY(globalThis.scrollY ?? scrollY);
    updateScrollY();
    document.addEventListener("scroll", updateScrollY);
    return () => document.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  const religion = useBoundStore((x) => x.religion);
  const units = religionUnits.find((x) => x.religion.name === religion.name)?.units ?? [];

  return (
    <>
      <TopBar />
      <LeftBar selectedTab="Learn" />

      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12 min-h-screen">
        <div className="flex max-w-2xl grow flex-col space-glass p-6 rounded-2xl my-6">
          <UnitHeader />
          {units.map((unit) => (
            <UnitSection unit={unit} key={unit.unitNumber} />
          ))}
          <div className="sticky bottom-28 left-0 right-0 flex items-end justify-between">
            <Link
              href="/lesson?practice"
              className="absolute left-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-b-4 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 transition hover:bg-gray-50 dark:hover:bg-gray-700 hover:brightness-90 md:left-0"
            >
              <span className="sr-only">Practice exercise</span>
              <PracticeExerciseSvg className="h-8 w-8" />
            </Link>
            {scrollY > 100 && (
              <button
                className="absolute right-4 flex h-14 w-14 items-center justify-center self-end rounded-2xl border-2 border-b-4 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 transition hover:bg-gray-50 dark:hover:bg-gray-700 hover:brightness-90 md:right-0"
                onClick={() => scrollTo(0, 0)}
              >
                <span className="sr-only">Jump to top</span>
                <UpArrowSvg />
              </button>
            )}
          </div>
        </div>
        <RightBar />
      </div>

      <div className="pt-[90px]"></div>

      <BottomBar selectedTab="Learn" />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};

export default Learn;

const LessonCompletionSvg = ({
  lessonsCompleted,
  status,
  style = {},
}: {
  lessonsCompleted: number;
  status: TileStatus;
  style?: React.HTMLAttributes<SVGElement>["style"];
}) => {
  if (status !== "ACTIVE") {
    return null;
  }
  switch (lessonsCompleted % 4) {
    case 0:
      return <LessonCompletionSvg0 style={style} />;
    case 1:
      return <LessonCompletionSvg1 style={style} />;
    case 2:
      return <LessonCompletionSvg2 style={style} />;
    case 3:
      return <LessonCompletionSvg3 style={style} />;
    default:
      return null;
  }
};

const HoverLabel = ({
  text,
  textColor,
}: {
  text: string;
  textColor: `text-${string}`;
}) => {
  const hoverElement = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(72);

  useEffect(() => {
    setWidth(hoverElement.current?.clientWidth ?? width);
  }, [hoverElement.current?.clientWidth, width]);

  return (
    <div
      className={`absolute z-10 w-max animate-bounce rounded-lg border-2 border-gray-200 bg-white px-3 py-2 font-bold uppercase ${textColor}`}
      style={{
        top: "-25%",
        left: `calc(50% - ${width / 2}px)`,
      }}
      ref={hoverElement}
    >
      {text}
      <div
        className="absolute h-3 w-3 rotate-45 border-b-2 border-r-2 border-gray-200 bg-white"
        style={{ left: "calc(50% - 8px)", bottom: "-8px" }}
      ></div>
    </div>
  );
};


