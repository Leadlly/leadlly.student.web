import { Header, TabNavItem } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";

const trackerTabs = [
  {
    id: "maths",
    subject: "maths",
  },
  {
    id: "physics",
    subject: "physics",
  },
  {
    id: "chemistry",
    subject: "chemistry",
  },
];

const Tracker = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const activeSubject = searchParams["subject"] ?? "maths";

  return (
    <div className="pt-16 md:pt-0">
      <Header
        title="Tracker"
        titleClassName="text-xl md:text-3xl lg:text-page-title"
      />

      <ul className="flex items-center justify-around md:justify-start gap-5 md:gap-10 mt-4 md:mt-8">
        {trackerTabs.map((tab) => (
          <Link key={tab.id} href={`/tracker?subject=${tab.subject}`}>
            <li
              className={cn(
                "capitalize border-2 px-5 md:px-7 py-2 rounded-lg md:rounded-xl text-base md:text-2xl leading-none font-semibold",
                activeSubject === tab.id
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-transparent border-[#878787] text-[#878787]"
              )}>
              {tab.subject}
            </li>
          </Link>
        ))}
      </ul>

      <hr className="my-4 border" />
    </div>
  );
};

export default Tracker;
