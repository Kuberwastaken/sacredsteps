import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";
import { religions } from "~/utils/religions";
import { religionUnits } from "~/utils/religion-units";
import { useEffect } from "react";
import { TopBar } from "~/components/TopBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { BottomBar } from "~/components/BottomBar";

const ReligionPage: NextPage = () => {
  const router = useRouter();
  const { religion: religionName } = router.query;
  const setReligion = useBoundStore((x) => x.setReligion);
  
  const religion = religions.find(r => 
    r.name.toLowerCase() === (typeof religionName === "string" ? religionName.toLowerCase() : "")
  );
  const religionUnit = religionUnits.find(ru => ru.religion.name === religion?.name);

  useEffect(() => {
    if (religion) {
      setReligion(religion);
    }
  }, [religion, setReligion]);

  if (!religion || !religionUnit) {
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
          <div className="bg-blue-500 text-white p-6 rounded-xl">
            <h1 className="text-3xl font-bold">{religion.name}</h1>
            <p className="text-lg mt-2">{religion.description}</p>
          </div>
          
          <div className="space-y-8">
            {religionUnit.units.map((unit) => (
              <div
                key={unit.unitNumber}
                className={`p-6 rounded-2xl border shadow-md bg-white/80 mb-2`}
                style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.85)' }}
              >
                <h2 className="text-xl font-bold mb-6" style={{ color: '#222' }}>{unit.description}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {unit.tiles.map((tile, index) => (
                    <Link
                      key={index}
                      href={`/religion-lesson?religion=${religion.name}&unit=${unit.unitNumber}&lesson=${index}`}
                      className="bg-white rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-shadow block border border-gray-200 shadow-sm flex flex-col items-center gap-2"
                    >
                      <div className="text-3xl mb-2">
                        {tile.type === "book" && "📖"}
                        {tile.type === "star" && "⭐"}
                        {tile.type === "trophy" && "🏆"}
                        {tile.type === "dumbbell" && "💪"}
                        {tile.type === "fast-forward" && "⏩"}
                        {tile.type === "treasure" && "💎"}
                      </div>
                      <p className="text-base font-medium text-gray-800 min-h-[2.5rem]">
                        {tile.description || (tile.type === "treasure" ? "Bonus Lesson" : "")}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RightBar />
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Learn" />
    </div>
  );
};

export default ReligionPage;
