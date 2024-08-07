"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components";
import { TSidebarLink } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { joinRoom } from "@/actions/chat_actions";
import useSocket from "@/hooks/useSocket";

const SidebarDesktop = ({
  sidebar,
  meetingsLength,
}: {
  sidebar: TSidebarLink[];
  meetingsLength: number;
}) => {
  const pathname = usePathname();
  const userEmail = useAppSelector((state) => state.user.user?.email);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      console.log(`Socket initialized: ${socket.id}`);

      socket.on("connect", () => {
        console.log(`Connected with socket ID: ${socket.id}`);
        
        // Emit join_room event when connected
        if (userEmail) {
          console.log('Emitting join_room event');
          socket.emit('join_room', { userEmail });
        } else {
          console.error('User email is not available');
        }
      });

      return () => {
        socket.off('connect');
        // Ensure to remove other listeners if any
      };
    }
  }, [socket, userEmail]);

  const handleChatClick = async () => {
 
  };

  return (
    <aside className="bg-sidebar-background w-full h-full md:w-20 xl:w-sidebar md:h-main-height md:rounded-xl overflow-y-hidden shadow-xl">
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
      <ul className="flex flex-col justify-start items-start md:items-center xl:items-start gap-2 h-[calc(100dvh-97px)] overflow-x-hidden overflow-y-auto custom__scrollbar px-[25px] md:px-3 xl:px-[25px] py-3">
        {sidebar.map((item) => {
          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "relative px-4 py-3 rounded-xl md:rounded-full xl:rounded-xl w-full flex items-center justify-start md:justify-center xl:justify-start"
              )}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="sidebar_active_tab"
                  transition={{
                    type: "spring",
                    duration: 0.6,
                  }}
                  className="absolute rounded-full xl:rounded-xl h-full bg-primary inset-0"
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
              {item.label === 'chat' && (
                <button onClick={handleChatClick} className="absolute inset-0 w-full h-full cursor-pointer z-10" />
              )}
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default SidebarDesktop;
