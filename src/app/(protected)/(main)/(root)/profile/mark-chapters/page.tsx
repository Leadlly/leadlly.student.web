"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MarkChapters from "@/app/(protected)/(main)/(student-account)/manage-account/_components/MarkChapters";

const MarkChaptersPage = () => {
  return (
    <div className="flex h-full min-h-0 w-full flex-col py-4 pr-2">
      <Link
        href="/profile"
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#EFEAF8] bg-white"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <MarkChapters />
    </div>
  );
};

export default MarkChaptersPage;
