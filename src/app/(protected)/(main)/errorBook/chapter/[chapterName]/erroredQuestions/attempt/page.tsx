
import { getChapterErrorBook } from "@/actions/error_book_actions";
import PremiumGate from "@/components/shared/PremiumGate";
import Quiz from "./_components/Quiz";

const Report = async (props: { params: Promise<{ chapterName: string }> }) => {
  const params = await props.params;
  const { chapterErrorBook } = await getChapterErrorBook({
    chapter: params.chapterName,
  });
  return (
    <PremiumGate variant="errorBook">
      <div>
        <Quiz
          questionTitle={decodeURIComponent(params.chapterName)}
          subtitle="Errored Questions"
          questions={chapterErrorBook}
        />
      </div>
    </PremiumGate>
  );
};

export default Report;
