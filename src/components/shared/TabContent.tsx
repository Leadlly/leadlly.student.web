"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { TTabContentProps } from "@/helpers/types";

const tabContentVariants: Variants = {
  initial: {
    x: 0,
    opacity: 1,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -100,
    opacity: 0,
  },
};

const TabContent = ({ id, activeTab, children }: TTabContentProps) => {
  return activeTab === id ? (
    <AnimatePresence mode="wait">
      <motion.div
        variants={tabContentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{
          duration: 0.5,
        }}>
        {children}
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export default TabContent;
