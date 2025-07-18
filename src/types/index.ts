export type QuizQuestion = {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  explanation?: string;
};

export type Quiz = {
  quiz: QuizQuestion[];
};

// Base structure for any exercise
export interface Exercise {
  id: string;
  prompt: string;
}

// Type: Match Pairs
export interface MatchPairsExercise extends Exercise {
  type: 'match-pairs';
  data: { term: string; definition: string }[];
}

// Type: Fill in the Blank
export interface FillBlankExercise extends Exercise {
  type: 'fill-in-the-blank';
  data: {
    sentence: string; // "Blessed are the meek, for they shall inherit the ____."
    correctAnswer: string;
    options: string[]; // [earth, kingdom, world]
  };
}

// Type: Image Association
export interface ImageAssocExercise extends Exercise {
  type: 'image-association';
  data: {
    imagePrompt?: string; // AI prompt for image generation
    imageUrl?: string; // URL to the image of a Torii gate (fallback)
    correctAnswer: string;
    options: string[]; // [Torii, Pagoda, Stupa]
  };
}

// Type: Principle Sorting (swipe left/right)
export interface PrincipleSortingExercise extends Exercise {
  type: 'principle-sorting';
  data: {
    category: string; // e.g., "Is this Kosher?"
    items: { text: string; correct: boolean }[]; // Items to sort
  };
}

// Type: Multiple Choice
export interface MultipleChoiceExercise extends Exercise {
  type: 'multiple-choice';
  data: {
    question: string;
    correctAnswer: string;
    options: string[];
  };
}

// Type: True/False
export interface TrueFalseExercise extends Exercise {
  type: 'true-false';
  data: {
    statement: string;
    correctAnswer: boolean;
    explanation: string;
  };
}

// Type: Sequence Order
export interface SequenceOrderExercise extends Exercise {
  type: 'sequence-order';
  data: {
    instruction: string;
    items: string[];
    correctOrder: number[];
  };
}

// Type: Quote Completion
export interface QuoteCompletionExercise extends Exercise {
  type: 'quote-completion';
  data: {
    quote: string; // "Be the [BLANK] you wish to see in the world"
    correctAnswer: string;
    options: string[];
  };
}

// Union type for all exercise types
export type AnyExercise = MatchPairsExercise | FillBlankExercise | ImageAssocExercise | PrincipleSortingExercise | MultipleChoiceExercise | TrueFalseExercise | SequenceOrderExercise | QuoteCompletionExercise;

// Represents a "skill bubble" on the learning path
export type SkillNode = {
  id: string;
  title: string;
  description: string;
  exercises: AnyExercise[];
}; 