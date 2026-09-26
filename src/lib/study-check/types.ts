export type ExamOption = "jee" | "neet" | "boards";

export type AcademicStage = "11" | "12" | "drop" | "other";

export type BoardOption = "cbse" | "icse" | "state" | "other";

export type CoachingAttendance = "offline" | "online" | "both" | "no";

export type SelfStudyBand = "lt2" | "2to4" | "4to6" | "6to8" | "8plus";

export type ChapterStatus =
  | "strongly_completed"
  | "completed_needs_revision"
  | "completed_backlog"
  | "ongoing"
  | "not_started";

export type TestType = "part" | "full" | "chapter" | "periodic";

export type StepId =
  | "opening"
  | "phone"
  | "exam"
  | "stage"
  | "board"
  | "coaching"
  | "coachingWhen"
  | "wake"
  | "sleep"
  | "selfStudy"
  | "studySlots"
  | "decideHow"
  | "missedPlan"
  | "afterTopic"
  | "reviseHow"
  | "wrongQuestion"
  | "backlog"
  | "syllabus"
  | "hasTests"
  | "testsList"
  | "problems"
  | "profile";

export type StudySlot = {
  id: string;
  label: string;
  start: string;
  end: string;
};

export type TestSyllabusChapter = {
  chapter: {
    id: string;
    name: string;
  };
  subject: {
    name: string;
  };
  standard: number;
};

export type CoachingTest = {
  id: string;
  name: string;
  date: string;
  type: TestType;
  syllabus: string;
  chapters: TestSyllabusChapter[];
};

export type TestSyllabusPick = TestSyllabusChapter;

export type DraftTest = {
  name: string;
  date: string | null;
  type: TestType;
  syllabusPicks: TestSyllabusPick[];
};

export type TaggedChapter = {
  status: ChapterStatus;
  name: string;
  subject: string;
  standard: number;
};

export type LearningCoverage = {
  total: number;
  overall: number;
  strongly: number;
  needsRevision: number;
  backlog: number;
  ongoing: number;
  notStarted: number;
};

export type StudyCheckAnswers = {
  phone: string | null;
  exams: ExamOption[];
  academicStage: AcademicStage | null;
  board: BoardOption | null;
  coachingAttendance: CoachingAttendance | null;
  classStartTime: string | null;
  classEndTime: string | null;
  coachingHours: number;
  wakeTime: string | null;
  sleepTime: string | null;
  selfStudyBand: SelfStudyBand | null;
  studySlots: StudySlot[];
  decideHow: string | null;
  missedPlan: string | null;
  afterTopic: string | null;
  reviseHow: string | null;
  wrongQuestion: string | null;
  backlog: string | null;
  chapters: Record<string, TaggedChapter>;
  coverage: LearningCoverage | null;
  hasPeriodicTests: boolean | null;
  tests: CoachingTest[];
  draftTest: DraftTest;
  biggestProblems: string[];
};

export type OptionItem = {
  value: string;
  label: string;
  hint?: string;
};
