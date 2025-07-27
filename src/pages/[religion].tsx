import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";
import { religions } from "~/utils/religions";
import { useEffect, useState } from "react";
import { TopBar } from "~/components/TopBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { BottomBar } from "~/components/BottomBar";
import { useCourseStore } from "~/stores/createCourseStore";
import { CoursePath } from "~/components/CoursePath";

const ReligionPage: NextPage = () => {
  const router = useRouter();
  const { religion: religionName } = router.query;
  const setReligion = useBoundStore((x) => x.setReligion);
  
  const religion = religions.find(r => 
    r.name.toLowerCase() === (typeof religionName === "string" ? religionName.toLowerCase() : "")
  );

  useEffect(() => {
    if (religion) {
      setReligion(religion);
    }
  }, [religion, setReligion]);

  if (!religion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Religion not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen md:h-auto">
      <TopBar />
      <LeftBar selectedTab="Learn" />
      {/* Main content container with proper mobile layout */}
      <div className="flex-1 overflow-y-auto pt-[58px] pb-[88px] md:pt-0 md:pb-0 md:ml-24 lg:ml-64">
        <div className="flex justify-center gap-3 md:gap-12 min-h-full">
          <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
            <CoursePath religion={religion.name} />
          </div>
        </div>
      </div>
      <RightBar />
      <BottomBar selectedTab="Learn" />
    </div>
  );
};

export default ReligionPage;
