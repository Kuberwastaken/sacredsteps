export type Religion = {
  name: string;
  description: string;
  image: string;
};

export const religions: readonly Religion[] = [
  {
    name: "Christianity",
    description: "The world's largest religion, based on the life and teachings of Jesus of Nazareth.",
    image: "/religions/cross.svg",
  },
  {
    name: "Islam",
    description: "The second-largest religion, based on the teachings of the prophet Muhammad.",
    image: "/religions/crescent-star.svg",
  },
  {
    name: "Hinduism",
    description: "The world's oldest religion, with a diverse range of traditions and beliefs.",
    image: "/religions/om.svg",
  },
  {
    name: "Buddhism",
    description: "A religion and philosophy that encompasses a variety of traditions, beliefs and spiritual practices.",
    image: "/religions/dharmachakra.svg",
  },
  {
    name: "Judaism",
    description: "An ancient monotheistic religion, with the Torah as its foundational text.",
    image: "/religions/star-of-david.svg",
  },
];