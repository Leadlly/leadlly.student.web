"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Logo } from "@/components";
import UpgradePlanBanner from "@/components/shared/UpgradePlanBanner";
import { TSidebarLink } from "@/helpers/types";
import { hasActiveSubscription } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";

const SidebarDesktop = ({
  sidebar,
  meetingsLength,
}: {
  sidebar: TSidebarLink[];
  meetingsLength: number;
}) => {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user.user);
  const isFreeUser = !hasActiveSubscription(user);

  return (
    <aside className="bg-sidebar-background flex h-full w-full flex-col overflow-y-hidden shadow-xl md:h-main-height md:w-20 md:rounded-xl xl:w-sidebar">
      <div className="w-full px-[25px] py-4">
        <Link href={"/"}>
          <Logo
            fullLogoWidth={150}
            fullLogoHeight={50}
            fullLogoClassName="block md:hidden xl:block"
            smallLogoWidth={90}
            smallLogoHeight={90}
            smallLogoClassName="hidden md:block xl:hidden"
          />
        </Link>
      </div>
      <ul className="custom__scrollbar flex min-h-0 flex-1 flex-col items-start justify-start gap-2 overflow-x-hidden overflow-y-auto px-[25px] py-3 md:items-center md:px-3 xl:items-start xl:px-[25px]">
        {sidebar.map((item) => {
          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "relative flex w-full items-center justify-start rounded-full px-4 py-3 md:justify-center xl:justify-start"
              )}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="sidebar_active_tab"
                  transition={{
                    type: "spring",
                    duration: 0.6,
                  }}
                  className="absolute inset-0 h-full rounded-full bg-primary"
                />
              )}
              <li className="relative z-10 flex items-center gap-3 capitalize text-base md:text-[20px]">
                <div className="relative">
                  <item.icon
                    className={cn(
                      pathname === item.href
                        ? item.label !== "growth meter"
                          ? "stroke-white"
                          : "fill-white"
                        : item.label !== "growth meter"
                          ? "stroke-[#5A10D9]"
                          : "fill-[#5A10D9]"
                    )}
                  />
                  {item.label === "chat" && meetingsLength > 0 && (
                    <span
                      className={cn(
                        "absolute -top-1 -left-1 text-[10px] font-semibold size-4 rounded-full flex items-center justify-center p-1 text-white bg-[#0fd679]"
                      )}
                    >
                      {meetingsLength}
                    </span>
                  )}
                </div>
                <div
                  className={cn(
                    "md:hidden xl:block",
                    pathname === item.href ? "text-white" : "text-[#5A10D9]"
                  )}
                >
                  {item.label}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>

      {isFreeUser ? (
        <div className="shrink-0 border-t border-[#EFEAF8] p-3 md:px-2 xl:px-4 xl:pb-4">
          <div className="hidden xl:block">
            <UpgradePlanBanner compact />
          </div>
          <Link
            href="/subscription-plans"
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white xl:hidden"
            aria-label="Upgrade your plan"
            title="Upgrade your plan"
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      ) : null}
    </aside>
  );
};

export default SidebarDesktop;
