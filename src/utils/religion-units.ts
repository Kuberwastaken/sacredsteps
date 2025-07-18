import { type Religion } from "./religions";

export type ReligionUnit = {
  religion: Religion;
  units: readonly Unit[];
};

export type Unit = {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  textColor: `text-${string}`;
  borderColor: `border-${string}`;
  tiles: Tile[];
};

export type Tile =
  | {
      type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward";
      description: string;
    }
  | { type: "treasure" };

export type TileType = Tile["type"];

export const religionUnits: readonly ReligionUnit[] = [
  {
    religion: {
      name: "Christianity",
      description: "The world's largest religion, based on the life and teachings of Jesus of Nazareth.",
      image: "/religions/cross.svg",
    },
    units: [
      {
        unitNumber: 1,
        description: "The Basics",
        backgroundColor: "bg-green-400",
        textColor: "text-green-600",
        borderColor: "border-green-500",
        tiles: [
          { type: "book", description: "Introduction to Christianity" },
          { type: "star", description: "Jesus and His Teachings" },
          { type: "book", description: "The Bible Overview" },
          { type: "trophy", description: "Basic Beliefs" },
        ],
      },
      {
        unitNumber: 2,
        description: "History and Traditions",
        backgroundColor: "bg-blue-400",
        textColor: "text-blue-600",
        borderColor: "border-blue-500",
        tiles: [
          { type: "book", description: "Early Church History" },
          { type: "star", description: "Saints and Martyrs" },
          { type: "dumbbell", description: "Christian Holidays" },
          { type: "treasure" },
        ],
      },
      {
        unitNumber: 3,
        description: "Denominations",
        backgroundColor: "bg-purple-400",
        textColor: "text-purple-600",
        borderColor: "border-purple-500",
        tiles: [
          { type: "book", description: "Catholic Church" },
          { type: "star", description: "Protestant Churches" },
          { type: "book", description: "Orthodox Churches" },
          { type: "trophy", description: "Modern Christianity" },
        ],
      },
    ],
  },
  {
    religion: {
      name: "Islam",
      description: "The second-largest religion, based on the teachings of the prophet Muhammad.",
      image: "/religions/crescent-star.svg",
    },
    units: [
      {
        unitNumber: 1,
        description: "The Five Pillars",
        backgroundColor: "bg-green-400",
        textColor: "text-green-600",
        borderColor: "border-green-500",
        tiles: [
          { type: "book", description: "Shahada - Declaration of Faith" },
          { type: "star", description: "Salah - Prayer" },
          { type: "book", description: "Zakat - Charity" },
          { type: "star", description: "Sawm - Fasting" },
          { type: "trophy", description: "Hajj - Pilgrimage" },
        ],
      },
      {
        unitNumber: 2,
        description: "The Quran and Prophet",
        backgroundColor: "bg-blue-400",
        textColor: "text-blue-600",
        borderColor: "border-blue-500",
        tiles: [
          { type: "book", description: "The Holy Quran" },
          { type: "star", description: "Prophet Muhammad" },
          { type: "dumbbell", description: "Hadith and Sunnah" },
          { type: "treasure" },
        ],
      },
      {
        unitNumber: 3,
        description: "Islamic Culture",
        backgroundColor: "bg-orange-400",
        textColor: "text-orange-600",
        borderColor: "border-orange-500",
        tiles: [
          { type: "book", description: "Islamic Calendar" },
          { type: "star", description: "Eid Celebrations" },
          { type: "dumbbell", description: "Islamic Art & Architecture" },
          { type: "trophy", description: "Modern Islam" },
        ],
      },
    ],
  },
  {
    religion: {
      name: "Hinduism",
      description: "The world's oldest religion, with a diverse range of traditions and beliefs.",
      image: "/religions/om.svg",
    },
    units: [
      {
        unitNumber: 1,
        description: "Core Concepts",
        backgroundColor: "bg-green-400",
        textColor: "text-green-600",
        borderColor: "border-green-500",
        tiles: [
          { type: "book", description: "Dharma and Karma" },
          { type: "star", description: "Samsara and Moksha" },
          { type: "book", description: "The Four Vedas" },
          { type: "trophy", description: "Hindu Philosophy" },
        ],
      },
      {
        unitNumber: 2,
        description: "Deities and Epics",
        backgroundColor: "bg-yellow-400",
        textColor: "text-yellow-600",
        borderColor: "border-yellow-500",
        tiles: [
          { type: "book", description: "Brahma, Vishnu, Shiva" },
          { type: "star", description: "The Ramayana" },
          { type: "dumbbell", description: "The Mahabharata" },
          { type: "treasure" },
        ],
      },
      {
        unitNumber: 3,
        description: "Practices and Festivals",
        backgroundColor: "bg-pink-400",
        textColor: "text-pink-600",
        borderColor: "border-pink-500",
        tiles: [
          { type: "book", description: "Yoga and Meditation" },
          { type: "star", description: "Diwali and Holi" },
          { type: "dumbbell", description: "Pilgrimage Sites" },
          { type: "trophy", description: "Modern Hinduism" },
        ],
      },
    ],
  },
  {
    religion: {
      name: "Buddhism",
      description: "A religion and philosophy that encompasses a variety of traditions, beliefs and spiritual practices.",
      image: "/religions/dharmachakra.svg",
    },
    units: [
      {
        unitNumber: 1,
        description: "The Buddha's Teachings",
        backgroundColor: "bg-green-400",
        textColor: "text-green-600",
        borderColor: "border-green-500",
        tiles: [
          { type: "book", description: "The Life of Buddha" },
          { type: "star", description: "The Four Noble Truths" },
          { type: "book", description: "The Eightfold Path" },
          { type: "trophy", description: "Enlightenment" },
        ],
      },
      {
        unitNumber: 2,
        description: "Buddhist Practices",
        backgroundColor: "bg-indigo-400",
        textColor: "text-indigo-600",
        borderColor: "border-indigo-500",
        tiles: [
          { type: "book", description: "Meditation Techniques" },
          { type: "star", description: "Mindfulness" },
          { type: "dumbbell", description: "The Sangha Community" },
          { type: "treasure" },
        ],
      },
      {
        unitNumber: 3,
        description: "Schools and Traditions",
        backgroundColor: "bg-red-400",
        textColor: "text-red-600",
        borderColor: "border-red-500",
        tiles: [
          { type: "book", description: "Theravada Buddhism" },
          { type: "star", description: "Mahayana Buddhism" },
          { type: "dumbbell", description: "Zen and Tibetan Buddhism" },
          { type: "trophy", description: "Buddhism Today" },
        ],
      },
    ],
  },
  {
    religion: {
      name: "Judaism",
      description: "An ancient monotheistic religion, with the Torah as its foundational text.",
      image: "/religions/star-of-david.svg",
    },
    units: [
      {
        unitNumber: 1,
        description: "Foundations",
        backgroundColor: "bg-green-400",
        textColor: "text-green-600",
        borderColor: "border-green-500",
        tiles: [
          { type: "book", description: "The Torah" },
          { type: "star", description: "Abraham and the Covenant" },
          { type: "book", description: "Moses and the Exodus" },
          { type: "trophy", description: "The Ten Commandments" },
        ],
      },
      {
        unitNumber: 2,
        description: "Practices and Traditions",
        backgroundColor: "bg-teal-400",
        textColor: "text-teal-600",
        borderColor: "border-teal-500",
        tiles: [
          { type: "book", description: "Shabbat Observance" },
          { type: "star", description: "Kosher Laws" },
          { type: "dumbbell", description: "Synagogue Worship" },
          { type: "treasure" },
        ],
      },
      {
        unitNumber: 3,
        description: "Holidays and Lifecycle",
        backgroundColor: "bg-cyan-400",
        textColor: "text-cyan-600",
        borderColor: "border-cyan-500",
        tiles: [
          { type: "book", description: "Passover and High Holy Days" },
          { type: "star", description: "Bar/Bat Mitzvah" },
          { type: "dumbbell", description: "Jewish Wedding Traditions" },
          { type: "trophy", description: "Modern Judaism" },
        ],
      },
    ],
  },
];
