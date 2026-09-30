export type DailyPlanItem = {
  id: string;
  subject: string;
  chapterId: string;
  chapterName: string;
  topicId: string;
  topicName: string;
  granularity: "chapter" | "topic" | "subtopic";
  sources: string[];
  priorityScore: number;
  reason: string;
  reasonCodes: string[];
  lane: "CURRENT_LEARNING" | "ACCURACY" | "PAST_REVISION";
  revisionUnits: number;
  estimatedLoad: number;
  status: "PENDING" | "OPENED" | "COMPLETED" | "SKIPPED" | "EXPIRED";
  quizId: string | null;
};

export type RevisionBucket = {
  declared: number;
  available: number;
  used: number;
};

export type DailyPlan = {
  date: string;
  algorithmVersion: string;
  configVersion: string;
  capacity: {
    accuracy: RevisionBucket;
    past: RevisionBucket;
    currentLearning: number;
    heavy: boolean;
    reallocated: boolean;
    note: string | null;
  };
  items: DailyPlanItem[];
  questions?: Record<string, unknown[]>;
  answeredQuestions?: Record<string, string[]>;
  quizzes: {
    weekly: { id: string; endDate: string; attempted: boolean } | null;
    chapter: { id: string; name: string; subject: string; endDate: string }[];
  };
};
