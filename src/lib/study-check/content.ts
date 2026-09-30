import {
  AcademicStage,
  BoardOption,
  ChapterStatus,
  CoachingAttendance,
  ExamOption,
  LearningCoverage,
  OptionItem,
  SelfStudyBand,
  StepId,
  StudyCheckAnswers,
  TaggedChapter,
} from "./types";

export const emptyCoverage = (): LearningCoverage => ({
  total: 0,
  overall: 0,
  strongly: 0,
  needsRevision: 0,
  backlog: 0,
  ongoing: 0,
  notStarted: 0,
});

export const defaultStudyCheckAnswers = (): StudyCheckAnswers => ({
  phone: null,
  exams: [],
  academicStage: null,
  board: null,
  coachingAttendance: null,
  classStartTime: null,
  classEndTime: null,
  coachingHours: 0,
  wakeTime: null,
  sleepTime: null,
  selfStudyBand: null,
  studySlots: [],
  decideHow: null,
  missedPlan: null,
  afterTopic: null,
  reviseHow: null,
  wrongQuestion: null,
  backlog: null,
  chapters: {},
  coverage: null,
  hasPeriodicTests: null,
  tests: [],
  draftTest: {
    name: "",
    date: null,
    type: "periodic" as const,
    syllabusPicks: [],
  },
  biggestProblems: [],
});

export const EXAM_OPTIONS: OptionItem[] = [
  { value: "jee", label: "JEE" },
  { value: "neet", label: "NEET" },
  { value: "boards", label: "Boards" },
];

export const STAGE_OPTIONS: OptionItem[] = [
  { value: "11", label: "Class 11" },
  { value: "12", label: "Class 12" },
  { value: "drop", label: "Drop Year" },
  { value: "other", label: "Other" },
];

export const BOARD_OPTIONS: OptionItem[] = [
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "state", label: "State Board" },
  { value: "other", label: "Other" },
];

export const COACHING_OPTIONS: OptionItem[] = [
  { value: "offline", label: "Yes, offline" },
  { value: "online", label: "Yes, online" },
  { value: "both", label: "Both" },
  { value: "no", label: "No" },
];

export const SELF_STUDY_OPTIONS: { value: SelfStudyBand; label: string }[] = [
  { value: "lt2", label: "Less than 2 hours" },
  { value: "2to4", label: "2-4 hours" },
  { value: "4to6", label: "4-6 hours" },
  { value: "6to8", label: "6-8 hours" },
  { value: "8plus", label: "8+ hours" },
];

export const CHAPTER_STATUS_OPTIONS: {
  value: ChapterStatus;
  label: string;
  hint: string;
  color: string;
  bg: string;
}[] = [
  {
    value: "strongly_completed",
    label: "Strongly Completed",
    hint: "I understand this topic well and can solve questions confidently.",
    color: "#0fd679",
    bg: "#DEF7EC",
  },
  {
    value: "completed_needs_revision",
    label: "Completed - Needs Revision",
    hint: "I've studied it, but I need a quick revision.",
    color: "#0EA5A4",
    bg: "#E6FFFB",
  },
  {
    value: "completed_backlog",
    label: "Completed - Backlog",
    hint: "I've attended/studied it, but my practice/revision is incomplete.",
    color: "#ff9900",
    bg: "#FFF4E5",
  },
  {
    value: "ongoing",
    label: "Ongoing",
    hint: "I'm currently studying this topic in class/coaching.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    value: "not_started",
    label: "Not Started",
    hint: "I haven't studied this yet.",
    color: "#828282",
    bg: "#F4F4F4",
  },
];

export const TEST_TYPE_OPTIONS: OptionItem[] = [
  { value: "part", label: "Part syllabus" },
  { value: "full", label: "Full syllabus" },
  { value: "chapter", label: "Chapter test" },
  { value: "periodic", label: "Coaching periodic test" },
];

export const PROBLEM_OPTIONS: OptionItem[] = [
  { value: "what_to_study", label: "I don't know what to study every day" },
  { value: "consistency", label: "I can't stay consistent" },
  { value: "backlog", label: "My backlog keeps increasing" },
  { value: "revise", label: "I don't revise enough" },
  { value: "forget", label: "I forget what I study" },
  { value: "practice", label: "I don't practice enough questions" },
  { value: "manage_time", label: "I struggle to manage coaching + self-study" },
  {
    value: "where_i_stand",
    label: "I don't know where I stand in my syllabus",
  },
  {
    value: "scores",
    label: "I study a lot but my test scores don't improve",
  },
  { value: "accountability", label: "I need accountability" },
  { value: "other", label: "Something else" },
];

export type BehaviorSpectrumOption = {
  value: string;
  label: string;
  quote: string;
  cardTitle?: string;
};

export const BEHAVIOR_QUESTIONS: Record<
  | "decideHow"
  | "missedPlan"
  | "afterTopic"
  | "reviseHow"
  | "wrongQuestion"
  | "backlog",
  {
    question: string;
    tag: string;
    icon: "target" | "zap" | "refresh-cw" | "aperture" | "layers";
    options: [
      BehaviorSpectrumOption,
      BehaviorSpectrumOption,
      BehaviorSpectrumOption,
      BehaviorSpectrumOption,
    ];
  }
> = {
  decideHow: {
    question:
      "When you sit down to study, how do you usually decide what to do?",
    tag: "Planning",
    icon: "target",
    options: [
      {
        value: "no_plan",
        label: "No plan",
        quote: '"I usually just start with whatever is in front of me."',
      },
      {
        value: "decide_as_i_go",
        label: "Decide as I go",
        quote: '"I figure it out once I sit down."',
      },
      {
        value: "rough_idea",
        label: "Rough idea",
        quote: '"I have a sense of what to do, but it is not fully set."',
      },
      {
        value: "clear_plan",
        label: "Clear plan",
        quote: '"I already know what I need to study."',
      },
    ],
  },
  missedPlan: {
    question: "How often does your study plan actually happen?",
    tag: "Consistency",
    icon: "zap",
    options: [
      {
        value: "rarely",
        label: "Rarely",
        quote: '"The plan often does not happen."',
      },
      {
        value: "some_days",
        label: "Some days",
        quote: '"It happens on some days, not others."',
      },
      {
        value: "most_days",
        label: "Most days",
        quote: '"I get most of it done."',
      },
      {
        value: "almost_always",
        label: "Almost always",
        quote: '"I follow it almost every day."',
      },
    ],
  },
  afterTopic: {
    question: "You finish a topic. What happens next?",
    tag: "Revision",
    icon: "refresh-cw",
    options: [
      {
        value: "rarely_revisit",
        label: "Rarely revisit",
        quote: '"I often don\'t come back to it."',
      },
      {
        value: "before_test",
        label: "Before test",
        quote: '"I wait and revisit it before a test."',
      },
      {
        value: "revise_soon",
        label: "Revise soon",
        quote: '"I come back to it soon after."',
      },
      {
        value: "revision_cycle",
        label: "Revision cycle",
        quote: '"I put it into a regular revision cycle."',
      },
    ],
  },
  reviseHow: {
    question: "You finish a topic. What happens next?",
    tag: "Revision",
    icon: "refresh-cw",
    options: [
      {
        value: "no_system",
        label: "Rarely revisit",
        quote: '"I often don\'t come back to it."',
      },
      {
        value: "before_tests",
        label: "Before test",
        quote: '"I wait and revisit it before a test."',
      },
      {
        value: "when_time",
        label: "Revise soon",
        quote: '"I come back to it soon after."',
      },
      {
        value: "fixed_cycle",
        label: "Revision cycle",
        quote: '"I put it into a regular revision cycle."',
      },
    ],
  },
  wrongQuestion: {
    question: "You get a question wrong. What usually happens next?",
    tag: "Accuracy habits",
    icon: "aperture",
    options: [
      {
        value: "move_on",
        label: "Move on",
        quote: '"I move on and don\'t sit with it."',
      },
      {
        value: "mark_it",
        label: "Mark it",
        quote: '"I mark it so I can come back later."',
      },
      {
        value: "understand",
        label: "Understand",
        cardTitle: "Understand it",
        quote: '"I check the solution and understand the concept."',
      },
      {
        value: "fix_it",
        label: "Fix it",
        quote: '"I go back and correct it right away."',
      },
    ],
  },
  backlog: {
    question: "You miss today's target. What usually happens next?",
    tag: "Backlog control",
    icon: "layers",
    options: [
      {
        value: "piles_up",
        label: "Piles up",
        quote: '"It usually piles up."',
      },
      {
        value: "push_forward",
        label: "Push forward",
        cardTitle: "Push it forward",
        quote: '"I keep carrying it into the next day."',
      },
      {
        value: "catch_up",
        label: "Catch up",
        quote: '"I try to catch up the missed part first."',
      },
      {
        value: "adjust",
        label: "Adjust",
        quote: '"I adjust today\'s plan and keep going."',
      },
    ],
  },
};

export const behaviorStopToValue = (
  stop: number,
  options: BehaviorSpectrumOption[]
) => {
  const clamped = Math.max(0, Math.min(6, stop));
  if (clamped % 2 === 0) return options[clamped / 2].value;
  const left = options[(clamped - 1) / 2];
  const right = options[(clamped + 1) / 2];
  return `${left.value}~${right.value}`;
};

export const behaviorValueToStop = (
  value: string | null,
  options: BehaviorSpectrumOption[]
) => {
  if (!value) return 0;
  const exact = options.findIndex((option) => option.value === value);
  if (exact >= 0) return exact * 2;
  const [left, right] = value.split("~");
  const leftIndex = options.findIndex((option) => option.value === left);
  const rightIndex = options.findIndex((option) => option.value === right);
  if (leftIndex >= 0 && rightIndex === leftIndex + 1) return leftIndex * 2 + 1;
  return 0;
};

export const behaviorStopCard = (
  stop: number,
  options: BehaviorSpectrumOption[]
) => {
  const clamped = Math.max(0, Math.min(6, stop));
  if (clamped % 2 === 0) {
    const option = options[clamped / 2];
    return { title: option.cardTitle ?? option.label, quote: option.quote };
  }
  const left = options[(clamped - 1) / 2];
  const right = options[(clamped + 1) / 2];
  return {
    title: "Between two points",
    quote: `"Somewhere between ${left.label.toLowerCase()} and ${right.label.toLowerCase()}."`,
  };
};

export const PROBLEM_FOCUS: Record<string, string> = {
  what_to_study: "knowing what to study every day",
  consistency: "staying consistent",
  backlog: "managing your backlog",
  revise: "managing revision alongside your ongoing classes",
  forget: "retaining what you study",
  practice: "getting enough question practice",
  manage_time: "balancing coaching with self-study",
  where_i_stand: "knowing where you stand in your syllabus",
  scores: "converting study hours into better test scores",
  accountability: "having accountability",
  other: "the challenge you called out",
};

export const PARTS = [
  { id: "goal", label: "PART 1 - Your Goal" },
  { id: "classes", label: "PART 2 - Your Classes" },
  { id: "day", label: "PART 3 - Your Day" },
  { id: "habits", label: "PART 4 - How You Actually Study" },
  { id: "syllabus", label: "PART 5 - Your Syllabus Status" },
  { id: "tests", label: "PART 6 - Your Coaching & Test Schedule" },
  { id: "focus", label: "PART 7 - One final question" },
  { id: "profile", label: "Your Study DNA" },
] as const;

const STEP_PART: Record<StepId, (typeof PARTS)[number]["id"] | "intro"> = {
  opening: "intro",
  phone: "goal",
  exam: "goal",
  stage: "goal",
  board: "goal",
  coaching: "classes",
  coachingWhen: "classes",
  wake: "day",
  sleep: "day",
  selfStudy: "day",
  studySlots: "day",
  decideHow: "habits",
  missedPlan: "habits",
  afterTopic: "habits",
  reviseHow: "habits",
  wrongQuestion: "habits",
  backlog: "habits",
  syllabus: "syllabus",
  hasTests: "tests",
  testsList: "tests",
  problems: "focus",
  profile: "profile",
};

export const getPartMeta = (stepId: StepId) => {
  const partId = STEP_PART[stepId];
  if (partId === "intro") {
    return { label: "Leadlly Study Check", index: -1 };
  }
  const index = PARTS.findIndex((part) => part.id === partId);
  return { label: PARTS[index].label, index };
};

export const getPartFills = (stepId: StepId, sequence: StepId[]) => {
  const partId = STEP_PART[stepId];
  const currentPartIndex =
    partId === "intro" ? -1 : PARTS.findIndex((part) => part.id === partId);

  return PARTS.map((part, index) => {
    if (currentPartIndex < 0) return 0;
    if (index < currentPartIndex) return 1;
    if (index > currentPartIndex) return 0;

    const partSteps = sequence.filter((id) => STEP_PART[id] === part.id);
    if (partSteps.length === 0) return 1;
    const pos = partSteps.indexOf(stepId);
    if (pos < 0) return 0;
    return (pos + 1) / partSteps.length;
  });
};

export const needsStudyCheck = (user?: { onboard?: boolean } | null) => {
  if (!user) return false;
  return user.onboard !== true;
};

export const buildStepSequence = (answers: StudyCheckAnswers): StepId[] => {
  const steps: StepId[] = ["opening", "phone", "exam", "stage"];

  if (answers.academicStage === "11" || answers.academicStage === "12") {
    steps.push("board");
  }

  steps.push("coaching");

  if (answers.coachingAttendance && answers.coachingAttendance !== "no") {
    steps.push("coachingWhen");
  }

  steps.push(
    "wake",
    "sleep",
    "selfStudy",
    "studySlots",
    "decideHow",
    "missedPlan",
    "afterTopic",
    "wrongQuestion",
    "backlog",
    "syllabus",
    "hasTests"
  );

  if (answers.hasPeriodicTests) {
    steps.push("testsList");
  }

  steps.push("problems", "profile");
  return steps;
};

export const EXAM_LABELS: Record<ExamOption, string> = {
  jee: "JEE",
  neet: "NEET",
  boards: "Boards",
};

export const STAGE_LABELS: Record<AcademicStage, string> = {
  "11": "Class 11",
  "12": "Class 12",
  drop: "Drop Year",
  other: "Other",
};

export const BOARD_LABELS: Record<BoardOption, string> = {
  cbse: "CBSE",
  icse: "ICSE",
  state: "State Board",
  other: "Other",
};

export const normalizeExams = (exams?: string[] | null): ExamOption[] => {
  if (!exams?.length) return [];
  const mapped = exams
    .map((exam) => {
      const value = String(exam || "").toLowerCase();
      if (value.includes("neet")) return "neet" as const;
      if (value.includes("jee")) return "jee" as const;
      if (value.includes("board")) return "boards" as const;
      return null;
    })
    .filter((exam): exam is ExamOption => Boolean(exam));
  return mapped[0] ? [mapped[0]] : [];
};

export const mapExamsToCompetitiveExam = (
  exams: ExamOption[]
): "JEE" | "NEET" | "Board" => {
  const exam = normalizeExams(exams)[0];
  if (exam === "neet") return "NEET";
  if (exam === "boards") return "Board";
  return "JEE";
};

export const mapStageToClass = (stage: AcademicStage | null): number => {
  if (stage === "11") return 11;
  if (stage === "12") return 12;
  if (stage === "drop") return 13;
  return 12;
};

export const mapCoachingType = (
  attendance: CoachingAttendance | null
): string | undefined => {
  if (!attendance || attendance === "no") return undefined;
  return attendance;
};

export const formatClock = (value: string | null) => {
  if (!value) return "-";
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return value;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

export const dateToClock = (date: Date) => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

export const clockToDate = (value: string | null, fallbackHour = 7) => {
  const date = new Date();
  if (!value) {
    date.setHours(fallbackHour, 0, 0, 0);
    return date;
  }
  const [h, m] = value.split(":").map(Number);
  date.setHours(h || 0, m || 0, 0, 0);
  return date;
};

export const sleepWindowLabel = (
  sleepTime: string | null,
  wakeTime: string | null
) => {
  if (!sleepTime || !wakeTime) return null;
  return `${formatClock(sleepTime)} - ${formatClock(wakeTime)}`;
};

export const selfStudyLabel = (band: SelfStudyBand | null) => {
  return SELF_STUDY_OPTIONS.find((item) => item.value === band)?.label ?? "-";
};

export const hoursBetweenClocks = (
  start: string | null,
  end: string | null
) => {
  if (!start || !end) return 0;
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  if (
    [startHour, startMinute, endHour, endMinute].some((value) =>
      Number.isNaN(value)
    )
  ) {
    return 0;
  }
  const startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;
  if (endMinutes === startMinutes) return 0;
  if (endMinutes < startMinutes) endMinutes += 24 * 60;
  return Math.round(((endMinutes - startMinutes) / 60) * 10) / 10;
};

export const classWindowLabel = (start: string | null, end: string | null) => {
  if (!start || !end) return "No regular classes";
  return `${formatClock(start)} - ${formatClock(end)}`;
};

export const classHoursLabel = (hours: number) => {
  if (!hours) return "0 hours";
  const rounded = Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
  return hours === 1 ? "1 hour" : `${rounded} hours`;
};

export const examSummary = (exams: ExamOption[]) => {
  const exam = normalizeExams(exams)[0];
  if (!exam) return "-";
  return EXAM_LABELS[exam];
};

export const capitalizeSubject = (name: string) =>
  name ? name.charAt(0).toUpperCase() + name.slice(1) : name;

export const computeCoverage = (
  chapters: {
    _id: string;
    name: string;
    subjectName: string;
    standard: number;
  }[],
  tagged: Record<string, TaggedChapter>
): LearningCoverage => {
  const total = chapters.length;
  if (!total) return emptyCoverage();

  const counts: Record<ChapterStatus, number> = {
    strongly_completed: 0,
    completed_needs_revision: 0,
    completed_backlog: 0,
    ongoing: 0,
    not_started: 0,
  };

  chapters.forEach((chapter) => {
    const status = tagged[chapter._id]?.status ?? "not_started";
    counts[status] += 1;
  });

  const pct = (count: number) => Math.round((count / total) * 100);
  const covered = total - counts.not_started;

  return {
    total,
    overall: pct(covered),
    strongly: pct(counts.strongly_completed),
    needsRevision: pct(counts.completed_needs_revision),
    backlog: pct(counts.completed_backlog),
    ongoing: pct(counts.ongoing),
    notStarted: pct(counts.not_started),
  };
};

export const focusSentence = (problems: string[]) => {
  if (!problems.length) {
    return "Leadlly will keep learning how you study and adapt your plan.";
  }
  const labels = problems.map((id) => PROBLEM_FOCUS[id]).filter(Boolean);
  if (labels.length === 1) {
    return `Your biggest challenge is ${labels[0]}.`;
  }
  return `Your biggest challenges are ${labels[0]} and ${labels[1]}.`;
};

export const isValidPhone = (phone?: string | null) =>
  !!phone && /^\d{10}$/.test(phone);

export const canAdvance = (stepId: StepId, answers: StudyCheckAnswers) => {
  switch (stepId) {
    case "opening":
    case "studySlots":
    case "syllabus":
    case "testsList":
    case "profile":
      return true;
    case "phone":
      return isValidPhone(answers.phone);
    case "exam":
      return answers.exams.length > 0;
    case "stage":
      return !!answers.academicStage;
    case "board":
      return !!answers.board;
    case "coaching":
      return !!answers.coachingAttendance;
    case "coachingWhen":
      return (
        !!answers.classStartTime &&
        !!answers.classEndTime &&
        answers.coachingHours > 0
      );
    case "wake":
      return !!answers.wakeTime;
    case "sleep":
      return !!answers.sleepTime;
    case "selfStudy":
      return !!answers.selfStudyBand;
    case "decideHow":
      return !!answers.decideHow;
    case "missedPlan":
      return !!answers.missedPlan;
    case "afterTopic":
      return !!answers.afterTopic;
    case "reviseHow":
      return !!answers.reviseHow;
    case "wrongQuestion":
      return !!answers.wrongQuestion;
    case "backlog":
      return !!answers.backlog;
    case "hasTests":
      return answers.hasPeriodicTests !== null;
    case "problems":
      return answers.biggestProblems.length > 0;
    default:
      return false;
  }
};

export const makeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
