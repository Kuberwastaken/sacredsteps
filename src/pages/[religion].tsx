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
    <div>
      <TopBar />
      <LeftBar selectedTab="Learn" />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <CoursePath religion={religion.name} />
        </div>
      </div>
      <RightBar />
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Learn" />
    </div>
  );
};

export default ReligionPage;
