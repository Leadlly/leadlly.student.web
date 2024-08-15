"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/contexts/socket/socketProvider";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";
import { getMeetings } from "@/actions/meeting_actions";
import { NotificationBadgeProps } from "@/helpers/types";

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ type }) => {
  const { notifications } = useSocket();
  const user = useAppSelector((state) => state.user.user);
  const messagesCount = useAppSelector((state) => state.unreadMessages.messagesCount);
 
  const [chatCount, setChatCount] = useState<number>(0);
  const [meetingsLength, setMeetingsLength] = useState<number>(0);

  useEffect(() => {
    if (user?.email) {
      // Combine notifications from socket and Redux
      const combinedChatCount = (notifications[user.email] || 0) + messagesCount;
      setChatCount(combinedChatCount);
    } else {
      setChatCount(0);
    }
  }, [notifications, messagesCount, user?.email]);

  useEffect(() => {
    const fetchMeetingsLength = async () => {
      if (user?.email) {
        try {
          // Fetch meetings
          const upcomingMeetingData = await getMeetings("");
          setMeetingsLength(upcomingMeetingData.meetings.length || 0);
        } catch (error) {
          console.error("Failed to fetch meetings:", error);
        }
      }
    };

    fetchMeetingsLength();
  }, [user?.email]);

  let totalNotificationCount = 0;

  switch (type) {
    case "chat":
      totalNotificationCount = chatCount;
      break;
    case "meeting":
      totalNotificationCount = meetingsLength;
      break;
    case "all":
      totalNotificationCount = chatCount + meetingsLength;
      break;
    default:
      totalNotificationCount = 0;
  }

  if (totalNotificationCount <= 0) return null;

  return (
    <span
      className={cn(
        "absolute -top-1 -left-1 text-[10px] font-semibold size-4 rounded-full flex items-center justify-center p-1 text-white bg-[#0fd679]"
      )}
    >
      {totalNotificationCount}
    </span>
  );
};

export default NotificationBadge;
