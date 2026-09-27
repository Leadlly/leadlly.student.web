"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MarkChapters from "@/app/(protected)/(main)/(student-account)/manage-account/_components/MarkChapters";

const MarkChaptersPage = () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-lg flex-col overflow-y-auto py-4">
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
