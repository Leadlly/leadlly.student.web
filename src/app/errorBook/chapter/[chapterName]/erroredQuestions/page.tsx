// pages/report.tsx
import { FC } from "react";
import DesktopView from "./_components/DesktopView";
import Defaultview from "./_components/Defaultview";
import { getChapterErrorBook } from "@/actions/error_book_actions";

const Report = async ({ params }: { params: { chapterName: string } }) => {
  const { chapterErrorBook } = await getChapterErrorBook({
    chapter: params.chapterName,
  });
  return (
    <div>
      <div className="hidden xl:block h-full">
        <DesktopView
          chapterErrorBook={chapterErrorBook}
          chapterName={decodeURIComponent(params.chapterName)}
        />
      </div>

      <div className="h-full block xl:hidden md:pb-4">
        <Defaultview
          chapterErrorBook={chapterErrorBook}
          chapterName={decodeURIComponent(params.chapterName)}
        />
      </div>
    </div>
  );
};

export default Report;
