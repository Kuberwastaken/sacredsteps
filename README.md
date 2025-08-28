# Sacred Steps (praygo) - Learn Religions Like Never Before

> **Sacred Steps** is the world's first AI-powered religious education platform that makes learning about world religions engaging, respectful, and accessible to everyone.

Making it a PWA that's more mobile-native because that's something new I haven't explored yet

**Landing page I spent way too long on:** [sacredsteps.app](https://sacredsteps.app)

## About Sacred Steps

Sacred Steps (branded as "praygo") is a revolutionary educational platform that brings the gamified learning experience of language apps like Duolingo to religious education. Our mission is to build bridges through understanding by making world religions accessible to learners of all backgrounds.

Covering 12+ major world religions right now including Christianity, Islam, Judaism, Hinduism, Buddhism, Sikhism, and more

## Some Features

### Gamified Learning
- **XP System**: Earn experience points for every lesson completed
- **Heart System**: Manage your hearts - mistakes cost a heart, but you can earn them back
- **Streak Tracking**: Build daily learning habits and keep your flame alive
- **Leaderboards**: Compete with learners worldwide and climb to the top

### Educational Content
- **Diverse Religions**: Explore Christianity, Islam, Judaism, Hinduism, Buddhism, Sikhism, Jainism, Taoism, Shintoism, and indigenous traditions
- **Bite-sized Lessons**: Master concepts through structured learning flows
- **AI-Generated Questions**: 1000+ dynamically generated questions across all major religions
- **Interactive Exercises**: Multiple choice, matching pairs, and other engaging question types

### Personalized Experience
- **Adaptive Learning**: AI tailors content to your progress and interests
- **Progress Tracking**: Monitor your journey across different religious studies
- **Custom Learning Paths**: Choose your own adventure through world religions
- **Achievement System**: Unlock badges and milestones as you learn

## Technology Stack

This Sacred Steps web application is built with modern technologies:

- **Frontend**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Next.js](https://nextjs.org/) for full-stack capabilities
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive design
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for efficient state handling
- **AI Integration**: Azure OpenAI
- **Deployment**: Vercel

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kuberwastaken/sacredsteps-v2.git
   cd react-duolingo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── ai/                     # AI integration and flows
│   ├── flows/             # AI-powered learning flows
│   ├── genkit.ts          # AI configuration
│   └── dev.ts             # Development AI utilities
├── components/            # React components
│   ├── exercises/         # Quiz and exercise components
│   ├── ui/               # Reusable UI components
│   └── ...               # Core app components
├── curriculum/           # Educational content structure
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── pages/               # Next.js pages and API routes
│   ├── api/             # Backend API endpoints
│   ├── lesson/          # Lesson-specific pages
│   └── settings/        # User settings pages
├── stores/              # Zustand state management
├── styles/              # Global styles and themes
├── types/               # TypeScript type definitions
└── utils/               # Helper functions
```

## Things in Development

- **Advanced AI Tutor**: Personalized learning assistance
- **Classroom Integration**: Tools for educators and schools
- **Mobile Applications**: Native iOS and Android apps
- **Community Features**: Study groups and discussion forums
- **Certification Programs**: Formal recognition of learning achievements

> "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi
