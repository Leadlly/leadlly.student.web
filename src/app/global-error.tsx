"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="max-w-md text-sm text-gray-600">
            The app hit an unexpected error. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[#5A10D9] px-5 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
