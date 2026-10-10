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
    <motion.div className="custom__scrollbar flex pt-4 md:h-full md:overflow-y-auto">
      {isMinimized && <ErrorList errorBook={errorBook} />}

      <div className={cn("hidden  lg:block", isMinimized ? "" : "w-full")}>
        <ErrorNotes isMinimized={isMinimized} setIsMinimized={setIsMinimized} errorNotes={errorNotes}/>
      </div>
    </motion.div>
  );
};

export default ErrorBookContainer;
