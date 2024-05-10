// import {
//   DashboardIcon,
//   ErrorBookIcon,
//   GrowthMeterIcon,
//   LibertyIcon,
//   PlannerIcon,
//   QuizIcon,
//   StudyRoomIcon,
//   TrackerIcon,
//   WorkshopIcon,
// } from "@/components";
import DashboardIcon from "@/components/icons/DashboardIcon";
import { TQuizQuestionProps, TSidebarLink } from "../types";
import PlannerIcon from "@/components/icons/PlannerIcon";
import TrackerIcon from "@/components/icons/TrackerIcon";
import ErrorBookIcon from "@/components/icons/ErrorBookIcon";
import GrowthMeterIcon from "@/components/icons/GrowthMeterIcon";
import WorkshopIcon from "@/components/icons/WorkshopIcon";
import LibertyIcon from "@/components/icons/LibertyIcon";
import QuizIcon from "@/components/icons/QuizIcon";
import StudyRoomIcon from "@/components/icons/StudyRoomIcon";

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
    label: "chat",
    icon: ChatIcon,
    href: "/chat",
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
