import {
  DashboardIcon,
  PlannerIcon,
  TrackerIcon,
  ChatIcon,
  ErrorBookIcon,
  GrowthMeterIcon,
  WorkshopIcon,
  LibertyIcon,
  QuizIcon,
  StudyRoomIcon,
} from "@/components";

import { TSidebarLink } from "../types";

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
