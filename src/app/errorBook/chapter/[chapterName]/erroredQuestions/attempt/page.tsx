
import { FC } from "react";
import { getChapterErrorBook } from "@/actions/error_book_actions";
import Quiz from "./_components/Quiz";

const Report = async ({ params }: { params: { chapterName: string } }) => {
  const { chapterErrorBook } = await getChapterErrorBook({
    chapter: params.chapterName,
  });console.log(chapterErrorBook)
  return (
    <div>
      <Quiz
        questionTitle={decodeURIComponent(params.chapterName)}
        subtitle="Errored Questions"
        questions={chapterErrorBook}
      />
    </div>
  );
};

export default Report;
