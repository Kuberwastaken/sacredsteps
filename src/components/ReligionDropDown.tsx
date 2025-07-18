import { ChevronDownSvg } from "./Svgs";
import { useState } from "react";
import { religions } from "~/utils/religions";
import Link from "next/link";

export const ReligionDropDown = () => {
  const [religionsShown, setReligionsShown] = useState(false);
  return (
    <div
      className="relative hidden cursor-pointer items-center md:flex"
      onMouseEnter={() => setReligionsShown(true)}
      onMouseLeave={() => setReligionsShown(false)}
      aria-haspopup={true}
      aria-expanded={religionsShown}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setReligionsShown((isShown) => !isShown);
        }
      }}
    >
      <span className="text-md uppercase">Select Religion</span>{" "}
      <ChevronDownSvg />
      {religionsShown && (
        <ul className="absolute right-0 top-full grid w-[500px] grid-cols-2 rounded-2xl border-2 border-gray-200 bg-white p-6 font-light text-gray-600">
          {religions.map((religion) => {
            return (
              <li key={religion.name}>
                <Link
                  href={`/learn`}
                  tabIndex={0}
                  className="flex items-center gap-3 whitespace-nowrap rounded-xl p-3 hover:bg-gray-300"
                >
                  <img src={religion.image} alt={religion.name} width={24} />
                  {religion.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
