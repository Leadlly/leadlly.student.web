import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadlly | Initial Info",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default function InitialInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-main-height">{children}</div>;
}
