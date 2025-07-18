import type { NextApiRequest, NextApiResponse } from "next";

export type QuizQuestion = {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
};

export type GenerateQuizRequest = {
  religion: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionCount?: number;
};

export type GenerateQuizResponse = {
  questions?: QuizQuestion[];
  success: boolean;
  error?: string;
};

// Mock AI quiz generation (replace with real AI service)
const generateMockQuiz = (req: GenerateQuizRequest): QuizQuestion[] => {
  const { religion, topic } = req;
  
  // Christianity quizzes
  if (religion === "Christianity") {
    if (topic.includes("Introduction") || topic.includes("Basics")) {
      return [
        {
          id: "1",
          type: "multiple_choice",
          question: "Who is considered the founder of Christianity?",
          options: ["Jesus Christ", "Paul the Apostle", "Moses", "Abraham"],
          correctAnswer: 0,
          explanation: "Jesus Christ is considered the founder of Christianity, as the religion is based on his life and teachings."
        },
        {
          id: "2",
          type: "true_false",
          question: "The Bible consists of the Old Testament and New Testament.",
          correctAnswer: "true",
          explanation: "The Christian Bible is divided into two main parts: the Old Testament and the New Testament."
        },
        {
          id: "3",
          type: "multiple_choice",
          question: "In which city was Jesus born?",
          options: ["Jerusalem", "Nazareth", "Bethlehem", "Galilee"],
          correctAnswer: 2,
          explanation: "According to Christian tradition, Jesus was born in Bethlehem."
        },
        {
          id: "4",
          type: "true_false",
          question: "Christmas celebrates the birth of Jesus Christ.",
          correctAnswer: "true",
          explanation: "Christmas is the Christian holiday celebrating the birth of Jesus Christ."
        },
        {
          id: "5",
          type: "multiple_choice",
          question: "What does 'Christ' mean?",
          options: ["Teacher", "Prophet", "Anointed One", "Holy One"],
          correctAnswer: 2,
          explanation: "'Christ' means 'Anointed One' in Greek, equivalent to 'Messiah' in Hebrew."
        },
        {
          id: "6",
          type: "multiple_choice",
          question: "Which of these is NOT one of the core Christian beliefs?",
          options: ["Trinity", "Resurrection", "Reincarnation", "Salvation"],
          correctAnswer: 2,
          explanation: "Reincarnation is not a core Christian belief. Christians generally believe in resurrection, not reincarnation."
        }
      ];
    }
  }
  
  // Islam quizzes
  if (religion === "Islam") {
    if (topic.includes("Five Pillars") || topic.includes("Pillars")) {
      return [
        {
          id: "1",
          type: "multiple_choice",
          question: "How many pillars are there in Islam?",
          options: ["Three", "Four", "Five", "Six"],
          correctAnswer: 2,
          explanation: "Islam has Five Pillars: Shahada, Salah, Zakat, Sawm, and Hajj."
        },
        {
          id: "2",
          type: "fill_blank",
          question: "The declaration of faith in Islam is called ___.",
          correctAnswer: "Shahada",
          explanation: "Shahada is the Islamic declaration of faith: 'There is no god but Allah, and Muhammad is his messenger.'"
        },
        {
          id: "3",
          type: "true_false",
          question: "Muslims are required to pray five times a day.",
          correctAnswer: "true",
          explanation: "Salah, one of the Five Pillars, requires Muslims to pray five times daily."
        },
        {
          id: "4",
          type: "multiple_choice",
          question: "What is Zakat?",
          options: ["Fasting", "Pilgrimage", "Charity", "Prayer"],
          correctAnswer: 2,
          explanation: "Zakat is the obligatory charitable giving in Islam, one of the Five Pillars."
        },
        {
          id: "5",
          type: "true_false",
          question: "Hajj is the pilgrimage to Mecca that every Muslim must make at least once if able.",
          correctAnswer: "true",
          explanation: "Hajj is the pilgrimage to Mecca, required once in a lifetime for those who are physically and financially able."
        },
        {
          id: "6",
          type: "multiple_choice",
          question: "During which month do Muslims fast from dawn to sunset?",
          options: ["Ramadan", "Muharram", "Shawwal", "Rajab"],
          correctAnswer: 0,
          explanation: "Muslims fast during the month of Ramadan as part of Sawm, one of the Five Pillars."
        }
      ];
    }
  }
  
  // Buddhism quizzes
  if (religion === "Buddhism") {
    if (topic.includes("Buddha") || topic.includes("Teachings")) {
      return [
        {
          id: "1",
          type: "multiple_choice",
          question: "What are the Four Noble Truths about?",
          options: ["Suffering and its cessation", "The nature of gods", "Reincarnation cycles", "Meditation techniques"],
          correctAnswer: 0,
          explanation: "The Four Noble Truths explain the nature of suffering and the path to end it."
        },
        {
          id: "2",
          type: "true_false",
          question: "The Buddha was born as Prince Siddhartha.",
          correctAnswer: "true",
          explanation: "Buddha was born as Prince Siddhartha Gautama before renouncing worldly life to seek enlightenment."
        },
        {
          id: "3",
          type: "multiple_choice",
          question: "What is the ultimate goal in Buddhism?",
          options: ["Heaven", "Nirvana", "Rebirth", "Wealth"],
          correctAnswer: 1,
          explanation: "Nirvana is the ultimate goal in Buddhism - the liberation from suffering and the cycle of rebirth."
        },
        {
          id: "4",
          type: "fill_blank",
          question: "The Buddhist path to enlightenment is called the Noble ___ Path.",
          correctAnswer: "Eightfold",
          explanation: "The Noble Eightfold Path is the Buddhist path to enlightenment, consisting of eight practices."
        },
        {
          id: "5",
          type: "true_false",
          question: "Buddhism teaches that all life contains suffering (dukkha).",
          correctAnswer: "true",
          explanation: "The First Noble Truth states that life contains suffering (dukkha), which is unavoidable."
        },
        {
          id: "6",
          type: "multiple_choice",
          question: "What does 'Buddha' mean?",
          options: ["Enlightened One", "Holy One", "Teacher", "Monk"],
          correctAnswer: 0,
          explanation: "'Buddha' means 'Enlightened One' or 'Awakened One' in Sanskrit."
        }
      ];
    }
  }
  
  // Hinduism quizzes
  if (religion === "Hinduism") {
    if (topic.includes("Core") || topic.includes("Concepts")) {
      return [
        {
          id: "1",
          type: "multiple_choice",
          question: "What is Karma?",
          options: ["A type of meditation", "The law of cause and effect", "A sacred text", "A Hindu festival"],
          correctAnswer: 1,
          explanation: "Karma is the law of cause and effect, where actions have consequences in this life or future lives."
        },
        {
          id: "2",
          type: "fill_blank",
          question: "The ancient sacred texts of Hinduism are called the ___.",
          correctAnswer: "Vedas",
          explanation: "The Vedas are the oldest sacred texts of Hinduism, containing hymns, prayers, and rituals."
        },
        {
          id: "3",
          type: "multiple_choice",
          question: "What is Dharma in Hinduism?",
          options: ["Righteous living", "Wealth", "Pleasure", "Liberation"],
          correctAnswer: 0,
          explanation: "Dharma refers to righteous living and moral law in Hinduism."
        },
        {
          id: "4",
          type: "true_false",
          question: "Hinduism believes in reincarnation (rebirth of the soul).",
          correctAnswer: "true",
          explanation: "Reincarnation is a fundamental belief in Hinduism - the soul is reborn in new bodies."
        },
        {
          id: "5",
          type: "multiple_choice",
          question: "What are the four main goals of life in Hinduism called?",
          options: ["Purusharthas", "Ashramas", "Varnas", "Yogas"],
          correctAnswer: 0,
          explanation: "The four Purusharthas are: Dharma (righteousness), Artha (wealth), Kama (pleasure), and Moksha (liberation)."
        },
        {
          id: "6",
          type: "fill_blank",
          question: "The ultimate spiritual goal in Hinduism is ___.",
          correctAnswer: "Moksha",
          explanation: "Moksha is liberation from the cycle of death and rebirth, the ultimate spiritual goal."
        }
      ];
    }
  }
  
  // Judaism quizzes
  if (religion === "Judaism") {
    if (topic.includes("Torah") || topic.includes("Foundations")) {
      return [
        {
          id: "1",
          type: "multiple_choice",
          question: "How many books are in the Torah?",
          options: ["Three", "Five", "Seven", "Ten"],
          correctAnswer: 1,
          explanation: "The Torah consists of five books: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy."
        },
        {
          id: "2",
          type: "true_false",
          question: "Moses is considered the most important prophet in Judaism.",
          correctAnswer: "true",
          explanation: "Moses is revered as the greatest prophet in Judaism, who received the Torah from God."
        },
        {
          id: "3",
          type: "multiple_choice",
          question: "What is the Jewish Sabbath called?",
          options: ["Shabbat", "Pesach", "Sukkot", "Yom Kippur"],
          correctAnswer: 0,
          explanation: "Shabbat is the Jewish Sabbath, observed from Friday evening to Saturday evening."
        },
        {
          id: "4",
          type: "fill_blank",
          question: "The Jewish coming-of-age ceremony is called Bar ___ for boys.",
          correctAnswer: "Mitzvah",
          explanation: "Bar Mitzvah is the coming-of-age ceremony for Jewish boys at age 13."
        },
        {
          id: "5",
          type: "true_false",
          question: "Judaism is one of the world's oldest monotheistic religions.",
          correctAnswer: "true",
          explanation: "Judaism is indeed one of the world's oldest monotheistic religions, believing in one God."
        },
        {
          id: "6",
          type: "multiple_choice",
          question: "What is the holiest day in the Jewish calendar?",
          options: ["Passover", "Rosh Hashanah", "Yom Kippur", "Sukkot"],
          correctAnswer: 2,
          explanation: "Yom Kippur, the Day of Atonement, is the holiest day in the Jewish calendar."
        }
      ];
    }
  }
  
  // Default fallback quiz
  return [
    {
      id: "1",
      type: "multiple_choice",
      question: `What is a key teaching or practice in ${religion}?`,
      options: ["Compassion and wisdom", "Ritual observance", "Community service", "All of the above"],
      correctAnswer: 3,
      explanation: `Most religions, including ${religion}, emphasize compassion, ritual observance, and community service.`
    }
  ];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateQuizResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const requestBody = req.body as GenerateQuizRequest;
    const { religion, topic, difficulty, questionCount = 5 } = requestBody;

    if (!religion || !topic) {
      return res.status(400).json({ 
        success: false, 
        error: "Religion and topic are required" 
      });
    }

    const questions = generateMockQuiz({ religion, topic, difficulty, questionCount });

    res.status(200).json({
      questions: questions.slice(0, questionCount),
      success: true
    });

  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate quiz"
    });
  }
}
