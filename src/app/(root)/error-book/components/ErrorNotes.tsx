"use client";

import React from "react";
import ErrorNotesMinimized from "./ErrorNotesMinimized";
import ErrorNotesMaximized from "./ErrorNotesMaximized";

interface ErrorNotesProps {
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
}

const ErrorNotes: React.FC<ErrorNotesProps> = ({ isMinimized, setIsMinimized }) => {
  return isMinimized ? (
    <ErrorNotesMinimized setIsMinimized={setIsMinimized} />
  ) : (
    <ErrorNotesMaximized setIsMinimized={setIsMinimized} />
  );
};

export default ErrorNotes;
