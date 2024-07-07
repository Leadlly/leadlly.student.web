import { TSidebarLink } from "../types";

import DashboardIcon from "@/components/icons/DashboardIcon";
import PlannerIcon from "@/components/icons/PlannerIcon";
import TrackerIcon from "@/components/icons/TrackerIcon";
import ErrorBookIcon from "@/components/icons/ErrorBookIcon";
import GrowthMeterIcon from "@/components/icons/GrowthMeterIcon";
import WorkshopIcon from "@/components/icons/WorkshopIcon";
import LibertyIcon from "@/components/icons/LibertyIcon";
import QuizIcon from "@/components/icons/QuizIcon";
import StudyRoomIcon from "@/components/icons/StudyRoomIcon";
import ChatIcon3 from "@/components/icons/ChatIcon3";

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
    icon: ChatIcon3,
    href: "/chat",
  },
  {
    label: "quizzes",
    icon: QuizIcon,
    href: "/quizzes",
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
    label: "study room",
    icon: StudyRoomIcon,
    href: "/study-room",
  },
];

export const manageAccountTabs = [
  {
    id: "personal-info",
    label: "Personal Info",
  },
  {
    id: "study-progress",
    label: "Study Progress",
  },
  // {
  //   id: "subject-overview",
  //   label: "Subject Overview",
  // },
  // {
  //   id: "your-mentor",
  //   label: "Your Mentor",
  // },
];

export const subscriptionPlanningBenefits = [
  {
    label: "goal setting & tracking",
  },
  {
    label: "schedule builder",
  },
  {
    label: "to-do list & reminders",
  },
  {
    label: "subject, chapter & topic tracking",
  },
];

export const subscriptionExpertBenefits = [
  {
    label: "connect with a mentor",
  },
  {
    label: "live & on-demand workshops",
  },
];
export const subscriptionLearningBenefits = [
  {
    label: "growth meter",
  },
  {
    label: "points & levels",
  },
  {
    label: "know your mistakes",
  },
];
export interface EfficiencyOption {
  min?: number;
  max?: number;
  label: string;
  progressBarColor: string;
  textColor: string;
}
