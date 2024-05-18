"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { userSidebarLinks } from "@/helpers/constants";
import { cn } from "@/lib/utils";

const MobileMenu = () => {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar px-3">
      {userSidebarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={cn(
            "relative p-3 h-full rounded-xl",
            pathname === item.href ? "" : ""
          )}>
          <li className="flex flex-col gap-2 items-center justify-center">
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
  );
};

export default MobileMenu;
