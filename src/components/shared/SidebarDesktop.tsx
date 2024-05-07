"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import { Logo } from "@/components";
import { TSidebarLink } from "../../helpers/types";
import React from "react";

const SidebarDesktop = ({
  sidebar,
  setOpen,
}: {
  sidebar: TSidebarLink[];
  setOpen?: (sheetOpen: boolean) => void;
}) => {
  const pathname = usePathname();
  return (
    <aside className="bg-sidebar-background w-full h-full lg:w-20 xl:w-sidebar lg:h-main-height lg:rounded-xl overflow-y-hidden">
      <div className="w-full px-[25px] py-4">
        <Link href={"/"}>
          <Logo
            fullLogoWidth={150}
            fullLogoHeight={50}
            fullLogoClassName="block lg:hidden xl:block"
            smallLogoWidth={90}
            smallLogoHeight={90}
            smallLogoClassName="hidden lg:block xl:hidden"
          />
        </Link>
      </div>
      <ul className="flex flex-col justify-start items-start lg:items-center xl:items-start gap-2 h-full lg:h-[calc(100dvh-97px)] overflow-x-hidden overflow-y-auto custom__scrollbar px-[25px] lg:px-3 xl:px-[25px] py-3">
        {sidebar.map((item) => {
          return (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => {
                if (setOpen) {
                  setOpen(false);
                }
              }}
              className={clsx(
                pathname === item.href ? "bg-primary" : "",
                "px-4 py-3 rounded-[11px] w-full flex items-center justify-start lg:justify-center xl:justify-start"
              )}>
              <li className="flex items-center gap-3 capitalize text-base md:text-[20px]">
                <item.icon
                  stroke={pathname === item.href ? "white" : "#5A10D9"}
                />
                <div
                  className={clsx(
                    "lg:hidden xl:block",
                    pathname === item.href ? "text-white" : "text-primary"
                  )}>
                  {item.label}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default SidebarDesktop;
