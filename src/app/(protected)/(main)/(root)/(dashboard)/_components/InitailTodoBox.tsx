"use client";

import Link from "next/link";

const InitialTodoBox = () => {
  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl bg-primary/5 px-6 py-8 text-center">
      <h4 className="text-xl font-bold text-primary">Your planner is waiting on you</h4>
      <p className="max-w-md text-sm text-secondary-text">
        Mark the chapters you&apos;ve already finished in class so we can build
        today&apos;s revision plan.
      </p>
      <Link
        href="/profile/mark-chapters"
        className="inline-flex h-11 min-w-[220px] items-center justify-center rounded-full bg-leadlly px-5 text-sm font-semibold text-white"
      >
        Mark chapters for revision
      </Link>
    </div>
  );
};

export default InitialTodoBox;
