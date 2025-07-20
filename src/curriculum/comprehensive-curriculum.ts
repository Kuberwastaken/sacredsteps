// Comprehensive course curriculum for all religions
// Hand-crafted structure with AI-generated content

export type LearningObjective = {
  id: string;
  description: string;
  assessmentCriteria: string[];
};

export type KeyTerm = {
  term: string;
  definition: string;
  pronunciation?: string;
  etymology?: string;
};

export type CurriculumLesson = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  learningObjectives: LearningObjective[];
  keyTerms: KeyTerm[];
  topicsToGenerate: string[]; // Topics for AI to create quiz content
  culturalContext: string[];
  practicalApplications: string[];
  prerequisites?: string[];
};

export type CurriculumUnit = {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  theme: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  lessons: CurriculumLesson[];
  unitAssessment: {
    id: string;
    title: string;
    description: string;
    comprehensiveTopics: string[]; // Topics for final unit assessment
  };
  estimatedWeeks: number;
};

export type ReligionCurriculum = {
  religion: string;
  courseTitle: string;
  description: string;
  totalEstimatedWeeks: number;
  prerequisiteKnowledge: string[];
  learningOutcomes: string[];
  units: CurriculumUnit[];
  culturalSensitivityGuidelines: string[];
  academicSources: string[];
};

// CHRISTIANITY CURRICULUM
export const christianityCurriculum: ReligionCurriculum = {
  religion: "Christianity",
  courseTitle: "Introduction to Christianity: Faith, History, and Practice",
  description: "A comprehensive exploration of Christian beliefs, practices, history, and contemporary expressions from an academic perspective.",
  totalEstimatedWeeks: 24,
  prerequisiteKnowledge: [],
  learningOutcomes: [
    "Understand core Christian doctrines and their theological foundations",
    "Trace the historical development of Christianity from its origins to the present",
    "Analyze different Christian denominations and their distinctive practices",
    "Appreciate the cultural and social impact of Christianity worldwide",
    "Examine the role of Christianity in contemporary global issues"
  ],
  units: [
    {
      id: "chr-unit-1",
      unitNumber: 1,
      title: "Origins and Foundations",
      description: "The birth of Christianity in 1st century Palestine",
      theme: "Historical Origins",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "chr-1-1",
          title: "Historical Context of 1st Century Palestine",
          description: "Understanding the Jewish, Roman, and Hellenistic context",
          difficulty: "beginner",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-1-1-obj-1",
              description: "Identify key political and religious groups in 1st century Palestine",
              assessmentCriteria: ["Can name and describe Pharisees, Sadducees, Essenes, Zealots", "Explains Roman occupation context"]
            },
            {
              id: "chr-1-1-obj-2", 
              description: "Analyze the socio-economic conditions that influenced early Christianity",
              assessmentCriteria: ["Describes economic disparities", "Explains religious tensions"]
            }
          ],
          keyTerms: [
            { term: "Pharisees", definition: "Jewish religious party emphasizing oral law and tradition" },
            { term: "Sadducees", definition: "Jewish priestly aristocracy associated with the Temple" },
            { term: "Messiah", definition: "Hebrew term meaning 'anointed one,' referring to expected deliverer" },
            { term: "Diaspora", definition: "Jewish communities living outside of Palestine" },
            { term: "Sanhedrin", definition: "Jewish high court and governing body in Jerusalem" }
          ],
          topicsToGenerate: [
            "Political groups in 1st century Palestine and their beliefs",
            "Roman occupation and its impact on Jewish society",
            "Economic conditions in ancient Palestine",
            "Religious expectations and messianic hopes",
            "Temple worship and Jewish religious practices"
          ],
          culturalContext: [
            "Jewish religious festivals and their significance",
            "Role of the Temple in Jewish life",
            "Oral tradition and written Torah"
          ],
          practicalApplications: [
            "Understanding historical context when reading New Testament",
            "Appreciating Jewish roots of Christianity"
          ]
        },
        {
          id: "chr-1-2",
          title: "The Life and Teachings of Jesus",
          description: "Historical Jesus and his core message",
          difficulty: "beginner",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "chr-1-2-obj-1",
              description: "Summarize the key events in Jesus's life according to Gospel accounts",
              assessmentCriteria: ["Lists major events chronologically", "Identifies different Gospel perspectives"]
            },
            {
              id: "chr-1-2-obj-2",
              description: "Analyze the central themes of Jesus's teachings",
              assessmentCriteria: ["Explains parables and their meanings", "Describes ethical teachings"]
            }
          ],
          keyTerms: [
            { term: "Gospel", definition: "Good news; refers to the first four books of the New Testament" },
            { term: "Parable", definition: "Short allegorical story designed to illustrate moral or spiritual lesson" },
            { term: "Kingdom of God", definition: "Central theme of Jesus's teaching about God's reign" },
            { term: "Beatitudes", definition: "Series of blessings spoken by Jesus in the Sermon on the Mount" },
            { term: "Crucifixion", definition: "Roman method of execution; manner of Jesus's death" }
          ],
          topicsToGenerate: [
            "Major events in Jesus's life and ministry",
            "Parables of Jesus and their meanings",
            "Ethical teachings and moral principles",
            "Miracles and their significance in Gospel narratives",
            "Jesus's relationships with different social groups"
          ],
          culturalContext: [
            "First-century Jewish teaching methods",
            "Social stratification in ancient Palestine",
            "Women's roles in ancient society"
          ],
          practicalApplications: [
            "Christian ethics in daily life",
            "Social justice themes in Jesus's teachings"
          ]
        },
        {
          id: "chr-1-3",
          title: "Death, Resurrection, and Early Church",
          description: "The crucifixion, resurrection claims, and birth of the Church",
          difficulty: "beginner",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-1-3-obj-1",
              description: "Explain the Christian understanding of Jesus's death and resurrection",
              assessmentCriteria: ["Describes crucifixion events", "Explains resurrection significance"]
            },
            {
              id: "chr-1-3-obj-2",
              description: "Analyze the formation and growth of the early Christian community",
              assessmentCriteria: ["Describes Pentecost and early church practices", "Explains missionary activities"]
            }
          ],
          keyTerms: [
            { term: "Resurrection", definition: "Christian belief that Jesus rose from the dead" },
            { term: "Pentecost", definition: "Jewish festival when Holy Spirit descended on disciples" },
            { term: "Apostle", definition: "One sent forth; refers to Jesus's twelve disciples and early missionaries" },
            { term: "Martyr", definition: "One who suffers death for their faith" },
            { term: "Baptism", definition: "Christian ritual of initiation involving water" }
          ],
          topicsToGenerate: [
            "Events of Jesus's crucifixion and their significance",
            "Resurrection accounts and early Christian claims",
            "Pentecost and the birth of the Church",
            "Early Christian practices and community life",
            "Persecution and martyrdom in early Christianity"
          ],
          culturalContext: [
            "Roman crucifixion practices",
            "Jewish festival of Pentecost",
            "Early Christian worship practices"
          ],
          practicalApplications: [
            "Understanding Christian sacraments",
            "Community building and fellowship"
          ]
        }
      ],
      unitAssessment: {
        id: "chr-unit-1-assessment",
        title: "Origins and Foundations Assessment",
        description: "Comprehensive evaluation of understanding Christian origins",
        comprehensiveTopics: [
          "Historical context and its influence on early Christianity",
          "Jesus's life, teachings, and their significance",
          "Formation and characteristics of the early Church",
          "Key figures and events in Christian origins",
          "Cultural and religious background of 1st century Palestine"
        ]
      }
    },
    {
      id: "chr-unit-2",
      unitNumber: 2,
      title: "Sacred Texts and Core Beliefs",
      description: "The Bible, fundamental doctrines, and theological concepts",
      theme: "Scripture and Doctrine",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600", 
      borderColor: "border-green-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "chr-2-1",
          title: "The Christian Bible: Structure and Formation",
          description: "Understanding biblical canon, composition, and interpretation",
          difficulty: "beginner",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "chr-2-1-obj-1",
              description: "Identify the structure and organization of the Christian Bible",
              assessmentCriteria: ["Names major sections", "Explains Old/New Testament relationship"]
            },
            {
              id: "chr-2-1-obj-2",
              description: "Understand the process of biblical canon formation",
              assessmentCriteria: ["Describes canonization process", "Explains criteria for inclusion"]
            }
          ],
          keyTerms: [
            { term: "Canon", definition: "Authoritative collection of biblical books" },
            { term: "Old Testament", definition: "Christian term for Hebrew Bible/Tanakh" },
            { term: "New Testament", definition: "27-book collection of early Christian writings" },
            { term: "Septuagint", definition: "Greek translation of Hebrew Bible" },
            { term: "Apocrypha", definition: "Books included in some biblical canons but not others" }
          ],
          topicsToGenerate: [
            "Structure and organization of biblical books",
            "Process of biblical canon formation",
            "Different biblical translations and versions",
            "Methods of biblical interpretation",
            "Authority and inspiration of Scripture in Christian belief"
          ],
          culturalContext: [
            "Ancient manuscript preservation",
            "Role of councils in canon formation",
            "Oral tradition and written text"
          ],
          practicalApplications: [
            "Biblical literacy and study methods",
            "Understanding different Bible translations"
          ]
        },
        {
          id: "chr-2-2",
          title: "Core Christian Doctrines",
          description: "Trinity, salvation, incarnation, and fundamental beliefs",
          difficulty: "intermediate",
          estimatedMinutes: 55,
          learningObjectives: [
            {
              id: "chr-2-2-obj-1",
              description: "Explain the doctrine of the Trinity and its development",
              assessmentCriteria: ["Defines Trinity concept", "Explains historical development"]
            },
            {
              id: "chr-2-2-obj-2",
              description: "Analyze Christian understanding of salvation and grace",
              assessmentCriteria: ["Explains salvation concepts", "Describes role of grace and faith"]
            }
          ],
          keyTerms: [
            { term: "Trinity", definition: "Christian doctrine of God as Father, Son, and Holy Spirit" },
            { term: "Incarnation", definition: "Christian belief that God became human in Jesus Christ" },
            { term: "Salvation", definition: "Deliverance from sin and its consequences" },
            { term: "Grace", definition: "Unmerited favor and love of God toward humanity" },
            { term: "Atonement", definition: "Reconciliation between God and humanity through Christ" }
          ],
          topicsToGenerate: [
            "Trinity doctrine and its biblical foundations",
            "Incarnation and the dual nature of Christ",
            "Salvation by grace through faith",
            "Concepts of sin and redemption",
            "Role of the Holy Spirit in Christian life"
          ],
          culturalContext: [
            "Early theological controversies",
            "Development of creeds and confessions",
            "Influence of Greek philosophy on theology"
          ],
          practicalApplications: [
            "Personal faith and spiritual life",
            "Christian worship and prayer"
          ],
          prerequisites: ["chr-1-1", "chr-1-2", "chr-1-3"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-2-assessment",
        title: "Sacred Texts and Core Beliefs Assessment",
        description: "Evaluation of biblical knowledge and doctrinal understanding",
        comprehensiveTopics: [
          "Biblical structure, canon formation, and interpretation",
          "Core Christian doctrines and their development",
          "Trinity, incarnation, and salvation concepts",
          "Role of Scripture in Christian faith and practice",
          "Historical development of Christian theology"
        ]
      }
    },
    {
      id: "chr-unit-3",
      unitNumber: 3,
      title: "Historical Development",
      description: "Church history from early centuries to medieval period",
      theme: "Historical Growth",
      backgroundColor: "bg-blue-400",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "chr-3-1",
          title: "Early Church and Roman Empire",
          description: "Christianity's spread and relationship with Roman authority",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "chr-3-1-obj-1",
              description: "Trace the geographical and cultural spread of early Christianity",
              assessmentCriteria: ["Maps Christian expansion", "Explains cultural adaptations"]
            },
            {
              id: "chr-3-1-obj-2",
              description: "Analyze the relationship between early Christians and Roman authorities",
              assessmentCriteria: ["Describes persecution periods", "Explains Constantinian shift"]
            }
          ],
          keyTerms: [
            { term: "Constantine", definition: "Roman emperor who legalized Christianity (313 CE)" },
            { term: "Edict of Milan", definition: "313 CE decree granting religious tolerance" },
            { term: "Church Fathers", definition: "Early Christian theologians and bishops" },
            { term: "Persecution", definition: "Systematic oppression of Christians by Roman authorities" },
            { term: "Martyrdom", definition: "Death suffered for one's faith" }
          ],
          topicsToGenerate: [
            "Missionary journeys and Christian expansion",
            "Roman persecution of Christians and reasons",
            "Constantine's conversion and its impact",
            "Early Church Fathers and their contributions",
            "Development of church organization and hierarchy"
          ],
          culturalContext: [
            "Roman religious practices and imperial cult",
            "Social status of early Christians",
            "Urban vs. rural Christianity"
          ],
          practicalApplications: [
            "Understanding religious freedom and tolerance",
            "Church-state relationships in modern contexts"
          ],
          prerequisites: ["chr-1-3", "chr-2-1"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-3-assessment",
        title: "Historical Development Assessment",
        description: "Evaluation of church history knowledge",
        comprehensiveTopics: [
          "Early Christian expansion and cultural adaptation",
          "Roman persecution and Christian responses",
          "Constantine and the transformation of Christianity",
          "Development of church institutions and leadership",
          "Early theological controversies and resolutions"
        ]
      }
    }
    // Additional units would continue...
  ],
  culturalSensitivityGuidelines: [
    "Present diverse Christian traditions respectfully",
    "Acknowledge historical conflicts and their complexity",
    "Avoid proselytizing or presenting one tradition as superior",
    "Include voices from different cultural contexts",
    "Address negative historical events honestly and sensitively"
  ],
  academicSources: [
    "Bart D. Ehrman - The New Testament: A Historical Introduction",
    "Jaroslav Pelikan - The Christian Tradition (5 volumes)",
    "Bruce M. Metzger - The Canon of the New Testament",
    "Henry Chadwick - The Early Church",
    "Diarmaid MacCulloch - Christianity: The First Three Thousand Years"
  ]
};

// ISLAM CURRICULUM
export const islamCurriculum: ReligionCurriculum = {
  religion: "Islam",
  courseTitle: "Introduction to Islam: Faith, Practice, and Civilization",
  description: "A comprehensive study of Islamic beliefs, practices, history, and contributions to world civilization.",
  totalEstimatedWeeks: 24,
  prerequisiteKnowledge: [],
  learningOutcomes: [
    "Understand core Islamic beliefs and the Five Pillars",
    "Analyze the Quran and Hadith as sources of Islamic guidance",
    "Trace Islamic history from origins to global expansion",
    "Appreciate Islamic contributions to science, philosophy, and arts",
    "Examine contemporary Islamic practice and diversity"
  ],
  units: [
    {
      id: "isl-unit-1",
      unitNumber: 1,
      title: "Foundations of Islam",
      description: "Origins of Islam in 7th century Arabia",
      theme: "Origins and Revelation",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-1-1",
          title: "Pre-Islamic Arabia and Context",
          description: "Understanding Arabian society, culture, and religion before Islam",
          difficulty: "beginner",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-1-1-obj-1",
              description: "Describe the social, economic, and religious conditions of pre-Islamic Arabia",
              assessmentCriteria: ["Explains tribal society structure", "Describes trade networks", "Identifies religious practices"]
            },
            {
              id: "isl-1-1-obj-2",
              description: "Analyze the factors that influenced the emergence of Islam",
              assessmentCriteria: ["Connects social conditions to religious needs", "Explains cultural context"]
            }
          ],
          keyTerms: [
            { term: "Jahiliyyah", definition: "Islamic term for pre-Islamic period, often translated as 'Age of Ignorance'" },
            { term: "Bedouin", definition: "Nomadic Arab peoples of the desert" },
            { term: "Kaaba", definition: "Sacred shrine in Mecca, central to pre-Islamic and Islamic worship" },
            { term: "Hanif", definition: "Pre-Islamic monotheists in Arabia" },
            { term: "Quraysh", definition: "Powerful tribe that controlled Mecca and its trade" }
          ],
          topicsToGenerate: [
            "Tribal society and social structure in pre-Islamic Arabia",
            "Trade routes and economic life in ancient Arabia",
            "Religious beliefs and practices before Islam",
            "Role of Mecca as a religious and commercial center",
            "Social problems and inequalities in pre-Islamic society"
          ],
          culturalContext: [
            "Oral poetry and literary traditions",
            "Honor codes and tribal customs",
            "Role of women in pre-Islamic society"
          ],
          practicalApplications: [
            "Understanding historical context of Quranic revelations",
            "Appreciating social reforms introduced by Islam"
          ]
        },
        {
          id: "isl-1-2",
          title: "The Life of Prophet Muhammad",
          description: "Biography of Muhammad and the early Muslim community",
          difficulty: "beginner",
          estimatedMinutes: 55,
          learningObjectives: [
            {
              id: "isl-1-2-obj-1",
              description: "Outline major events in Muhammad's life and their significance",
              assessmentCriteria: ["Chronicles key biographical events", "Explains their religious significance"]
            },
            {
              id: "isl-1-2-obj-2",
              description: "Analyze Muhammad's role as prophet, leader, and social reformer",
              assessmentCriteria: ["Describes prophetic mission", "Explains leadership qualities", "Identifies social reforms"]
            }
          ],
          keyTerms: [
            { term: "Muhammad", definition: "Prophet and founder of Islam (c. 570-632 CE)" },
            { term: "Revelation", definition: "Divine communication believed to be received by Muhammad" },
            { term: "Hijra", definition: "Migration from Mecca to Medina in 622 CE, marking start of Islamic calendar" },
            { term: "Umma", definition: "Community of Muslim believers" },
            { term: "Sunnah", definition: "Practices and teachings of Prophet Muhammad" }
          ],
          topicsToGenerate: [
            "Early life and character of Muhammad",
            "First revelations and call to prophethood",
            "Persecution in Mecca and reasons for opposition",
            "Hijra to Medina and establishment of Muslim community",
            "Final years and succession after Muhammad's death"
          ],
          culturalContext: [
            "Arabian concepts of prophecy and revelation",
            "Leadership models in tribal society",
            "Conflict resolution and mediation practices"
          ],
          practicalApplications: [
            "Following prophetic example (Sunnah) in daily life",
            "Leadership principles from Muhammad's example"
          ]
        }
      ],
      unitAssessment: {
        id: "isl-unit-1-assessment",
        title: "Foundations of Islam Assessment",
        description: "Comprehensive evaluation of Islamic origins",
        comprehensiveTopics: [
          "Pre-Islamic Arabian context and its influence on Islam",
          "Muhammad's life, mission, and historical significance",
          "Formation of the early Muslim community",
          "Key events in early Islamic history",
          "Social and religious innovations of early Islam"
        ]
      }
    },
    {
      id: "isl-unit-2",
      unitNumber: 2,
      title: "The Quran and Islamic Beliefs",
      description: "Sacred text, core beliefs, and Five Pillars",
      theme: "Scripture and Faith",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-2-1",
          title: "The Quran: Revelation and Structure",
          description: "Understanding the Quran as Islamic scripture",
          difficulty: "beginner",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "isl-2-1-obj-1",
              description: "Explain Islamic beliefs about the Quran's revelation and compilation",
              assessmentCriteria: ["Describes revelation process", "Explains compilation history"]
            },
            {
              id: "isl-2-1-obj-2",
              description: "Analyze the structure and literary features of the Quran",
              assessmentCriteria: ["Identifies organizational structure", "Describes literary characteristics"]
            }
          ],
          keyTerms: [
            { term: "Quran", definition: "Holy book of Islam, believed to be God's final revelation" },
            { term: "Surah", definition: "Chapter of the Quran (114 total)" },
            { term: "Ayah", definition: "Verse of the Quran" },
            { term: "Revelation", definition: "Divine communication through Angel Gabriel (Jibril)" },
            { term: "Recitation", definition: "Oral transmission and memorization of Quranic text" }
          ],
          topicsToGenerate: [
            "Process of Quranic revelation and its historical context",
            "Compilation and preservation of the Quranic text",
            "Structure and organization of Quranic chapters",
            "Literary features and rhetorical devices in the Quran",
            "Role of memorization and oral tradition"
          ],
          culturalContext: [
            "Oral literary traditions in Arabian culture",
            "Importance of memorization in preserving texts",
            "Calligraphy and artistic expression of Quranic text"
          ],
          practicalApplications: [
            "Quranic recitation and its role in worship",
            "Understanding Quranic interpretation principles"
          ]
        },
        {
          id: "isl-2-2",
          title: "The Five Pillars of Islam",
          description: "Core practices that define Muslim religious life",
          difficulty: "beginner",
          estimatedMinutes: 60,
          learningObjectives: [
            {
              id: "isl-2-2-obj-1",
              description: "Identify and explain each of the Five Pillars",
              assessmentCriteria: ["Names all five pillars", "Explains purpose and practice of each"]
            },
            {
              id: "isl-2-2-obj-2",
              description: "Analyze the role of the Five Pillars in Muslim spiritual and community life",
              assessmentCriteria: ["Connects pillars to spiritual development", "Explains community aspects"]
            }
          ],
          keyTerms: [
            { term: "Shahada", definition: "Declaration of faith: 'There is no god but Allah, and Muhammad is his messenger'" },
            { term: "Salah", definition: "Ritual prayer performed five times daily" },
            { term: "Zakat", definition: "Obligatory charity, typically 2.5% of wealth" },
            { term: "Sawm", definition: "Fasting during the month of Ramadan" },
            { term: "Hajj", definition: "Pilgrimage to Mecca, required once in lifetime if able" }
          ],
          topicsToGenerate: [
            "Shahada and its theological significance",
            "Daily prayers (Salah): times, procedures, and spiritual meaning",
            "Zakat system and principles of Islamic charity",
            "Ramadan fasting: rules, exceptions, and spiritual benefits",
            "Hajj pilgrimage: rituals, history, and contemporary practice"
          ],
          culturalContext: [
            "Community aspects of Islamic worship",
            "Economic implications of zakat system",
            "Global Muslim community and Hajj"
          ],
          practicalApplications: [
            "Daily religious observance and time management",
            "Social responsibility and charitable giving",
            "Spiritual discipline and self-control"
          ]
        }
      ],
      unitAssessment: {
        id: "isl-unit-2-assessment",
        title: "Quran and Islamic Beliefs Assessment",
        description: "Evaluation of understanding of Islamic scripture and practices",
        comprehensiveTopics: [
          "Quranic revelation, compilation, and structure",
          "Five Pillars of Islam and their significance",
          "Core Islamic beliefs about God, prophecy, and afterlife",
          "Role of Quran and Sunnah in Islamic life",
          "Community and individual aspects of Islamic practice"
        ]
      }
    }
    // Additional units continue...
  ],
  culturalSensitivityGuidelines: [
    "Respect Islamic beliefs about Quranic sanctity",
    "Present diverse Islamic traditions and interpretations",
    "Avoid stereotypes and misconceptions",
    "Include contemporary Muslim voices and perspectives",
    "Address Islamophobia and its historical context"
  ],
  academicSources: [
    "John L. Esposito - Islam: The Straight Path",
    "Marshall G.S. Hodgson - The Venture of Islam (3 volumes)",
    "Karen Armstrong - Muhammad: A Prophet for Our Time",
    "Seyyed Hossein Nasr - Islam: Religion, History, and Civilization",
    "Fazlur Rahman - Major Themes of the Quran"
  ]
};

// HINDUISM CURRICULUM
export const hinduismCurriculum: ReligionCurriculum = {
  religion: "Hinduism",
  courseTitle: "Introduction to Hinduism: Traditions, Philosophy, and Practice",
  description: "An exploration of Hindu traditions, philosophical systems, and diverse practices across cultures and time periods.",
  totalEstimatedWeeks: 26,
  prerequisiteKnowledge: [],
  learningOutcomes: [
    "Understand the diversity and complexity of Hindu traditions",
    "Analyze key Hindu philosophical concepts and texts",
    "Appreciate Hindu contributions to world thought and culture",
    "Examine contemporary Hindu practice and global presence",
    "Understand the relationship between Hinduism and Indian civilization"
  ],
  units: [
    {
      id: "hin-unit-1",
      unitNumber: 1,
      title: "Origins and Foundations",
      description: "Ancient roots and early development of Hindu traditions",
      theme: "Ancient Foundations",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "hin-1-1",
          title: "Indus Valley Civilization and Vedic Period",
          description: "Prehistoric and early historic foundations",
          difficulty: "beginner",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "hin-1-1-obj-1",
              description: "Describe archaeological evidence from Indus Valley Civilization",
              assessmentCriteria: ["Identifies key archaeological sites", "Describes urban planning and artifacts"]
            },
            {
              id: "hin-1-1-obj-2",
              description: "Analyze the Vedic period and its cultural significance",
              assessmentCriteria: ["Explains Vedic society and religion", "Describes Indo-Aryan migrations"]
            }
          ],
          keyTerms: [
            { term: "Indus Valley Civilization", definition: "Bronze Age civilization in South Asia (c. 3300-1300 BCE)" },
            { term: "Vedic Period", definition: "Period of Indian history associated with Vedic Sanskrit texts (c. 1500-500 BCE)" },
            { term: "Indo-Aryans", definition: "Speakers of Indo-Aryan languages who migrated to Indian subcontinent" },
            { term: "Veda", definition: "Ancient Sanskrit texts forming foundation of Hindu tradition" },
            { term: "Brahmin", definition: "Priestly class in traditional Hindu society" }
          ],
          topicsToGenerate: [
            "Archaeological evidence from Harappa and Mohenjo-daro",
            "Vedic society, rituals, and religious practices",
            "Development of caste system and social hierarchy",
            "Transition from Indus Valley to Vedic civilization",
            "Regional variations in early Hindu traditions"
          ],
          culturalContext: [
            "Ancient urban planning and technology",
            "Oral tradition and text preservation",
            "Interaction between different cultural groups"
          ],
          practicalApplications: [
            "Understanding Hindu ritual traditions",
            "Appreciating cultural continuity and change"
          ]
        },
        {
          id: "hin-1-2",
          title: "The Four Vedas and Vedic Literature",
          description: "Sacred texts and their significance in Hindu tradition",
          difficulty: "beginner",
          estimatedMinutes: 55,
          learningObjectives: [
            {
              id: "hin-1-2-obj-1",
              description: "Identify the four Vedas and their distinctive characteristics",
              assessmentCriteria: ["Names four Vedas", "Explains content and purpose of each"]
            },
            {
              id: "hin-1-2-obj-2",
              description: "Analyze the role of Vedic literature in Hindu thought and practice",
              assessmentCriteria: ["Explains authority of Vedas", "Describes their influence on later traditions"]
            }
          ],
          keyTerms: [
            { term: "Rig Veda", definition: "Oldest Veda, collection of hymns to various deities" },
            { term: "Sama Veda", definition: "Veda of melodies and chants" },
            { term: "Yajur Veda", definition: "Veda of sacrificial formulas" },
            { term: "Atharva Veda", definition: "Veda of magical formulas and everyday concerns" },
            { term: "Upanishads", definition: "Philosophical texts exploring ultimate reality" }
          ],
          topicsToGenerate: [
            "Content and themes of each Veda",
            "Vedic deities and their characteristics",
            "Ritual practices and sacrificial system",
            "Development from Vedas to Upanishads",
            "Oral transmission and textual preservation"
          ],
          culturalContext: [
            "Ancient Indian educational systems",
            "Role of memory in preserving tradition",
            "Relationship between text and practice"
          ],
          practicalApplications: [
            "Understanding Hindu scripture and authority",
            "Appreciating oral tradition and learning"
          ]
        }
      ],
      unitAssessment: {
        id: "hin-unit-1-assessment",
        title: "Origins and Foundations Assessment",
        description: "Evaluation of understanding Hindu origins and early texts",
        comprehensiveTopics: [
          "Archaeological and historical evidence for Hindu origins",
          "Vedic period society, culture, and religion",
          "Four Vedas and their significance",
          "Development of early Hindu traditions",
          "Continuity and change in ancient Indian civilization"
        ]
      }
    },
    {
      id: "hin-unit-2",
      unitNumber: 2,
      title: "Core Concepts and Philosophy",
      description: "Fundamental Hindu concepts: dharma, karma, moksha, and philosophical schools",
      theme: "Philosophy and Concepts",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 4,
      lessons: [
        {
          id: "hin-2-1",
          title: "Dharma, Karma, and Samsara",
          description: "Core concepts governing Hindu understanding of life and ethics",
          difficulty: "intermediate",
          estimatedMinutes: 60,
          learningObjectives: [
            {
              id: "hin-2-1-obj-1",
              description: "Explain the concept of dharma and its applications",
              assessmentCriteria: ["Defines dharma", "Explains contextual applications", "Describes relationship to social duty"]
            },
            {
              id: "hin-2-1-obj-2",
              description: "Analyze the law of karma and cycle of samsara",
              assessmentCriteria: ["Explains karma and its operation", "Describes cycle of rebirth", "Connects to moral responsibility"]
            }
          ],
          keyTerms: [
            { term: "Dharma", definition: "Righteous duty, natural law, and proper way of living" },
            { term: "Karma", definition: "Action and its consequences, law of cause and effect" },
            { term: "Samsara", definition: "Cycle of birth, death, and rebirth" },
            { term: "Moksha", definition: "Liberation from cycle of rebirth, ultimate spiritual goal" },
            { term: "Varna", definition: "Social class system in traditional Hindu society" }
          ],
          topicsToGenerate: [
            "Different types of dharma and their applications",
            "Karma theory and moral responsibility",
            "Cycle of samsara and factors affecting rebirth",
            "Relationship between dharma, karma, and moksha",
            "Social ethics and individual responsibility"
          ],
          culturalContext: [
            "Hindu concepts of time and cosmology",
            "Social organization and duty",
            "Individual vs. social obligations"
          ],
          practicalApplications: [
            "Ethical decision-making in daily life",
            "Understanding Hindu approaches to justice",
            "Personal responsibility and social harmony"
          ]
        }
      ],
      unitAssessment: {
        id: "hin-unit-2-assessment",
        title: "Core Concepts and Philosophy Assessment",
        description: "Evaluation of understanding fundamental Hindu concepts",
        comprehensiveTopics: [
          "Dharma concept and its various applications",
          "Karma and samsara in Hindu thought",
          "Major philosophical schools and their differences",
          "Relationship between individual and cosmic order",
          "Ethics and spiritual goals in Hindu tradition"
        ]
      }
    }
  ],
  culturalSensitivityGuidelines: [
    "Acknowledge diversity within Hindu traditions",
    "Avoid oversimplification of complex concepts",
    "Present both historical and contemporary perspectives",
    "Respect Hindu sacred texts and practices",
    "Address colonialism's impact on understanding Hinduism"
  ],
  academicSources: [
    "Gavin Flood - An Introduction to Hinduism",
    "Klaus K. Klostermaier - A Survey of Hinduism",
    "Wendy Doniger - The Hindus: An Alternative History",
    "Julius Lipner - Hindus: Their Religious Beliefs and Practices",
    "Barbara Stoler Miller - The Bhagavad-Gita"
  ]
};

// BUDDHISM CURRICULUM
export const buddhismCurriculum: ReligionCurriculum = {
  religion: "Buddhism",
  courseTitle: "Introduction to Buddhism: Path to Enlightenment",
  description: "A comprehensive study of Buddhist teachings, practices, and traditions across different cultures.",
  totalEstimatedWeeks: 24,
  prerequisiteKnowledge: [],
  learningOutcomes: [
    "Understand core Buddhist teachings and their historical development",
    "Analyze different Buddhist schools and their distinctive practices",
    "Appreciate Buddhist contributions to philosophy, art, and culture",
    "Examine contemporary Buddhist practice and global spread",
    "Understand meditation and mindfulness in Buddhist context"
  ],
  units: [
    {
      id: "bud-unit-1",
      unitNumber: 1,
      title: "The Buddha and His Teachings",
      description: "Life of Siddhartha Gautama and foundational teachings",
      theme: "Historical Buddha",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "bud-1-1",
          title: "Life of Siddhartha Gautama",
          description: "Historical Buddha's life, enlightenment, and early teaching",
          difficulty: "beginner",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "bud-1-1-obj-1",
              description: "Narrate key events in Buddha's life and their significance",
              assessmentCriteria: ["Describes major biographical events", "Explains their spiritual significance"]
            },
            {
              id: "bud-1-1-obj-2",
              description: "Analyze the Buddha's enlightenment experience and its implications",
              assessmentCriteria: ["Explains enlightenment under Bodhi tree", "Describes Buddha's initial reluctance to teach"]
            }
          ],
          keyTerms: [
            { term: "Siddhartha Gautama", definition: "Historical name of the Buddha (c. 563-483 BCE)" },
            { term: "Buddha", definition: "'Awakened One' - title given to one who achieves enlightenment" },
            { term: "Enlightenment", definition: "Complete understanding of reality and liberation from suffering" },
            { term: "Bodhi Tree", definition: "Sacred fig tree under which Buddha achieved enlightenment" },
            { term: "Middle Way", definition: "Buddha's approach avoiding extremes of indulgence and asceticism" }
          ],
          topicsToGenerate: [
            "Buddha's early life as Prince Siddhartha",
            "Four Sights and the decision to seek enlightenment",
            "Six years of spiritual seeking and ascetic practices",
            "Enlightenment experience and understanding of reality",
            "First sermon and establishment of the Sangha"
          ],
          culturalContext: [
            "Ancient Indian religious and philosophical context",
            "Social conditions in 6th century BCE India",
            "Competing spiritual traditions and teachers"
          ],
          practicalApplications: [
            "Understanding spiritual seeking and transformation",
            "Applying Middle Way principles to daily life"
          ]
        },
        {
          id: "bud-1-2",
          title: "The Four Noble Truths",
          description: "Buddha's fundamental diagnosis of human condition and path to liberation",
          difficulty: "beginner",
          estimatedMinutes: 55,
          learningObjectives: [
            {
              id: "bud-1-2-obj-1",
              description: "Explain each of the Four Noble Truths and their logical relationship",
              assessmentCriteria: ["States each truth accurately", "Explains logical progression", "Gives practical examples"]
            },
            {
              id: "bud-1-2-obj-2",
              description: "Analyze the Buddhist understanding of suffering and its causes",
              assessmentCriteria: ["Defines dukkha comprehensively", "Explains three types of suffering", "Describes psychological causes"]
            }
          ],
          keyTerms: [
            { term: "Four Noble Truths", definition: "Buddha's core teaching about suffering and its cessation" },
            { term: "Dukkha", definition: "Suffering, dissatisfaction, or unsatisfactoriness" },
            { term: "Tanha", definition: "Craving or thirst - cause of suffering" },
            { term: "Nirvana", definition: "Cessation of suffering, ultimate goal of Buddhist practice" },
            { term: "Eightfold Path", definition: "Buddha's prescription for ending suffering" }
          ],
          topicsToGenerate: [
            "First Noble Truth: nature and types of suffering",
            "Second Noble Truth: craving and attachment as causes",
            "Third Noble Truth: possibility of suffering's end",
            "Fourth Noble Truth: Eightfold Path as solution",
            "Practical application of Four Noble Truths"
          ],
          culturalContext: [
            "Medical metaphor in Buddhist teaching",
            "Comparison with other ancient philosophies",
            "Practical psychology and mental training"
          ],
          practicalApplications: [
            "Identifying and understanding personal suffering",
            "Recognizing patterns of craving and attachment",
            "Developing realistic expectations and contentment"
          ]
        }
      ],
      unitAssessment: {
        id: "bud-unit-1-assessment",
        title: "Buddha and His Teachings Assessment",
        description: "Evaluation of understanding Buddha's life and core teachings",
        comprehensiveTopics: [
          "Historical Buddha's life and spiritual journey",
          "Four Noble Truths and their significance",
          "Buddhist understanding of human condition",
          "Enlightenment and liberation concepts",
          "Early Buddhist community formation"
        ]
      }
    }
  ],
  culturalSensitivityGuidelines: [
    "Present Buddhism as diverse tradition with multiple schools",
    "Respect Buddhist sacred symbols and practices",
    "Avoid appropriation while encouraging understanding",
    "Include contemporary Buddhist voices and perspectives",
    "Address Western Buddhist adaptations thoughtfully"
  ],
  academicSources: [
    "Peter Harvey - An Introduction to Buddhism",
    "Richard Gombrich - Theravada Buddhism",
    "Paul Williams - Mahayana Buddhism",
    "Donald Lopez - The Story of Buddhism",
    "Thich Nhat Hanh - The Heart of Buddhist Meditation"
  ]
};

// JUDAISM CURRICULUM
export const judaismCurriculum: ReligionCurriculum = {
  religion: "Judaism",
  courseTitle: "Introduction to Judaism: Covenant, Law, and Community",
  description: "A comprehensive study of Jewish history, beliefs, practices, and contributions to world civilization.",
  totalEstimatedWeeks: 25,
  prerequisiteKnowledge: [],
  learningOutcomes: [
    "Understand Jewish history from ancient times to present",
    "Analyze Hebrew Bible and Jewish interpretive traditions",
    "Appreciate Jewish contributions to ethics, law, and culture",
    "Examine contemporary Jewish practice and communities",
    "Understand the relationship between Judaism and other Abrahamic faiths"
  ],
  units: [
    {
      id: "jud-unit-1",
      unitNumber: 1,
      title: "Biblical Foundations",
      description: "Hebrew Bible, patriarchs, and covenant tradition",
      theme: "Ancient Foundations",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "jud-1-1",
          title: "Abraham and the Covenant",
          description: "Foundational narratives and covenant theology",
          difficulty: "beginner",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "jud-1-1-obj-1",
              description: "Explain the Abrahamic covenant and its significance",
              assessmentCriteria: ["Describes covenant terms", "Explains theological significance", "Connects to later Jewish thought"]
            },
            {
              id: "jud-1-1-obj-2",
              description: "Analyze the role of patriarchs in Jewish identity formation",
              assessmentCriteria: ["Identifies key patriarchal narratives", "Explains their significance", "Describes their influence on Jewish self-understanding"]
            }
          ],
          keyTerms: [
            { term: "Abraham", definition: "First patriarch and recipient of divine covenant" },
            { term: "Covenant", definition: "Sacred agreement between God and chosen people" },
            { term: "Patriarch", definition: "Founding fathers of Jewish people (Abraham, Isaac, Jacob)" },
            { term: "Promised Land", definition: "Land of Canaan promised to Abraham and descendants" },
            { term: "Circumcision", definition: "Sign of covenant performed on male children" }
          ],
          topicsToGenerate: [
            "Abraham's call and journey from Mesopotamia",
            "Covenant ceremonies and their symbolism",
            "Isaac, Jacob, and development of patriarchal traditions",
            "Promises of land, descendants, and blessing",
            "Archaeological and historical context of patriarchal period"
          ],
          culturalContext: [
            "Ancient Near Eastern covenant traditions",
            "Nomadic life and tribal structures",
            "Religious practices in ancient Canaan"
          ],
          practicalApplications: [
            "Understanding Jewish identity and chosenness",
            "Covenant concepts in modern Jewish thought"
          ]
        }
      ],
      unitAssessment: {
        id: "jud-unit-1-assessment",
        title: "Biblical Foundations Assessment",
        description: "Evaluation of understanding Jewish biblical foundations",
        comprehensiveTopics: [
          "Abrahamic covenant and its significance",
          "Patriarchal narratives and their meaning",
          "Hebrew Bible structure and authority",
          "Ancient Israelite religion and practices",
          "Formation of Jewish identity and community"
        ]
      }
    }
  ],
  culturalSensitivityGuidelines: [
    "Present Jewish diversity across time and geography",
    "Address antisemitism and its historical impact",
    "Respect Jewish religious practices and beliefs",
    "Include contemporary Jewish voices and perspectives",
    "Avoid supersessionist or replacement theology"
  ],
  academicSources: [
    "Jacob Neusner - The Way of Torah",
    "David Biale - Cultures of the Jews",
    "Michael Meyer - Response to Modernity",
    "Jonathan Sarna - American Judaism",
    "Marc-Alain Ouaknin - The Burnt Book"
  ]
};

// Export all curricula
export const allCurricula = {
  Christianity: christianityCurriculum,
  Islam: islamCurriculum,
  Hinduism: hinduismCurriculum,
  Buddhism: buddhismCurriculum,
  Judaism: judaismCurriculum,
};
