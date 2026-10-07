import type { Metadata } from "next";
import { Sidebar, MobileMenu } from "@/components";
import { getMeetings } from "@/actions/meeting_actions";
import { TMeetingsProps } from "@/helpers/types";

export const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let inCompleteMeetingsLength = 0;
  try {
    const { meetings }: { meetings: TMeetingsProps[] } = await getMeetings("");
    inCompleteMeetingsLength = meetings?.length ?? 0;
  } catch {
    inCompleteMeetingsLength = 0;
  }

  return (
    <>
      <section className="relative">
        <div className="hidden md:block md:fixed md:top-3">
          <Sidebar meetingsLength={inCompleteMeetingsLength} />
        </div>
        <div className="h-main-height min-h-0 overflow-y-auto pl-4 pr-4 pb-24 md:ml-20 md:overflow-visible md:pb-0 md:pr-2 xl:ml-[261px]">
          {children}
        </div>
      </section>
      <section className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.1)] overflow-hidden">
        <MobileMenu meetingsLength={inCompleteMeetingsLength} />
      </section>
    </>
  );
}
