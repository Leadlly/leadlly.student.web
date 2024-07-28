import React from "react";
import ErrorBookContainer from "./components/ErrorBookContainer";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

const ErrorBook = () => {
  return (
    <div className="max-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold py-4 text-center md:text-left">
          Error Book
        </h1>
        <Link href={'/error-book/mobile-error-notes'} className="flex gap-2 rounded-lg lg:hidden bg-blue-500 text-white items-center p-1 px-2">
          <Pencil className="size-4" />
          Notes
        </Link>
      </div>

      <ErrorBookContainer />
    </div>
  );
};

export default ErrorBook;
