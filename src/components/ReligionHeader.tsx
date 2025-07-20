import Link from "next/link";
import { ReligionDropDown } from "./ReligionDropDown";

export const ReligionHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex min-h-[70px] w-full items-center justify-between bg-[#235390] px-10 font-bold text-white">
      <Link className="text-4xl" href="/">
        Sacred Steps
      </Link>
      <ReligionDropDown />
    </header>
  );
};
