"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ViewDnaReportButton from "@/components/study-check/ViewDnaReportButton";
import { useAppSelector } from "@/redux/hooks";
import CustomizePlanner from "../(dashboard)/_components/customizePlanner";
import ReferAndEarn from "../(dashboard)/_components/referAndEarn";

const ProfileHub = () => {
  const user = useAppSelector((state) => state.user.user);
  const name = [user?.firstname, user?.lastname].filter(Boolean).join(" ");

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto py-4 pr-2">
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EFEAF8] bg-white"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <section className="rounded-[28px] border border-[#EFEAF8] bg-white p-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.avatar?.url} alt={name || "Profile"} />
            <AvatarFallback className="text-xl font-semibold capitalize">
              {user?.firstname?.[0]}
              {user?.lastname?.[0] ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold capitalize text-dark-primary">
              {name || "Your profile"}
            </p>
            <p className="truncate text-sm text-secondary-text">{user?.email}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href="/manage-account"
            className="flex h-12 items-center justify-center rounded-full bg-[#F5F3FF] text-sm font-semibold text-primary"
          >
            View entire profile
          </Link>
          <ViewDnaReportButton className="w-full" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <Link
          href="/profile/upcoming-tests"
          className="flex items-center gap-3 rounded-[20px] border border-[#EFEAF8] bg-white px-4 py-4 text-left shadow-sm"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5F3FF] text-primary">
            <Calendar className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-semibold text-dark-primary">
              Add your upcoming test
            </span>
            <span className="block text-sm text-secondary-text">
              Add the test name, date, and syllabus. Edit it anytime.
            </span>
          </span>
        </Link>
        <CustomizePlanner />
        <ReferAndEarn />
        <Link
          href="/profile/mark-chapters"
          className="flex h-16 items-center gap-3 rounded-full border border-[#EFEAF8] bg-white px-4 text-lg font-semibold text-dark-primary"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F3FF] text-primary">
            <BookOpen className="h-5 w-5" />
          </span>
          Mark chapters for revision
        </Link>
        <Link
          href="/subscription-plans"
          className="flex h-16 items-center gap-3 rounded-full border border-[#EFEAF8] bg-white px-4 text-lg font-semibold text-dark-primary"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F3FF] text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          Upgrade to premium
        </Link>
      </section>
    </div>
  );
};

export default ProfileHub;
