"use client";

import { createContext, useContext } from "react";
import { StepId, StudyCheckAnswers } from "@/lib/study-check/types";

type StudyCheckContextValue = {
  answers: StudyCheckAnswers;
  patch: (partial: Partial<StudyCheckAnswers>) => StudyCheckAnswers;
  patchAndNext: (partial: Partial<StudyCheckAnswers>) => void;
  next: () => void;
  back: () => void;
  stepId: StepId;
  busy: boolean;
  setBusy: (busy: boolean) => void;
};

export const StudyCheckContext = createContext<StudyCheckContextValue | null>(
  null
);

export const useStudyCheck = () => {
  const value = useContext(StudyCheckContext);
  if (!value) {
    throw new Error("useStudyCheck must be used inside Study Check");
  }
  return value;
};
