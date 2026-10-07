"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-semibold text-dark-primary">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-secondary-text">
        This page could not be loaded. You can try again or go back to the
        dashboard.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full bg-[#F5F3FF] px-5 py-2 text-sm font-semibold text-primary"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
