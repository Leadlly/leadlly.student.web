"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { userSidebarLinks } from "@/helpers/constants";
import { cn } from "@/lib/utils";

const MobileMenu = () => {
  const [navScrollPosition, setNavScrollPosition] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        setNavScrollPosition(navbarRef.current.scrollLeft);
      }
    };

    if (navbarRef.current) {
      navbarRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (navbarRef.current) {
        navbarRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleMenuItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedItem = e.currentTarget;
    const navbarWidth = navbarRef.current?.offsetWidth || 0;
    const clickedItemRect = clickedItem.getBoundingClientRect();
    const isLastVisibleItem =
      clickedItemRect.right >= navbarWidth + navScrollPosition;
    const isFirstVisibleItem = clickedItemRect.left <= navScrollPosition;

    if (navbarRef.current) {
      if (isLastVisibleItem) {
        const newScrollPosition = clickedItemRect.left - navbarWidth / 5;
        navbarRef.current.scrollTo({
          left: newScrollPosition,
          behavior: "smooth",
        });
      } else if (isFirstVisibleItem) {
        const newScrollPosition = clickedItemRect.right - navbarWidth / 5;
        navbarRef.current.scrollTo({
          left: newScrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav className="overflow-x-auto no-scrollbar" ref={navbarRef}>
      <ul className="w-full h-[70px] flex items-center justify-between">
        {userSidebarLinks.map((item, index) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={handleMenuItemClick}
            className={cn(
              "relative min-w-[70px] h-full rounded-xl flex items-center justify-center"
            )}>
            <li className="w-full flex flex-col gap-2 items-center justify-center">
              <item.icon
                className={cn(
                  pathname === item.href
                    ? item.label !== "growth meter"
                      ? "stroke-[#5A10D9]"
                      : "fill-[#5A10D9]"
                    : item.label !== "growth meter"
                    ? "stroke-[#6a6a6a]"
                    : "fill-[#6a6a6a]"
                )}
              />
              <span
                className={cn(
                  "leading-none text-xs capitalize text-nowrap",
                  pathname === item.href ? "text-[#5A10D9]" : "text-[#6a6a6a]"
                )}>
                {item.label}
              </span>
            </li>

            {pathname === item.href && (
              <motion.div
                layoutId="activeLink"
                transition={{
                  type: "spring",
                  duration: 0.6,
                }}
                className={cn(
                  "absolute rounded bg-gradient-to-r from-white via-[#5A10D9] to-white h-[3px] w-full top-0 inset-x-0"
                )}
              />
            )}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
