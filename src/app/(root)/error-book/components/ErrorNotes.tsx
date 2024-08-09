"use client";

import React from "react";
import ErrorNotesMinimized from "./ErrorNotesMinimized";
import ErrorNotesMaximized from "./ErrorNotesMaximized";
import { ErrorNoteProps } from "@/helpers/types";

interface ErrorNotesProps {
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  errorNotes?:ErrorNoteProps[]
}

const ErrorNotes: React.FC<ErrorNotesProps> = ({ isMinimized, setIsMinimized,errorNotes }) => {
  return isMinimized ? (
    <ErrorNotesMinimized setIsMinimized={setIsMinimized} errorNotes={errorNotes}/>
  ) : (
    <ErrorNotesMaximized setIsMinimized={setIsMinimized} errorNotes={errorNotes}/>
  );
};

export default ErrorNotes;
