import type { Religion } from "~/utils/religions";
import Image from "next/image";

export const ReligionSymbol = ({
  religion,
  size = 24,
}: {
  religion: Religion;
  size?: number;
}) => (
  <Image
    src={religion.image}
    alt={religion.name}
    width={size}
    height={size}
    className="object-contain"
  />
);
