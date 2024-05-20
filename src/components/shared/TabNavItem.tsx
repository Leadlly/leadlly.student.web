"use client";

import { motion } from "framer-motion";
import { TTabNavItemProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const TabNavItem = ({
  id,
  title,
  activeTab,
  setActiveTab,
  className,
  activeTabClassName,
  titleClassName,
  layoutIdPrefix,
}: TTabNavItemProps) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  const layoutId = `${layoutIdPrefix}_active__tab`;

  return (
    <li
      onClick={handleClick}
      className={cn(
        "relative text-xs p-1 rounded cursor-pointer transition-all ease-in-out",
        activeTab === id ? "text-white" : "text-black",
        className
      )}>
      {activeTab === id && (
        <motion.div
          layoutId={layoutId}
          transition={{
            type: "spring",
            duration: 0.6,
          }}
          className={cn("absolute rounded bg-primary", activeTabClassName)}
        />
      )}
      <span className={cn("relative z-10", titleClassName)}>{title}</span>
    </li>
  );
};

export default TabNavItem;
