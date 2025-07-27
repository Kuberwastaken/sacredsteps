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
  totalEstimatedWeeks: 48,
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
    },
    {
      id: "chr-unit-4",
      unitNumber: 4,
      title: "Medieval Christianity and Monasticism",
      description: "The rise of monasticism, medieval theology, and church power",
      theme: "Medieval Period",
      backgroundColor: "bg-purple-400",
      textColor: "text-purple-600",
      borderColor: "border-purple-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-4-1",
          title: "The Rise of Monasticism",
          description: "Benedict's Rule and the spread of monastic communities",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-4-1-obj-1",
              description: "Understand the origins and purpose of Christian monasticism",
              assessmentCriteria: ["Explains monastic vows", "Describes Benedict's Rule"]
            }
          ],
          keyTerms: [
            { term: "Monasticism", definition: "Religious way of life characterized by withdrawal from worldly concerns" },
            { term: "Benedict", definition: "Saint who wrote the influential Rule for monastic life" },
            { term: "Abbey", definition: "Monastery ruled by an abbot or abbess" }
          ],
          topicsToGenerate: [
            "Origins of Christian monasticism in the desert",
            "Benedict's Rule and its influence",
            "Daily life in medieval monasteries",
            "Monastic contributions to learning and culture"
          ],
          culturalContext: ["Medieval European society", "Preservation of classical knowledge"],
          practicalApplications: ["Understanding contemplative spirituality", "Community living principles"]
        },
        {
          id: "chr-4-2",
          title: "Medieval Theology and Scholasticism",
          description: "Thomas Aquinas and the synthesis of faith and reason",
          difficulty: "advanced",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "chr-4-2-obj-1",
              description: "Analyze the development of scholastic theology",
              assessmentCriteria: ["Explains Aquinas's method", "Describes faith-reason relationship"]
            }
          ],
          keyTerms: [
            { term: "Scholasticism", definition: "Medieval method of theological and philosophical inquiry" },
            { term: "Thomas Aquinas", definition: "13th-century theologian who synthesized Aristotle and Christianity" },
            { term: "Natural Law", definition: "Moral principles accessible through human reason" }
          ],
          topicsToGenerate: [
            "Aquinas's Five Ways to prove God's existence",
            "Integration of Aristotelian philosophy",
            "Medieval universities and education",
            "Debates between faith and reason"
          ],
          culturalContext: ["Medieval university system", "Islamic philosophical influence"],
          practicalApplications: ["Critical thinking about faith", "Academic theology methods"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-4-assessment",
        title: "Medieval Christianity Assessment",
        description: "Understanding of medieval Christian developments",
        comprehensiveTopics: [
          "Monastic life and its impact on Christianity",
          "Scholastic theology and its methods",
          "Medieval church institutions"
        ]
      }
    },
    {
      id: "chr-unit-5",
      unitNumber: 5,
      title: "The Protestant Reformation",
      description: "Luther, Calvin, and the transformation of Christianity",
      theme: "Reformation",
      backgroundColor: "bg-orange-400",
      textColor: "text-orange-600",
      borderColor: "border-orange-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "chr-5-1",
          title: "Martin Luther and the 95 Theses",
          description: "The spark that ignited the Protestant Reformation",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-5-1-obj-1",
              description: "Understand the causes and key events of the Protestant Reformation",
              assessmentCriteria: ["Explains Luther's objections", "Describes indulgences controversy"]
            }
          ],
          keyTerms: [
            { term: "Indulgences", definition: "Payments for reduction of punishment for sins" },
            { term: "95 Theses", definition: "Luther's list of debate topics about church practices" },
            { term: "Sola Scriptura", definition: "Protestant principle of Scripture alone as authority" }
          ],
          topicsToGenerate: [
            "Causes of the Protestant Reformation",
            "Luther's theological innovations",
            "The printing press and Reformation spread",
            "Political and social factors in the Reformation"
          ],
          culturalContext: ["Late medieval church corruption", "Rise of nationalism"],
          practicalApplications: ["Understanding religious reform movements", "Scripture-based Christianity"]
        },
        {
          id: "chr-5-2",
          title: "Calvin and Reformed Theology",
          description: "Predestination, Geneva, and Calvinist influence",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "chr-5-2-obj-1",
              description: "Analyze Calvinist theology and its distinctive features",
              assessmentCriteria: ["Explains predestination doctrine", "Describes Calvin's Geneva"]
            }
          ],
          keyTerms: [
            { term: "Predestination", definition: "Doctrine that God has predetermined who will be saved" },
            { term: "John Calvin", definition: "French theologian and reformer based in Geneva" },
            { term: "Theocracy", definition: "Government ruled by religious authority" }
          ],
          topicsToGenerate: [
            "Calvin's Institutes of the Christian Religion",
            "Geneva as a model Christian city",
            "Reformed theology's spread to other countries",
            "Calvinist work ethic and capitalism"
          ],
          culturalContext: ["Swiss Reformation", "Puritan influence in England and America"],
          practicalApplications: ["Understanding different Protestant traditions", "Work and calling concepts"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-5-assessment",
        title: "Protestant Reformation Assessment",
        description: "Comprehensive understanding of Reformation movements",
        comprehensiveTopics: [
          "Luther's theology and the German Reformation",
          "Calvin's reforms and their global impact",
          "Protestant principles and their consequences"
        ]
      }
    },
    {
      id: "chr-unit-6",
      unitNumber: 6,
      title: "Catholic Counter-Reformation",
      description: "Catholic response and renewal after Protestant challenges",
      theme: "Counter-Reformation",
      backgroundColor: "bg-red-400",
      textColor: "text-red-600",
      borderColor: "border-red-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-6-1",
          title: "Council of Trent and Catholic Reforms",
          description: "Catholic Church's response to Protestant criticisms",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-6-1-obj-1",
              description: "Understand Catholic Counter-Reformation strategies",
              assessmentCriteria: ["Explains Trent's decisions", "Describes Catholic reforms"]
            }
          ],
          keyTerms: [
            { term: "Council of Trent", definition: "Catholic council that addressed Protestant challenges" },
            { term: "Counter-Reformation", definition: "Catholic response to Protestant Reformation" },
            { term: "Jesuits", definition: "Catholic religious order founded by Ignatius Loyola" }
          ],
          topicsToGenerate: [
            "Decisions of the Council of Trent",
            "Jesuit missionary activities",
            "Catholic art and architecture",
            "Inquisition and church discipline"
          ],
          culturalContext: ["Baroque art and Catholic spirituality", "Global Catholic missions"],
          practicalApplications: ["Understanding Catholic-Protestant differences", "Missionary work principles"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-6-assessment",
        title: "Counter-Reformation Assessment",
        description: "Catholic responses to Protestant challenges",
        comprehensiveTopics: [
          "Trent's theological and practical reforms",
          "Jesuit contributions to Catholic renewal",
          "Art, culture, and Catholic identity"
        ]
      }
    },
    {
      id: "chr-unit-7",
      unitNumber: 7,
      title: "Christianity in the New World",
      description: "Colonial Christianity and denominational diversity",
      theme: "Colonial Period",
      backgroundColor: "bg-yellow-400",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-7-1",
          title: "Puritans and Religious Freedom",
          description: "Massachusetts Bay Colony and religious experimentation",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-7-1-obj-1",
              description: "Analyze early American Christian communities",
              assessmentCriteria: ["Describes Puritan society", "Explains religious diversity"]
            }
          ],
          keyTerms: [
            { term: "Puritans", definition: "English Protestants seeking to purify the Church of England" },
            { term: "Religious Liberty", definition: "Freedom to practice religion without government interference" },
            { term: "Great Awakening", definition: "18th-century revival movement in American Christianity" }
          ],
          topicsToGenerate: [
            "Puritan theology and society",
            "Religious diversity in colonial America",
            "First Great Awakening revivals",
            "Separation of church and state principles"
          ],
          culturalContext: ["Colonial American society", "Enlightenment influence on religion"],
          practicalApplications: ["Understanding American religious freedom", "Evangelicalism and revivals"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-7-assessment",
        title: "Colonial Christianity Assessment",
        description: "Christianity in early America",
        comprehensiveTopics: [
          "Puritan influence on American Christianity",
          "Religious diversity and freedom",
          "Revival movements and their impact"
        ]
      }
    },
    {
      id: "chr-unit-8",
      unitNumber: 8,
      title: "Modern Missions and Global Christianity",
      description: "19th-20th century missionary movements worldwide",
      theme: "Global Expansion",
      backgroundColor: "bg-teal-400",
      textColor: "text-teal-600",
      borderColor: "border-teal-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-8-1",
          title: "The Great Century of Missions",
          description: "Protestant missionary expansion in the 19th century",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-8-1-obj-1",
              description: "Understand modern Christian missionary movements",
              assessmentCriteria: ["Describes missionary strategies", "Explains global Christian growth"]
            }
          ],
          keyTerms: [
            { term: "Missionary", definition: "Person sent to spread religious faith in foreign lands" },
            { term: "Indigenization", definition: "Adapting Christianity to local cultures" },
            { term: "World Christianity", definition: "Christianity as a global, multicultural religion" }
          ],
          topicsToGenerate: [
            "Protestant missionary societies",
            "Christianity in Africa and Asia",
            "Medical and educational missions",
            "Cultural adaptation and indigenous churches"
          ],
          culturalContext: ["Colonialism and Christianity", "Cultural exchange and syncretism"],
          practicalApplications: ["Cross-cultural ministry", "Global Christian awareness"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-8-assessment",
        title: "Global Christianity Assessment", 
        description: "Understanding worldwide Christian expansion",
        comprehensiveTopics: [
          "19th-century missionary movements",
          "Christianity's adaptation to different cultures",
          "Global Christian diversity today"
        ]
      }
    },
    {
      id: "chr-unit-9",
      unitNumber: 9,
      title: "Christian Worship and Sacraments",
      description: "Liturgy, sacraments, and spiritual practices",
      theme: "Worship and Practice",
      backgroundColor: "bg-indigo-400",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-9-1",
          title: "Christian Liturgy and Worship",
          description: "Forms of Christian worship across traditions",
          difficulty: "beginner",
          estimatedMinutes: 40,
          learningObjectives: [
            {
              id: "chr-9-1-obj-1",
              description: "Compare different Christian worship traditions",
              assessmentCriteria: ["Describes liturgical elements", "Explains worship diversity"]
            }
          ],
          keyTerms: [
            { term: "Liturgy", definition: "Formal public worship service" },
            { term: "Eucharist", definition: "Christian sacrament of communion" },
            { term: "Baptism", definition: "Christian initiation sacrament" }
          ],
          topicsToGenerate: [
            "Elements of Christian worship services",
            "Differences between liturgical and non-liturgical traditions",
            "The Christian calendar and seasons",
            "Music and art in Christian worship"
          ],
          culturalContext: ["Historical development of liturgy", "Cultural influences on worship"],
          practicalApplications: ["Participating in Christian worship", "Understanding sacramental life"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-9-assessment",
        title: "Worship and Sacraments Assessment",
        description: "Understanding Christian spiritual practices",
        comprehensiveTopics: [
          "Liturgical traditions and their elements",
          "Sacramental theology and practice",
          "Worship diversity across denominations"
        ]
      }
    },
    {
      id: "chr-unit-10",
      unitNumber: 10,
      title: "Christian Ethics and Social Justice",
      description: "Christian approaches to moral and social issues",
      theme: "Ethics and Justice",
      backgroundColor: "bg-pink-400",
      textColor: "text-pink-600",
      borderColor: "border-pink-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "chr-10-1",
          title: "Biblical Ethics and Moral Teaching",
          description: "Christian approaches to ethical decision-making",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-10-1-obj-1",
              description: "Understand Christian ethical frameworks",
              assessmentCriteria: ["Explains biblical ethics", "Applies Christian moral principles"]
            }
          ],
          keyTerms: [
            { term: "Christian Ethics", definition: "Moral principles derived from Christian faith" },
            { term: "Social Gospel", definition: "Movement applying Christian ethics to social problems" },
            { term: "Liberation Theology", definition: "Theology emphasizing social justice for the poor" }
          ],
          topicsToGenerate: [
            "Sermon on the Mount as ethical foundation",
            "Christian approaches to war and peace",
            "Economic justice and Christian teaching",
            "Environmental stewardship and creation care"
          ],
          culturalContext: ["Christian responses to social issues", "Faith-based activism"],
          practicalApplications: ["Ethical decision-making", "Christian social responsibility"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-10-assessment",
        title: "Christian Ethics Assessment",
        description: "Understanding Christian moral and social teaching",
        comprehensiveTopics: [
          "Biblical foundations of Christian ethics",
          "Christian responses to social justice issues",
          "Contemporary moral challenges"
        ]
      }
    },
    {
      id: "chr-unit-11",
      unitNumber: 11,
      title: "Christian Denominations and Traditions",
      description: "Catholic, Orthodox, and Protestant diversity",
      theme: "Denominational Diversity",
      backgroundColor: "bg-green-500",
      textColor: "text-green-700",
      borderColor: "border-green-600",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "chr-11-1",
          title: "Roman Catholicism",
          description: "Catholic theology, structure, and global influence",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "chr-11-1-obj-1",
              description: "Understand Catholic distinctives and global presence",
              assessmentCriteria: ["Explains papal authority", "Describes Catholic sacraments"]
            }
          ],
          keyTerms: [
            { term: "Pope", definition: "Bishop of Rome and head of the Catholic Church" },
            { term: "Vatican", definition: "Papal residence and center of Catholic administration" },
            { term: "Magisterium", definition: "Teaching authority of the Catholic Church" }
          ],
          topicsToGenerate: [
            "Catholic Church structure and hierarchy",
            "Seven sacraments in Catholic theology",
            "Catholic social teaching",
            "Vatican II and modern Catholicism"
          ],
          culturalContext: ["Global Catholic presence", "Pope's role in world affairs"],
          practicalApplications: ["Understanding Catholic practices", "Interfaith dialogue with Catholics"]
        },
        {
          id: "chr-11-2",
          title: "Eastern Orthodox Christianity",
          description: "Orthodox theology, liturgy, and cultural traditions",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-11-2-obj-1",
              description: "Understand Orthodox Christianity's distinctive features",
              assessmentCriteria: ["Explains Orthodox theology", "Describes liturgical traditions"]
            }
          ],
          keyTerms: [
            { term: "Orthodox", definition: "Eastern Christian churches in communion with Constantinople" },
            { term: "Icons", definition: "Religious images used in Orthodox worship" },
            { term: "Patriarch", definition: "Senior bishop in Orthodox churches" }
          ],
          topicsToGenerate: [
            "Great Schism between East and West",
            "Orthodox theology and spirituality",
            "Icon veneration and theology",
            "Orthodox churches around the world"
          ],
          culturalContext: ["Byzantine heritage", "Orthodox countries and cultures"],
          practicalApplications: ["Understanding Orthodox spirituality", "Eastern Christian traditions"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-11-assessment",
        title: "Christian Denominations Assessment",
        description: "Understanding major Christian traditions",
        comprehensiveTopics: [
          "Catholic Church structure and teachings",
          "Orthodox Christianity and its distinctives",
          "Comparison of major Christian traditions"
        ]
      }
    },
    {
      id: "chr-unit-12",
      unitNumber: 12,
      title: "Protestant Denominations",
      description: "Lutheran, Reformed, Anglican, and other Protestant churches",
      theme: "Protestant Diversity",
      backgroundColor: "bg-blue-500",
      textColor: "text-blue-700",
      borderColor: "border-blue-600",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-12-1",
          title: "Lutheran and Reformed Churches",
          description: "Theological distinctives of major Protestant traditions",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-12-1-obj-1",
              description: "Compare Lutheran and Reformed theological emphases",
              assessmentCriteria: ["Explains Lutheran distinctives", "Describes Reformed theology"]
            }
          ],
          keyTerms: [
            { term: "Lutheran", definition: "Protestant churches following Martin Luther's teachings" },
            { term: "Reformed", definition: "Protestant churches in the Calvinist tradition" },
            { term: "Anglican", definition: "Church of England and related churches" }
          ],
          topicsToGenerate: [
            "Lutheran theology and church structure",
            "Reformed churches and Calvinist influence",
            "Anglican via media and episcopal structure",
            "Presbyterian and congregational polity"
          ],
          culturalContext: ["Protestant state churches", "Denominational diversity in America"],
          practicalApplications: ["Understanding Protestant diversity", "Church governance models"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-12-assessment",
        title: "Protestant Denominations Assessment",
        description: "Understanding Protestant church diversity",
        comprehensiveTopics: [
          "Lutheran, Reformed, and Anglican distinctives",
          "Protestant church governance",
          "Theological differences among Protestants"
        ]
      }
    },
    {
      id: "chr-unit-13",
      unitNumber: 13,
      title: "Christian Spirituality and Mysticism",
      description: "Prayer, contemplation, and spiritual disciplines",
      theme: "Spiritual Life",
      backgroundColor: "bg-purple-500",
      textColor: "text-purple-700",
      borderColor: "border-purple-600",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-13-1",
          title: "Christian Prayer and Meditation",
          description: "Forms of Christian spiritual practice",
          difficulty: "beginner",
          estimatedMinutes: 40,
          learningObjectives: [
            {
              id: "chr-13-1-obj-1",
              description: "Understand Christian spiritual disciplines",
              assessmentCriteria: ["Describes prayer forms", "Explains contemplative practices"]
            }
          ],
          keyTerms: [
            { term: "Contemplation", definition: "Deep spiritual reflection and prayer" },
            { term: "Lectio Divina", definition: "Traditional method of scriptural reading and meditation" },
            { term: "Mysticism", definition: "Direct, experiential knowledge of God" }
          ],
          topicsToGenerate: [
            "Types of Christian prayer",
            "Contemplative traditions in Christianity",
            "Spiritual disciplines and their purposes",
            "Christian mystics throughout history"
          ],
          culturalContext: ["Monastic spiritual traditions", "Contemporary spirituality movements"],
          practicalApplications: ["Personal prayer life", "Spiritual formation practices"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-13-assessment",
        title: "Christian Spirituality Assessment",
        description: "Understanding Christian spiritual practices",
        comprehensiveTopics: [
          "Prayer and meditation in Christian tradition",
          "Spiritual disciplines and their benefits",
          "Mystical traditions in Christianity"
        ]
      }
    },
    {
      id: "chr-unit-14",
      unitNumber: 14,
      title: "Christianity and Science",
      description: "Faith and reason, evolution, and modern scientific challenges",
      theme: "Faith and Science",
      backgroundColor: "bg-cyan-400",
      textColor: "text-cyan-600",
      borderColor: "border-cyan-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-14-1",
          title: "Christianity and Scientific Discovery",
          description: "Historical relationship between Christian faith and science",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-14-1-obj-1",
              description: "Analyze Christianity's relationship with scientific inquiry",
              assessmentCriteria: ["Explains historical interactions", "Describes contemporary debates"]
            }
          ],
          keyTerms: [
            { term: "Natural Theology", definition: "Study of God through observation of nature" },
            { term: "Intelligent Design", definition: "Argument that life shows evidence of purposeful design" },
            { term: "Theistic Evolution", definition: "Belief that God used evolution as a means of creation" }
          ],
          topicsToGenerate: [
            "Christian contributions to scientific development",
            "Galileo affair and its lessons",
            "Evolution and Christian responses",
            "Contemporary science-faith dialogue"
          ],
          culturalContext: ["Scientific revolution and Christianity", "Modern science-religion debates"],
          practicalApplications: ["Integrating faith and scientific knowledge", "Addressing science-faith tensions"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-14-assessment",
        title: "Christianity and Science Assessment",
        description: "Understanding faith-science interactions",
        comprehensiveTopics: [
          "Historical Christian contributions to science",
          "Contemporary science-faith debates",
          "Different Christian approaches to scientific findings"
        ]
      }
    },
    {
      id: "chr-unit-15",
      unitNumber: 15,
      title: "Women in Christianity",
      description: "Biblical women, female saints, and women's roles",
      theme: "Women's Contributions",
      backgroundColor: "bg-rose-400",
      textColor: "text-rose-600",
      borderColor: "border-rose-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-15-1",
          title: "Women in Early Christianity",
          description: "Biblical women and early Christian female leaders",
          difficulty: "beginner",
          estimatedMinutes: 40,
          learningObjectives: [
            {
              id: "chr-15-1-obj-1",
              description: "Understand women's roles in early Christian communities",
              assessmentCriteria: ["Identifies key biblical women", "Explains early female leadership"]
            }
          ],
          keyTerms: [
            { term: "Mary of Nazareth", definition: "Mother of Jesus, central figure in Christianity" },
            { term: "Mary Magdalene", definition: "Follower of Jesus, first witness to resurrection" },
            { term: "Phoebe", definition: "Deacon mentioned by Paul in Romans" }
          ],
          topicsToGenerate: [
            "Women in Jesus's ministry",
            "Female leaders in early Christian churches",
            "Women martyrs and their significance",
            "Changing roles of women in church history"
          ],
          culturalContext: ["First-century women's status", "Early Christian community dynamics"],
          practicalApplications: ["Understanding gender roles in Christianity", "Women's ministry today"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-15-assessment",
        title: "Women in Christianity Assessment",
        description: "Understanding women's contributions to Christianity",
        comprehensiveTopics: [
          "Biblical women and their significance",
          "Female saints and martyrs",
          "Contemporary women's roles in churches"
        ]
      }
    },
    {
      id: "chr-unit-16",
      unitNumber: 16,
      title: "Christian Art and Culture",
      description: "Christian influence on art, music, and literature",
      theme: "Arts and Culture",
      backgroundColor: "bg-amber-400",
      textColor: "text-amber-600",
      borderColor: "border-amber-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-16-1",
          title: "Christian Art Through the Ages",
          description: "From catacombs to contemporary Christian art",
          difficulty: "beginner",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-16-1-obj-1",
              description: "Trace the development of Christian artistic expression",
              assessmentCriteria: ["Identifies artistic periods", "Explains religious symbolism"]
            }
          ],
          keyTerms: [
            { term: "Iconoclasm", definition: "Destruction of religious images" },
            { term: "Gothic Architecture", definition: "Medieval architectural style with pointed arches" },
            { term: "Renaissance Art", definition: "15th-16th century artistic revival with Christian themes" }
          ],
          topicsToGenerate: [
            "Early Christian symbolism in art",
            "Byzantine icons and their theology",
            "Gothic cathedrals and their meaning",
            "Renaissance Christian masterpieces"
          ],
          culturalContext: ["Art as religious expression", "Patronage and church building"],
          practicalApplications: ["Appreciating religious art", "Understanding artistic symbolism"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-16-assessment",
        title: "Christian Art and Culture Assessment",
        description: "Understanding Christian cultural contributions",
        comprehensiveTopics: [
          "Development of Christian artistic traditions",
          "Architecture and church building",
          "Christian themes in literature and music"
        ]
      }
    },
    {
      id: "chr-unit-17",
      unitNumber: 17,
      title: "Contemporary Christianity",
      description: "Modern movements, challenges, and global Christianity",
      theme: "Modern Christianity",
      backgroundColor: "bg-lime-400",
      textColor: "text-lime-600",
      borderColor: "border-lime-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "chr-17-1",
          title: "20th Century Christian Movements",
          description: "Pentecostalism, ecumenism, and liberation theology",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "chr-17-1-obj-1",
              description: "Understand major 20th-century Christian developments",
              assessmentCriteria: ["Explains Pentecostal growth", "Describes ecumenical movement"]
            }
          ],
          keyTerms: [
            { term: "Pentecostalism", definition: "Christian movement emphasizing spiritual gifts" },
            { term: "Ecumenism", definition: "Movement toward Christian unity" },
            { term: "Liberation Theology", definition: "Theology emphasizing God's preferential option for the poor" }
          ],
          topicsToGenerate: [
            "Growth of Pentecostal and charismatic Christianity",
            "World Council of Churches and ecumenical dialogue",
            "Liberation theology in Latin America",
            "African and Asian theological developments"
          ],
          culturalContext: ["20th-century social changes", "Decolonization and indigenous theology"],
          practicalApplications: ["Understanding contemporary Christian diversity", "Interfaith and ecumenical relations"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-17-assessment",
        title: "Contemporary Christianity Assessment",
        description: "Understanding modern Christian movements",
        comprehensiveTopics: [
          "20th-century Christian innovations",
          "Global Christianity and its diversity",
          "Contemporary challenges and responses"
        ]
      }
    },
    {
      id: "chr-unit-18",
      unitNumber: 18,
      title: "Christianity and Other Religions",
      description: "Interfaith relations and religious dialogue",
      theme: "Interfaith Relations",
      backgroundColor: "bg-violet-400",
      textColor: "text-violet-600",
      borderColor: "border-violet-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-18-1",
          title: "Christian-Jewish Relations",
          description: "Historical tensions and modern dialogue",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-18-1-obj-1",
              description: "Understand Christian-Jewish relations throughout history",
              assessmentCriteria: ["Explains historical tensions", "Describes modern dialogue efforts"]
            }
          ],
          keyTerms: [
            { term: "Supersessionism", definition: "Belief that Christianity has replaced Judaism" },
            { term: "Interfaith Dialogue", definition: "Conversation between different religious traditions" },
            { term: "Dual Covenant", definition: "Theology recognizing continuing validity of Jewish covenant" }
          ],
          topicsToGenerate: [
            "Jewish roots of Christianity",
            "History of Christian antisemitism",
            "Post-Holocaust Christian reflection",
            "Contemporary Jewish-Christian dialogue"
          ],
          culturalContext: ["Holocaust and its impact on Christian theology", "State of Israel and Christian responses"],
          practicalApplications: ["Interfaith understanding", "Combating religious prejudice"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-18-assessment",
        title: "Interfaith Relations Assessment",
        description: "Understanding Christianity's relationship with other religions",
        comprehensiveTopics: [
          "Christian-Jewish relations and dialogue",
          "Christian responses to religious diversity",
          "Interfaith cooperation and understanding"
        ]
      }
    },
    {
      id: "chr-unit-19",
      unitNumber: 19,
      title: "Christian Social Action",
      description: "Charity, justice, and Christian responses to world problems",
      theme: "Social Action",
      backgroundColor: "bg-emerald-400",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-19-1",
          title: "Christian Charity and Social Services",
          description: "Christian organizations serving human needs",
          difficulty: "beginner",
          estimatedMinutes: 40,
          learningObjectives: [
            {
              id: "chr-19-1-obj-1",
              description: "Understand Christian approaches to social service",
              assessmentCriteria: ["Identifies Christian aid organizations", "Explains theological motivations"]
            }
          ],
          keyTerms: [
            { term: "Charity", definition: "Christian love expressed through helping others" },
            { term: "Diaconia", definition: "Christian ministry of service to those in need" },
            { term: "Social Gospel", definition: "Christian movement applying gospel to social problems" }
          ],
          topicsToGenerate: [
            "History of Christian charitable work",
            "Major Christian aid organizations",
            "Faith-based approaches to poverty",
            "Christian responses to global crises"
          ],
          culturalContext: ["Christian hospitals and schools", "Faith-based nonprofits"],
          practicalApplications: ["Christian service and volunteerism", "Faith-motivated social action"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-19-assessment",
        title: "Christian Social Action Assessment",
        description: "Understanding Christian service to society",
        comprehensiveTopics: [
          "Christian charitable traditions",
          "Faith-based social services",
          "Christian responses to injustice"
        ]
      }
    },
    {
      id: "chr-unit-20",
      unitNumber: 20,
      title: "Future of Christianity",
      description: "Trends, challenges, and opportunities for Christianity",
      theme: "Future Directions",
      backgroundColor: "bg-gray-400",
      textColor: "text-gray-600",
      borderColor: "border-gray-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "chr-20-1",
          title: "Christianity in the Digital Age",
          description: "Technology, online faith communities, and digital ministry",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-20-1-obj-1",
              description: "Analyze how technology affects Christian practice",
              assessmentCriteria: ["Describes digital ministry", "Explains online faith communities"]
            }
          ],
          keyTerms: [
            { term: "Digital Ministry", definition: "Use of technology for religious purposes" },
            { term: "Virtual Church", definition: "Online religious services and communities" },
            { term: "Religious Technology", definition: "Applications of technology to religious practice" }
          ],
          topicsToGenerate: [
            "Online worship and virtual churches",
            "Social media and religious communication",
            "Digital Bibles and religious apps",
            "Challenges of faith in digital age"
          ],
          culturalContext: ["COVID-19 and accelerated digital adoption", "Generational differences in technology use"],
          practicalApplications: ["Using technology for spiritual growth", "Digital evangelism and outreach"]
        },
        {
          id: "chr-20-2",
          title: "Global Trends in Christianity",
          description: "Demographic shifts and future challenges",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "chr-20-2-obj-1",
              description: "Understand current trends affecting Christianity's future",
              assessmentCriteria: ["Describes demographic trends", "Identifies future challenges"]
            }
          ],
          keyTerms: [
            { term: "Global South", definition: "Regions where Christianity is rapidly growing" },
            { term: "Secularization", definition: "Decline of religious influence in society" },
            { term: "Post-Christendom", definition: "Society no longer dominated by Christian culture" }
          ],
          topicsToGenerate: [
            "Growth of Christianity in Africa and Asia",
            "Decline in Western Christian adherence",
            "Climate change and Christian responses",
            "Future challenges for Christian faith"
          ],
          culturalContext: ["Globalization and religious change", "Secular societies and religion"],
          practicalApplications: ["Adapting to changing religious landscape", "Future ministry preparation"]
        }
      ],
      unitAssessment: {
        id: "chr-unit-20-assessment",
        title: "Future of Christianity Assessment",
        description: "Understanding Christianity's future directions",
        comprehensiveTopics: [
          "Technology's impact on Christian practice",
          "Global demographic trends in Christianity",
          "Future challenges and opportunities"
        ]
      }
    }
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
  totalEstimatedWeeks: 48,
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
    },
    {
      id: "isl-unit-3",
      unitNumber: 3,
      title: "Islamic History and Expansion",
      description: "Early Islamic conquests and the development of Islamic civilization",
      theme: "Historical Development",
      backgroundColor: "bg-blue-400",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-3-1",
          title: "The Rashidun Caliphate",
          description: "The first four Caliphs and early Islamic expansion",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "isl-3-1-obj-1",
              description: "Understand the succession after Muhammad and establishment of Caliphate",
              assessmentCriteria: ["Explains succession issues", "Describes Caliphate system"]
            }
          ],
          keyTerms: [
            { term: "Caliph", definition: "Successor to Prophet Muhammad as leader of Muslim community" },
            { term: "Rashidun", definition: "The 'Rightly-Guided' first four Caliphs" },
            { term: "Abu Bakr", definition: "First Caliph (632-634 CE)" },
            { term: "Umar ibn al-Khattab", definition: "Second Caliph (634-644 CE)" },
            { term: "Futuhat", definition: "Islamic conquests and expansion" }
          ],
          topicsToGenerate: [
            "Succession crisis after Muhammad's death",
            "Abu Bakr and the Ridda Wars",
            "Umar's administrative innovations",
            "Early Islamic conquests in Iraq and Syria",
            "Othman and the compilation of the Quran"
          ],
          culturalContext: ["Byzantine and Sasanian empires", "Arab tribal confederation"],
          practicalApplications: ["Understanding Islamic governance", "Leadership succession principles"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-3-assessment",
        title: "Islamic History Assessment",
        description: "Understanding early Islamic political development",
        comprehensiveTopics: [
          "Rashidun Caliphate and its achievements",
          "Early Islamic expansion and its causes",
          "Administrative and military innovations"
        ]
      }
    },
    {
      id: "isl-unit-4",
      unitNumber: 4,
      title: "Islamic Law and Jurisprudence",
      description: "Sharia, Islamic legal schools, and jurisprudential development",
      theme: "Islamic Law",
      backgroundColor: "bg-purple-400",
      textColor: "text-purple-600",
      borderColor: "border-purple-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-4-1",
          title: "Sources of Islamic Law",
          description: "Quran, Sunnah, and methods of Islamic jurisprudence",
          difficulty: "intermediate",
          estimatedMinutes: 55,
          learningObjectives: [
            {
              id: "isl-4-1-obj-1",
              description: "Identify the primary sources of Islamic law",
              assessmentCriteria: ["Names four main sources", "Explains their hierarchy and application"]
            }
          ],
          keyTerms: [
            { term: "Sharia", definition: "Islamic law derived from Quran and Sunnah" },
            { term: "Fiqh", definition: "Islamic jurisprudence and legal interpretation" },
            { term: "Ijma", definition: "Scholarly consensus as source of law" },
            { term: "Qiyas", definition: "Analogical reasoning in Islamic law" },
            { term: "Madhab", definition: "School of Islamic jurisprudence" }
          ],
          topicsToGenerate: [
            "Quran as primary source of Islamic law",
            "Hadith and Sunnah in legal reasoning",
            "Methods of legal interpretation",
            "Four major Sunni legal schools",
            "Shia approaches to Islamic law"
          ],
          culturalContext: ["Legal traditions in pre-Islamic Arabia", "Influence of Roman and Persian law"],
          practicalApplications: ["Understanding Islamic legal reasoning", "Contemporary application of Sharia"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-4-assessment",
        title: "Islamic Law Assessment",
        description: "Understanding Islamic legal principles",
        comprehensiveTopics: [
          "Sources and methodology of Islamic law",
          "Development of legal schools",
          "Contemporary debates about Sharia"
        ]
      }
    },
    {
      id: "isl-unit-5",
      unitNumber: 5,
      title: "Islamic Theology and Philosophy",
      description: "Kalam, Islamic philosophy, and theological debates",
      theme: "Theology and Philosophy",
      backgroundColor: "bg-indigo-400",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-5-1",
          title: "Islamic Theology (Kalam)",
          description: "Development of Islamic theological thought",
          difficulty: "advanced",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "isl-5-1-obj-1",
              description: "Understand major theological schools in Islam",
              assessmentCriteria: ["Compares Ash'ari and Maturidi schools", "Explains theological debates"]
            }
          ],
          keyTerms: [
            { term: "Kalam", definition: "Islamic scholastic theology" },
            { term: "Ash'ari", definition: "Sunni theological school emphasizing divine predestination" },
            { term: "Maturidi", definition: "Sunni theological school balancing free will and predestination" },
            { term: "Mu'tazila", definition: "Early theological school emphasizing reason and justice" },
            { term: "Tawhid", definition: "Doctrine of divine unity" }
          ],
          topicsToGenerate: [
            "Development of Islamic theology",
            "Free will vs. predestination debates",
            "Attributes of God in Islamic thought",
            "Reason and revelation in Islam",
            "Islamic philosophical traditions"
          ],
          culturalContext: ["Greek philosophical influence", "Translation movement"],
          practicalApplications: ["Understanding Islamic worldview", "Interfaith theological dialogue"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-5-assessment",
        title: "Islamic Theology Assessment",
        description: "Understanding Islamic theological development",
        comprehensiveTopics: [
          "Major theological schools and their differences",
          "Key theological debates in Islamic history",
          "Integration of reason and revelation"
        ]
      }
    },
    {
      id: "isl-unit-6",
      unitNumber: 6,
      title: "Sunni and Shia Islam",
      description: "The major division in Islam and its historical development",
      theme: "Sectarian Divisions",
      backgroundColor: "bg-orange-400",
      textColor: "text-orange-600",
      borderColor: "border-orange-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-6-1",
          title: "Origins of Sunni-Shia Split",
          description: "Historical causes and development of the major Islamic division",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-6-1-obj-1",
              description: "Explain the origins and development of Sunni-Shia division",
              assessmentCriteria: ["Describes succession dispute", "Explains theological differences"]
            }
          ],
          keyTerms: [
            { term: "Sunni", definition: "Majority branch of Islam following elected Caliphs" },
            { term: "Shia", definition: "Branch of Islam following Ali and his descendants" },
            { term: "Ali ibn Abi Talib", definition: "Fourth Caliph and first Shia Imam" },
            { term: "Imam", definition: "Shia religious leader descended from Ali" },
            { term: "Karbala", definition: "Site of Hussein's martyrdom, central to Shia identity" }
          ],
          topicsToGenerate: [
            "Succession dispute after Muhammad's death",
            "Battle of Karbala and its significance",
            "Development of Shia theology",
            "Sunni concepts of leadership",
            "Contemporary Sunni-Shia relations"
          ],
          culturalContext: ["Political struggles in early Islam", "Regional concentrations of Sunni and Shia"],
          practicalApplications: ["Understanding Islamic diversity", "Contemporary Middle Eastern politics"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-6-assessment",
        title: "Sunni-Shia Assessment",
        description: "Understanding Islamic sectarian differences",
        comprehensiveTopics: [
          "Historical origins of Sunni-Shia split",
          "Theological and practical differences",
          "Contemporary sectarian dynamics"
        ]
      }
    },
    {
      id: "isl-unit-7",
      unitNumber: 7,
      title: "Islamic Golden Age",
      description: "Scientific, philosophical, and cultural achievements",
      theme: "Intellectual Flourishing",
      backgroundColor: "bg-yellow-400",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-7-1",
          title: "Islamic Science and Medicine",
          description: "Contributions to mathematics, astronomy, and medicine",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "isl-7-1-obj-1",
              description: "Understand Islamic contributions to science and medicine",
              assessmentCriteria: ["Names key scientists", "Explains scientific innovations"]
            }
          ],
          keyTerms: [
            { term: "Al-Khwarizmi", definition: "Mathematician who developed algebra" },
            { term: "Ibn Sina", definition: "Physician and philosopher (Avicenna)" },
            { term: "Al-Razi", definition: "Physician who distinguished smallpox from measles" },
            { term: "House of Wisdom", definition: "Translation and research center in Baghdad" },
            { term: "Bayt al-Hikma", definition: "Arabic name for House of Wisdom" }
          ],
          topicsToGenerate: [
            "Islamic contributions to mathematics and algebra",
            "Advances in astronomy and geography",
            "Medical knowledge and hospital systems",
            "Translation movement and preservation of knowledge",
            "Islamic scientific methodology"
          ],
          culturalContext: ["Abbasid patronage of learning", "Cross-cultural knowledge exchange"],
          practicalApplications: ["Understanding scientific heritage", "Appreciating cross-cultural learning"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-7-assessment",
        title: "Islamic Golden Age Assessment",
        description: "Understanding Islamic intellectual achievements",
        comprehensiveTopics: [
          "Scientific and medical contributions",
          "Philosophical and theological innovations",
          "Cultural and artistic achievements"
        ]
      }
    },
    {
      id: "isl-unit-8",
      unitNumber: 8,
      title: "Islamic Art and Architecture",
      description: "Artistic traditions, calligraphy, and architectural wonders",
      theme: "Arts and Culture",
      backgroundColor: "bg-teal-400",
      textColor: "text-teal-600",
      borderColor: "border-teal-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-8-1",
          title: "Islamic Calligraphy and Geometric Art",
          description: "Visual arts in Islamic culture",
          difficulty: "beginner",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-8-1-obj-1",
              description: "Understand Islamic artistic principles and expressions",
              assessmentCriteria: ["Explains aniconism", "Describes calligraphy styles"]
            }
          ],
          keyTerms: [
            { term: "Calligraphy", definition: "Art of beautiful writing in Islamic culture" },
            { term: "Geometric patterns", definition: "Mathematical designs in Islamic art" },
            { term: "Arabesque", definition: "Stylized plant motifs in Islamic decoration" },
            { term: "Mihrab", definition: "Prayer niche indicating direction of Mecca" },
            { term: "Minaret", definition: "Tower from which call to prayer is made" }
          ],
          topicsToGenerate: [
            "Development of Arabic calligraphy styles",
            "Geometric patterns and their symbolism",
            "Islamic architecture across different regions",
            "Mosque design and its elements",
            "Decorative arts in Islamic culture"
          ],
          culturalContext: ["Islamic attitudes toward representation", "Regional artistic variations"],
          practicalApplications: ["Appreciating Islamic aesthetics", "Understanding sacred space design"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-8-assessment",
        title: "Islamic Art Assessment",
        description: "Understanding Islamic artistic traditions",
        comprehensiveTopics: [
          "Calligraphy and its religious significance",
          "Architectural innovations and styles",
          "Decorative arts and their cultural meaning"
        ]
      }
    },
    {
      id: "isl-unit-9",
      unitNumber: 9,
      title: "Sufism and Islamic Spirituality",
      description: "Mystical dimension of Islam and spiritual practices",
      theme: "Spirituality and Mysticism",
      backgroundColor: "bg-pink-400",
      textColor: "text-pink-600",
      borderColor: "border-pink-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-9-1",
          title: "Sufi Teachings and Practices",
          description: "Islamic mysticism and spiritual development",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "isl-9-1-obj-1",
              description: "Understand Sufi spirituality and its place in Islam",
              assessmentCriteria: ["Explains Sufi concepts", "Describes spiritual practices"]
            }
          ],
          keyTerms: [
            { term: "Sufism", definition: "Mystical dimension of Islam focused on spiritual purification" },
            { term: "Tariqa", definition: "Sufi order or spiritual path" },
            { term: "Sheikh", definition: "Sufi spiritual guide and teacher" },
            { term: "Dhikr", definition: "Remembrance of God through repetitive prayer" },
            { term: "Fana", definition: "Spiritual state of self-annihilation in God" }
          ],
          topicsToGenerate: [
            "Origins and development of Sufism",
            "Major Sufi orders and their practices",
            "Sufi poetry and literature",
            "Relationship between Sufism and orthodox Islam",
            "Contemporary Sufi movements"
          ],
          culturalContext: ["Persian and Turkish Sufi traditions", "Music and dance in worship"],
          practicalApplications: ["Understanding Islamic spirituality", "Contemplative practices"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-9-assessment",
        title: "Sufism Assessment",
        description: "Understanding Islamic mystical traditions",
        comprehensiveTopics: [
          "Sufi teachings and spiritual practices",
          "Major Sufi orders and their contributions",
          "Role of mysticism in Islamic culture"
        ]
      }
    },
    {
      id: "isl-unit-10",
      unitNumber: 10,
      title: "Islamic Ethics and Social Teaching",
      description: "Moral principles and social justice in Islam",
      theme: "Ethics and Society",
      backgroundColor: "bg-red-400",
      textColor: "text-red-600",
      borderColor: "border-red-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-10-1",
          title: "Islamic Business Ethics and Economic Principles",
          description: "Islamic approaches to commerce and economic justice",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-10-1-obj-1",
              description: "Understand Islamic economic and business principles",
              assessmentCriteria: ["Explains Islamic banking", "Describes ethical trading principles"]
            }
          ],
          keyTerms: [
            { term: "Riba", definition: "Interest or usury, prohibited in Islam" },
            { term: "Halal", definition: "Permissible according to Islamic law" },
            { term: "Haram", definition: "Forbidden according to Islamic law" },
            { term: "Islamic Banking", definition: "Sharia-compliant financial services" },
            { term: "Adl", definition: "Divine and social justice" }
          ],
          topicsToGenerate: [
            "Prohibition of interest and its rationale",
            "Islamic banking and finance principles",
            "Business ethics and fair trade",
            "Wealth distribution and social responsibility",
            "Contemporary Islamic economic thought"
          ],
          culturalContext: ["Traditional Islamic commercial practices", "Modern Islamic finance"],
          practicalApplications: ["Ethical business practices", "Social responsibility principles"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-10-assessment",
        title: "Islamic Ethics Assessment",
        description: "Understanding Islamic moral and social teaching",
        comprehensiveTopics: [
          "Islamic economic principles and their application",
          "Business ethics and social responsibility",
          "Contemporary Islamic approaches to social justice"
        ]
      }
    },
    {
      id: "isl-unit-11",
      unitNumber: 11,
      title: "Women in Islam",
      description: "Women's roles, rights, and contributions in Islamic history",
      theme: "Gender and Islam",
      backgroundColor: "bg-rose-400",
      textColor: "text-rose-600",
      borderColor: "border-rose-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-11-1",
          title: "Women in Early Islam",
          description: "Female companions and their roles in early Muslim community",
          difficulty: "beginner",
          estimatedMinutes: 40,
          learningObjectives: [
            {
              id: "isl-11-1-obj-1",
              description: "Understand women's roles in early Islamic history",
              assessmentCriteria: ["Names key female figures", "Explains their contributions"]
            }
          ],
          keyTerms: [
            { term: "Khadijah", definition: "Prophet Muhammad's first wife and first convert" },
            { term: "Aisha", definition: "Prophet's wife and important transmitter of hadith" },
            { term: "Fatimah", definition: "Prophet's daughter and mother of Hassan and Hussein" },
            { term: "Hijab", definition: "Islamic concept of modesty and head covering" },
            { term: "Mahram", definition: "Close male relative with whom marriage is forbidden" }
          ],
          topicsToGenerate: [
            "Women in the life of Prophet Muhammad",
            "Female companions and their achievements",
            "Women's rights in early Islamic law",
            "Education and scholarship among Muslim women",
            "Contemporary debates about women's roles"
          ],
          culturalContext: ["Pre-Islamic status of women", "Legal protections introduced by Islam"],
          practicalApplications: ["Understanding women's contributions to Islam", "Contemporary women's issues"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-11-assessment",
        title: "Women in Islam Assessment",
        description: "Understanding women's roles and contributions",
        comprehensiveTopics: [
          "Historical contributions of Muslim women",
          "Islamic teachings about women's rights",
          "Contemporary debates and interpretations"
        ]
      }
    },
    {
      id: "isl-unit-12",
      unitNumber: 12,
      title: "Islam in Different Cultures",
      description: "Regional variations and cultural adaptations",
      theme: "Cultural Diversity",
      backgroundColor: "bg-cyan-400",
      textColor: "text-cyan-600",
      borderColor: "border-cyan-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-12-1",
          title: "Islam in Southeast Asia",
          description: "Islamic practices in Indonesia, Malaysia, and surrounding regions",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-12-1-obj-1",
              description: "Understand how Islam adapted to Southeast Asian cultures",
              assessmentCriteria: ["Describes cultural adaptations", "Explains regional practices"]
            }
          ],
          keyTerms: [
            { term: "Syncretism", definition: "Blending of Islamic and local religious practices" },
            { term: "Pesantren", definition: "Traditional Islamic boarding schools in Indonesia" },
            { term: "Adat", definition: "Local customs and traditions" },
            { term: "Wali Songo", definition: "Nine saints who spread Islam in Java" },
            { term: "Gamelan", definition: "Traditional Indonesian music, sometimes used in Islamic contexts" }
          ],
          topicsToGenerate: [
            "Spread of Islam to Southeast Asia",
            "Sufi role in Islamic conversion",
            "Integration with Hindu-Buddhist traditions",
            "Contemporary Southeast Asian Islam",
            "Educational traditions and religious schools"
          ],
          culturalContext: ["Maritime trade and Islamic spread", "Hindu-Buddhist cultural heritage"],
          practicalApplications: ["Understanding cultural adaptation", "Religious tolerance and diversity"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-12-assessment",
        title: "Islam and Culture Assessment",
        description: "Understanding cultural variations in Islam",
        comprehensiveTopics: [
          "Regional adaptations of Islamic practice",
          "Cultural syncretism and religious authority",
          "Contemporary challenges and opportunities"
        ]
      }
    },
    {
      id: "isl-unit-13",
      unitNumber: 13,
      title: "Islamic Festivals and Celebrations",
      description: "Religious holidays and their spiritual significance",
      theme: "Festivals and Worship",
      backgroundColor: "bg-amber-400",
      textColor: "text-amber-600",
      borderColor: "border-amber-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-13-1",
          title: "Eid and Islamic Holidays",
          description: "Major Islamic festivals and their significance",
          difficulty: "beginner",
          estimatedMinutes: 40,
          learningObjectives: [
            {
              id: "isl-13-1-obj-1",
              description: "Understand Islamic festivals and their religious meaning",
              assessmentCriteria: ["Describes major festivals", "Explains their significance"]
            }
          ],
          keyTerms: [
            { term: "Eid al-Fitr", definition: "Festival celebrating end of Ramadan" },
            { term: "Eid al-Adha", definition: "Festival of Sacrifice during Hajj season" },
            { term: "Mawlid", definition: "Celebration of Prophet Muhammad's birthday" },
            { term: "Laylat al-Qadr", definition: "Night of Power during Ramadan" },
            { term: "Ashura", definition: "Day of mourning for Shia Muslims" }
          ],
          topicsToGenerate: [
            "Eid celebrations and their rituals",
            "Spiritual significance of Islamic holidays",
            "Community aspects of religious festivals",
            "Regional variations in celebrations",
            "Contemporary observance of Islamic holidays"
          ],
          culturalContext: ["Community gatherings and social bonds", "Cultural expressions of faith"],
          practicalApplications: ["Participating in interfaith celebrations", "Understanding Islamic calendar"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-13-assessment",
        title: "Islamic Festivals Assessment",
        description: "Understanding Islamic religious celebrations",
        comprehensiveTopics: [
          "Major Islamic festivals and their meanings",
          "Community and spiritual aspects of celebrations",
          "Cultural variations in observance"
        ]
      }
    },
    {
      id: "isl-unit-14",
      unitNumber: 14,
      title: "Contemporary Islamic Movements",
      description: "Modern Islamic revival and reform movements",
      theme: "Modern Movements",
      backgroundColor: "bg-lime-400",
      textColor: "text-lime-600",
      borderColor: "border-lime-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-14-1",
          title: "Islamic Revival and Reform",
          description: "18th-20th century movements to renew Islamic practice",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "isl-14-1-obj-1",
              description: "Understand modern Islamic reform and revival movements",
              assessmentCriteria: ["Explains reform motivations", "Describes key movements"]
            }
          ],
          keyTerms: [
            { term: "Salafism", definition: "Movement to return to practices of early Muslims" },
            { term: "Muslim Brotherhood", definition: "20th-century Islamic revivalist organization" },
            { term: "Ijtihad", definition: "Independent reasoning in Islamic law" },
            { term: "Tajdid", definition: "Religious renewal and reform" },
            { term: "Islamic Modernism", definition: "Movement to reconcile Islam with modernity" }
          ],
          topicsToGenerate: [
            "Causes of Islamic revival movements",
            "Key figures in Islamic reform",
            "Different approaches to Islamic renewal",
            "Impact of colonialism on Islamic thought",
            "Contemporary Islamic intellectual movements"
          ],
          culturalContext: ["Response to Western colonialism", "Educational and social reforms"],
          practicalApplications: ["Understanding contemporary Islamic debates", "Reform and tradition tensions"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-14-assessment",
        title: "Contemporary Movements Assessment",
        description: "Understanding modern Islamic movements",
        comprehensiveTopics: [
          "Reform and revival movements and their goals",
          "Response to modernity and Western influence",
          "Contemporary challenges and adaptations"
        ]
      }
    },
    {
      id: "isl-unit-15",
      unitNumber: 15,
      title: "Islam and Science Today",
      description: "Contemporary relationship between Islam and scientific inquiry",
      theme: "Islam and Science",
      backgroundColor: "bg-emerald-400",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-15-1",
          title: "Islamic Perspectives on Modern Science",
          description: "Muslim approaches to contemporary scientific issues",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-15-1-obj-1",
              description: "Understand Islamic perspectives on modern scientific questions",
              assessmentCriteria: ["Explains Islamic science ethics", "Describes contemporary debates"]
            }
          ],
          keyTerms: [
            { term: "Islamic Science", definition: "Scientific inquiry guided by Islamic principles" },
            { term: "Bioethics", definition: "Ethical issues in medicine and biology" },
            { term: "Ijaz", definition: "Scientific miracles claimed in the Quran" },
            { term: "Maslaha", definition: "Public interest in Islamic law" },
            { term: "Technology Ethics", definition: "Islamic approaches to technological development" }
          ],
          topicsToGenerate: [
            "Islam and evolutionary theory",
            "Medical ethics and Islamic law",
            "Environmental stewardship in Islam",
            "Technology and Islamic values",
            "Contemporary Muslim scientists and their contributions"
          ],
          culturalContext: ["Modern Muslim-majority countries and science", "Science education in Islamic contexts"],
          practicalApplications: ["Ethical decision-making in science", "Integrating faith and scientific knowledge"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-15-assessment",
        title: "Islam and Science Assessment",
        description: "Understanding Islamic approaches to modern science",
        comprehensiveTopics: [
          "Islamic ethical principles in science and medicine",
          "Contemporary scientific debates in Muslim contexts",
          "Integration of faith and scientific inquiry"
        ]
      }
    },
    {
      id: "isl-unit-16",
      unitNumber: 16,
      title: "Islam and Other Religions",
      description: "Interfaith relations and religious dialogue",
      theme: "Interfaith Relations",
      backgroundColor: "bg-violet-400",
      textColor: "text-violet-600",
      borderColor: "border-violet-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-16-1",
          title: "People of the Book in Islamic Thought",
          description: "Islamic perspectives on Christianity and Judaism",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-16-1-obj-1",
              description: "Understand Islamic approaches to other religions",
              assessmentCriteria: ["Explains 'People of the Book' concept", "Describes interfaith principles"]
            }
          ],
          keyTerms: [
            { term: "Ahl al-Kitab", definition: "People of the Book - Christians and Jews" },
            { term: "Dhimmi", definition: "Protected religious minorities in Islamic states" },
            { term: "Convivencia", definition: "Coexistence of Muslims, Christians, and Jews in medieval Spain" },
            { term: "Dialogue", definition: "Interfaith conversation and understanding" },
            { term: "Pluralism", definition: "Acceptance of religious diversity" }
          ],
          topicsToGenerate: [
            "Quranic teachings about other religions",
            "Historical coexistence in Islamic societies",
            "Contemporary interfaith dialogue initiatives",
            "Shared values across Abrahamic faiths",
            "Challenges and opportunities in religious relations"
          ],
          culturalContext: ["Medieval Spain and religious coexistence", "Contemporary Middle Eastern conflicts"],
          practicalApplications: ["Interfaith understanding and cooperation", "Religious tolerance and respect"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-16-assessment",
        title: "Interfaith Relations Assessment",
        description: "Understanding Islamic approaches to religious diversity",
        comprehensiveTopics: [
          "Islamic teachings about other religions",
          "Historical examples of religious coexistence",
          "Contemporary interfaith dialogue and cooperation"
        ]
      }
    },
    {
      id: "isl-unit-17",
      unitNumber: 17,
      title: "Muslims in the Modern World",
      description: "Contemporary challenges and Muslim communities globally",
      theme: "Global Islam",
      backgroundColor: "bg-slate-400",
      textColor: "text-slate-600",
      borderColor: "border-slate-500",
      estimatedWeeks: 3,
      lessons: [
        {
          id: "isl-17-1",
          title: "Muslim Minorities in Non-Muslim Countries",
          description: "Challenges and adaptations of diaspora communities",
          difficulty: "intermediate",
          estimatedMinutes: 50,
          learningObjectives: [
            {
              id: "isl-17-1-obj-1",
              description: "Understand challenges facing Muslim minorities",
              assessmentCriteria: ["Identifies key challenges", "Describes adaptation strategies"]
            }
          ],
          keyTerms: [
            { term: "Diaspora", definition: "Muslim communities living outside traditional Islamic lands" },
            { term: "Integration", definition: "Process of adapting to new cultural environments" },
            { term: "Islamophobia", definition: "Prejudice and discrimination against Muslims" },
            { term: "Religious Freedom", definition: "Right to practice religion without interference" },
            { term: "Cultural Identity", definition: "Maintaining religious and cultural heritage" }
          ],
          topicsToGenerate: [
            "Muslim communities in Europe and North America",
            "Challenges of religious practice in secular societies",
            "Educational and social integration issues",
            "Combating prejudice and discrimination",
            "Contributions of Muslim minorities to their societies"
          ],
          culturalContext: ["Immigration and settlement patterns", "Secular governance and religious practice"],
          practicalApplications: ["Building inclusive communities", "Addressing religious discrimination"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-17-assessment",
        title: "Muslims in Modern World Assessment",
        description: "Understanding contemporary Muslim experiences",
        comprehensiveTopics: [
          "Challenges facing Muslim minorities",
          "Adaptation and integration strategies",
          "Contributions to multicultural societies"
        ]
      }
    },
    {
      id: "isl-unit-18",
      unitNumber: 18,
      title: "Islamic Education and Knowledge",
      description: "Traditional and modern approaches to Islamic learning",
      theme: "Education and Learning",
      backgroundColor: "bg-stone-400",
      textColor: "text-stone-600",
      borderColor: "border-stone-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-18-1",
          title: "Islamic Educational Traditions",
          description: "Madrasas, universities, and knowledge transmission",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-18-1-obj-1",
              description: "Understand Islamic approaches to education and knowledge",
              assessmentCriteria: ["Describes educational institutions", "Explains learning methodologies"]
            }
          ],
          keyTerms: [
            { term: "Madrasa", definition: "Islamic school or educational institution" },
            { term: "Ijaza", definition: "License to teach Islamic subjects" },
            { term: "Halqa", definition: "Traditional study circle" },
            { term: "Ilm", definition: "Knowledge, especially religious knowledge" },
            { term: "Talib", definition: "Student or seeker of knowledge" }
          ],
          topicsToGenerate: [
            "Development of Islamic educational institutions",
            "Curriculum and methods in traditional Islamic education",
            "Role of scholars and teachers in Islamic learning",
            "Integration of religious and secular knowledge",
            "Contemporary challenges in Islamic education"
          ],
          culturalContext: ["Medieval Islamic universities", "Modern educational reforms"],
          practicalApplications: ["Lifelong learning principles", "Balancing religious and secular education"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-18-assessment",
        title: "Islamic Education Assessment",
        description: "Understanding Islamic approaches to learning",
        comprehensiveTopics: [
          "Traditional Islamic educational methods",
          "Evolution of Islamic educational institutions",
          "Contemporary debates about Islamic education"
        ]
      }
    },
    {
      id: "isl-unit-19",
      unitNumber: 19,
      title: "Islamic Social Justice",
      description: "Principles of justice and social responsibility in Islam",
      theme: "Social Justice",
      backgroundColor: "bg-neutral-400",
      textColor: "text-neutral-600",
      borderColor: "border-neutral-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-19-1",
          title: "Concepts of Justice in Islam",
          description: "Islamic principles of social and economic justice",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-19-1-obj-1",
              description: "Understand Islamic concepts of justice and social responsibility",
              assessmentCriteria: ["Explains justice concepts", "Describes social responsibilities"]
            }
          ],
          keyTerms: [
            { term: "Adl", definition: "Justice as divine attribute and social principle" },
            { term: "Ihsan", definition: "Excellence, beauty, doing good beyond obligation" },
            { term: "Takaful", definition: "Social solidarity and mutual responsibility" },
            { term: "Haqq", definition: "Truth, right, and justice" },
            { term: "Khalifa", definition: "Human stewardship and responsibility for creation" }
          ],
          topicsToGenerate: [
            "Quranic foundations of social justice",
            "Economic justice and wealth distribution",
            "Rights of the poor and marginalized",
            "Environmental justice and stewardship",
            "Contemporary Islamic social movements"
          ],
          culturalContext: ["Islamic charitable institutions", "Social justice movements in Muslim societies"],
          practicalApplications: ["Social activism and community service", "Ethical leadership principles"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-19-assessment",
        title: "Islamic Social Justice Assessment",
        description: "Understanding Islamic approaches to social responsibility",
        comprehensiveTopics: [
          "Islamic concepts of justice and their applications",
          "Social and economic responsibilities in Islam",
          "Contemporary Islamic social justice movements"
        ]
      }
    },
    {
      id: "isl-unit-20",
      unitNumber: 20,
      title: "Future of Islam",
      description: "Contemporary trends and future directions for Islamic communities",
      theme: "Future Directions",
      backgroundColor: "bg-gray-400",
      textColor: "text-gray-600",
      borderColor: "border-gray-500",
      estimatedWeeks: 2,
      lessons: [
        {
          id: "isl-20-1",
          title: "Islam in the Digital Age",
          description: "Technology, social media, and digital Islamic communities",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-20-1-obj-1",
              description: "Understand how technology affects Islamic practice and community",
              assessmentCriteria: ["Describes digital innovations", "Explains online religious communities"]
            }
          ],
          keyTerms: [
            { term: "Digital Islam", definition: "Islamic practice and community in digital spaces" },
            { term: "E-Learning", definition: "Online Islamic education and courses" },
            { term: "Virtual Ummah", definition: "Global Muslim community connected through technology" },
            { term: "Halal Apps", definition: "Mobile applications serving Muslim needs" },
            { term: "Cyber-Mosque", definition: "Online Islamic religious services" }
          ],
          topicsToGenerate: [
            "Islamic apps and digital tools",
            "Online Islamic education and learning",
            "Social media and Islamic discourse",
            "Virtual religious communities",
            "Challenges of maintaining authenticity online"
          ],
          culturalContext: ["Global connectivity and Muslim diaspora", "Digital divide in Muslim communities"],
          practicalApplications: ["Using technology for religious practice", "Building online Islamic communities"]
        },
        {
          id: "isl-20-2",
          title: "Global Trends and Future Challenges",
          description: "Demographics, challenges, and opportunities for Islam",
          difficulty: "intermediate",
          estimatedMinutes: 45,
          learningObjectives: [
            {
              id: "isl-20-2-obj-1",
              description: "Analyze current trends and future challenges for Islamic communities",
              assessmentCriteria: ["Identifies demographic trends", "Describes future challenges"]
            }
          ],
          keyTerms: [
            { term: "Muslim Demographics", definition: "Population trends in Muslim communities" },
            { term: "Youth Bulge", definition: "Large proportion of young people in Muslim societies" },
            { term: "Urbanization", definition: "Movement from rural to urban areas" },
            { term: "Climate Change", definition: "Environmental challenges affecting Muslim regions" },
            { term: "Globalization", definition: "Increased global interconnection and its effects" }
          ],
          topicsToGenerate: [
            "Demographic trends in Muslim-majority countries",
            "Challenges of youth education and employment",
            "Climate change and environmental stewardship",
            "Globalization and cultural preservation",
            "Future directions for Islamic civilization"
          ],
          culturalContext: ["Rapid social change in Muslim societies", "Global challenges and local responses"],
          practicalApplications: ["Preparing for future challenges", "Youth leadership development"]
        }
      ],
      unitAssessment: {
        id: "isl-unit-20-assessment",
        title: "Future of Islam Assessment",
        description: "Understanding contemporary trends and future directions",
        comprehensiveTopics: [
          "Technology's impact on Islamic practice and community",
          "Global demographic and social trends",
          "Future challenges and opportunities for Muslim communities"
        ]
      }
    }
    // Additional units would continue...
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
    },
    {
      id: "hin-unit-3",
      unitNumber: 3,
      title: "The Upanishads and Early Philosophy",
      description: "Exploring the Upanishads and the emergence of Hindu philosophical thought.",
      theme: "Philosophy and Texts",
      backgroundColor: "bg-blue-400",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-3-1", title: "The Upanishads", description: "Introduction to the Upanishads and their teachings.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-3-assessment", title: "Upanishads Assessment", description: "Assessment of Upanishadic philosophy.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-4",
      unitNumber: 4,
      title: "The Great Epics: Mahabharata and Ramayana",
      description: "Stories, teachings, and cultural impact of the Mahabharata and Ramayana.",
      theme: "Epics and Stories",
      backgroundColor: "bg-blue-400",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-4-1", title: "Mahabharata and Ramayana", description: "Overview of the two great epics.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-4-assessment", title: "Epics Assessment", description: "Assessment of epic literature.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-5",
      unitNumber: 5,
      title: "The Bhagavad Gita: Philosophy and Ethics",
      description: "Study of the Bhagavad Gita and its influence on Hindu thought.",
      theme: "Sacred Texts",
      backgroundColor: "bg-purple-400",
      textColor: "text-purple-600",
      borderColor: "border-purple-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-5-1", title: "The Bhagavad Gita", description: "Teachings and context of the Gita.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-5-assessment", title: "Gita Assessment", description: "Assessment of the Bhagavad Gita.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-6",
      unitNumber: 6,
      title: "Classical Hindu Philosophical Schools (Darshanas)",
      description: "Overview of the six classical schools of Hindu philosophy.",
      theme: "Philosophy and Concepts",
      backgroundColor: "bg-purple-400",
      textColor: "text-purple-600",
      borderColor: "border-purple-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-6-1", title: "Darshanas", description: "Introduction to Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-6-assessment", title: "Darshanas Assessment", description: "Assessment of classical philosophies.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-7",
      unitNumber: 7,
      title: "Major Deities and Divine Forms",
      description: "Exploring the major deities and their iconography in Hinduism.",
      theme: "Deities and Worship",
      backgroundColor: "bg-orange-400",
      textColor: "text-orange-600",
      borderColor: "border-orange-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-7-1", title: "Gods and Goddesses", description: "Vishnu, Shiva, Devi, and other deities.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-7-assessment", title: "Deities Assessment", description: "Assessment of major deities.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-8",
      unitNumber: 8,
      title: "Temples, Pilgrimage, and Sacred Geography",
      description: "The role of temples, pilgrimage sites, and sacred geography in Hindu practice.",
      theme: "Worship and Practice",
      backgroundColor: "bg-orange-400",
      textColor: "text-orange-600",
      borderColor: "border-orange-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-8-1", title: "Temples and Pilgrimage", description: "Famous temples and pilgrimage traditions.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-8-assessment", title: "Temples Assessment", description: "Assessment of temple culture.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-9",
      unitNumber: 9,
      title: "Rituals, Festivals, and Daily Practice",
      description: "Hindu rituals, festivals, and the rhythm of daily religious life.",
      theme: "Ritual and Festival",
      backgroundColor: "bg-pink-400",
      textColor: "text-pink-600",
      borderColor: "border-pink-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-9-1", title: "Festivals and Rituals", description: "Major Hindu festivals and their significance.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-9-assessment", title: "Festivals Assessment", description: "Assessment of rituals and festivals.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-10",
      unitNumber: 10,
      title: "Social Structure: Caste, Gender, and Family",
      description: "The role of caste, gender, and family in Hindu society.",
      theme: "Society and Ethics",
      backgroundColor: "bg-pink-400",
      textColor: "text-pink-600",
      borderColor: "border-pink-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-10-1", title: "Caste and Family", description: "Caste system, gender roles, and family structure.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-10-assessment", title: "Society Assessment", description: "Assessment of social structure.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-11",
      unitNumber: 11,
      title: "Stages of Life and Rites of Passage",
      description: "The four ashramas (life stages) and samskaras (rites of passage) in Hinduism.",
      theme: "Life and Ritual",
      backgroundColor: "bg-indigo-400",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-11-1", title: "Ashramas and Samskaras", description: "Life stages and key rituals.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-11-assessment", title: "Life Stages Assessment", description: "Assessment of ashramas and samskaras.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-12",
      unitNumber: 12,
      title: "Regional Traditions and Diversity",
      description: "Diversity of Hindu traditions across India and the world.",
      theme: "Diversity and Region",
      backgroundColor: "bg-indigo-400",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-12-1", title: "Regional Traditions", description: "North, South, East, and West Indian Hinduism.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-12-assessment", title: "Diversity Assessment", description: "Assessment of regional traditions.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-13",
      unitNumber: 13,
      title: "Bhakti Movements and Devotionalism",
      description: "The rise of bhakti (devotion) movements and their impact on Hinduism.",
      theme: "Devotion and Reform",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-13-1", title: "Bhakti Movements", description: "Saints, poets, and devotional traditions.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-13-assessment", title: "Bhakti Assessment", description: "Assessment of bhakti movements.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-14",
      unitNumber: 14,
      title: "Tantra, Yoga, and Meditation",
      description: "Exploring tantric traditions, yoga, and meditation in Hinduism.",
      theme: "Practice and Philosophy",
      backgroundColor: "bg-blue-400",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-14-1", title: "Tantra and Yoga", description: "Philosophy and practice of tantra and yoga.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-14-assessment", title: "Tantra Assessment", description: "Assessment of tantra and yoga.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-15",
      unitNumber: 15,
      title: "Hinduism and Other Religions",
      description: "Interactions between Hinduism and other world religions.",
      theme: "Interfaith and Dialogue",
      backgroundColor: "bg-purple-400",
      textColor: "text-purple-600",
      borderColor: "border-purple-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-15-1", title: "Interfaith Relations", description: "Hinduism and Buddhism, Jainism, Islam, Christianity, Sikhism.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-15-assessment", title: "Interfaith Assessment", description: "Assessment of interfaith relations.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-16",
      unitNumber: 16,
      title: "Reform Movements and Modern Hinduism",
      description: "Reformers, modern movements, and the evolution of Hinduism in the modern era.",
      theme: "Modernity and Reform",
      backgroundColor: "bg-orange-400",
      textColor: "text-orange-600",
      borderColor: "border-orange-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-16-1", title: "Modern Hinduism", description: "Reformers, new movements, and global Hinduism.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-16-assessment", title: "Modernity Assessment", description: "Assessment of modern Hinduism.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-17",
      unitNumber: 17,
      title: "Hinduism in the Diaspora",
      description: "The spread and adaptation of Hinduism outside India.",
      theme: "Diaspora and Globalization",
      backgroundColor: "bg-pink-400",
      textColor: "text-pink-600",
      borderColor: "border-pink-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-17-1", title: "Global Hinduism", description: "Hindu communities and practices worldwide.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-17-assessment", title: "Diaspora Assessment", description: "Assessment of Hinduism in the diaspora.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-18",
      unitNumber: 18,
      title: "Contemporary Issues in Hinduism",
      description: "Current debates, challenges, and social issues in Hinduism.",
      theme: "Contemporary Issues",
      backgroundColor: "bg-indigo-400",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-18-1", title: "Contemporary Hinduism", description: "Caste, gender, environment, and politics.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-18-assessment", title: "Contemporary Assessment", description: "Assessment of contemporary issues.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-19",
      unitNumber: 19,
      title: "Hinduism and the Arts",
      description: "Hinduism's influence on art, music, dance, and literature.",
      theme: "Arts and Culture",
      backgroundColor: "bg-green-400",
      textColor: "text-green-600",
      borderColor: "border-green-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-19-1", title: "Hindu Arts", description: "Art, music, dance, and literature in Hindu tradition.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-19-assessment", title: "Arts Assessment", description: "Assessment of Hindu arts.", comprehensiveTopics: [] }
    },
    {
      id: "hin-unit-20",
      unitNumber: 20,
      title: "Review and Synthesis: Hinduism in the 21st Century",
      description: "Review of key themes and the future of Hinduism.",
      theme: "Review and Synthesis",
      backgroundColor: "bg-blue-400",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      estimatedWeeks: 2,
      lessons: [{ id: "hin-20-1", title: "Hinduism Today", description: "Summary and future directions for Hinduism.", difficulty: "intermediate", estimatedMinutes: 50, learningObjectives: [], keyTerms: [], topicsToGenerate: [], culturalContext: [], practicalApplications: [] }],
      unitAssessment: { id: "hin-unit-20-assessment", title: "Review Assessment", description: "Comprehensive review of Hinduism.", comprehensiveTopics: [] }
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
