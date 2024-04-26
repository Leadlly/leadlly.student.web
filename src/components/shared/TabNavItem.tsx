"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { TTabNavItemProps } from "@/helpers/types";

const TabNavItem = ({
  id,
  title,
  activeTab,
  setActiveTab,
}: TTabNavItemProps) => {
  const handleClick = () => {
    setActiveTab(id);
  };
  return (
    <li
      onClick={handleClick}
      className={clsx(
        "relative text-xs p-1 rounded cursor-pointer transition-all ease-in-out",
        activeTab === id ? "text-white" : "text-black"
      )}>
      {activeTab === id && (
        <motion.div
          layoutId="active__tab"
          transition={{
            type: "spring",
            duration: 0.6,
          }}
          className="absolute inset-0 rounded bg-primary"
        />
      )}
      <span className="relative z-10">{title}</span>
    </li>
  );
};

export default TabNavItem;
