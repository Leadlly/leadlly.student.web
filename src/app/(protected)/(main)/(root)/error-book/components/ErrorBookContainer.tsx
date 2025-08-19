"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorList from "./ErrorList";
import ErrorNotes from "./ErrorNotes";
import { cn } from "@/lib/utils";
import { ErrorBookProps } from "@/helpers/types";

const ErrorBookContainer = ({ errorBook ,errorNotes}: ErrorBookProps) => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <motion.div className="flex pt-4 overflow-y-auto">
      {isMinimized && <ErrorList errorBook={errorBook} />}

      <div className={cn("hidden  lg:block", isMinimized ? "" : "w-full")}>
        <ErrorNotes isMinimized={isMinimized} setIsMinimized={setIsMinimized} errorNotes={errorNotes}/>
      </div>
    </motion.div>
  );
};

export default ErrorBookContainer;
