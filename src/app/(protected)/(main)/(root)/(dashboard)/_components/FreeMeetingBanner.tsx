"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { getCohortWhatsappLink, markCohortJoined } from "@/actions/cohort_actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";

const FreeMeetingBanner = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [opening, setOpening] = useState(false);

  const isNew =
    !!user?.createdAt &&
    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 7;
  const show =
    isNew &&
    !user?.cohortJoinedAt &&
    !!user?.freeMeeting &&
    user.freeMeeting.availed === false &&
    !user.freeMeeting.claimedAt;

  if (!show) return null;

  const join = async () => {
    if (opening) return;
    setOpening(true);
    try {
      const url = await getCohortWhatsappLink();
      if (!url) {
        throw new Error("Join link is not available yet.");
      }
      window.open(url, "_blank", "noopener,noreferrer");
      const cohortJoinedAt = await markCohortJoined();
      if (user) {
        dispatch(userData({ ...user, cohortJoinedAt }));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not open the cohort link.");
    } finally {
      setOpening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={join}
      disabled={opening}
      className="mb-4 flex min-h-20 w-full items-center justify-between rounded-[34px] bg-white px-4 py-3 pr-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.18)] disabled:opacity-70"
    >
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-leadlly">
          <Image
            src="/assets/images/free-meeting-icon.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </span>
        <span className="text-[15px] font-bold leading-5 text-dark-primary">
          Join the one week free
          <br />
          consistency cohort
        </span>
      </span>
      <span className="shrink-0 rounded-full bg-leadlly px-5 py-2.5 text-[13px] font-bold text-white">
        Join
      </span>
    </button>
  );
};

export default FreeMeetingBanner;
