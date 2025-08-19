
import { FC } from "react";
import { getChapterErrorBook } from "@/actions/error_book_actions";
import Quiz from "./_components/Quiz";

const Report = async (props: { params: Promise<{ chapterName: string }> }) => {
  const params = await props.params;
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
