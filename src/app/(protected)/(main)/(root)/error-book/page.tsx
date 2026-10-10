import React from "react";
import ErrorBookContainer from "./components/ErrorBookContainer";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { getErrorBook } from "@/actions/error_book_actions";
import { getUser } from "@/actions/user_actions";
import ErrorBookPaywall from "@/components/shared/ErrorBookPaywall";
import { hasActiveSubscription } from "@/lib/subscription";

const ErrorBook = async () => {
  const { user } = await getUser();
  if (!hasActiveSubscription(user)) {
    return <ErrorBookPaywall />;
  }

  const res = await getErrorBook();

  return (
    <div className="flex flex-col gap-4 md:h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-dark-primary md:text-3xl">Error Book</h1>
        <Link
          href="/error-book/mobile-error-notes"
          className="flex items-center gap-2 rounded-full bg-leadlly px-4 py-2 text-sm font-semibold text-white lg:hidden"
        >
          <Pencil className="size-4" />
          Notes
        </Link>
      </div>

      <div className="rounded-[34px] bg-white p-4 md:min-h-0 md:flex-1 md:overflow-hidden">
        <ErrorBookContainer
          errorBook={res?.errorBook}
          errorNotes={res?.errorNotes}
        />
      </div>
    </div>
  );
};

export default ErrorBook;
