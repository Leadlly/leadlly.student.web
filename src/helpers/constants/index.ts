import {
  DashboardIcon,
  PlannerIcon,
  TrackerIcon,
  ErrorBookIcon,
  GrowthMeterIcon,
  WorkshopIcon,
  LibertyIcon,
  QuizIcon,
  StudyRoomIcon,
} from "@/components";

import { TQuizQuestionProps, TSidebarLink } from "../types";

export const userSidebarLinks: TSidebarLink[] = [
  {
    label: "dashboard",
    icon: DashboardIcon,
    href: "/",
  },
  {
    label: "planner",
    icon: PlannerIcon,
    href: "/planner",
  },
  {
    label: "tracker",
    icon: TrackerIcon,
    href: "/tracker",
  },
  {
    label: "errorbook",
    icon: ErrorBookIcon,
    href: "/error-book",
  },
  {
    label: "growth meter",
    icon: GrowthMeterIcon,
    href: "/growth-meter",
  },
  {
    label: "workshops",
    icon: WorkshopIcon,
    href: "/workshops",
  },
  {
    label: "liberty",
    icon: LibertyIcon,
    href: "/liberty",
  },
  {
    label: "quizzes",
    icon: QuizIcon,
    href: "/quizzes",
  },
  {
    label: "study room",
    icon: StudyRoomIcon,
    href: "/study-room",
  },
];

export const quizQuestions: TQuizQuestionProps[] = [
  {
    question: "Sample question 1",
    options: {
      all: ["1", "2", "3", "4"],
      correct: ["2"],
    },
  },
  {
    question: "Sample question 2",
    options: {
      all: ["1", "2", "3", "4"],
      correct: ["1"],
    },
  },
  {
    question: "Sample question 3",
    options: {
      all: ["1", "2", "3", "4"],
      correct: ["4"],
    },
  },
  {
    question: "Sample question 4",
    options: {
      all: ["1", "2", "3", "4"],
      correct: ["3"],
    },
  },
  {
    question: "Sample question 5",
    options: {
      all: ["1", "2", "3", "4"],
      correct: ["4"],
    },
  },
];
