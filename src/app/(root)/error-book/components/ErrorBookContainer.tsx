"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorList from "./ErrorList";
import ErrorNotes from "./ErrorNotes";

const ErrorBookContainer: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <motion.div className="flex pt-4 overflow-y-auto" >
      {isMinimized && <ErrorList />}

      <ErrorNotes isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
    </motion.div>
  );
};

export default ErrorBookContainer;
