import { getErrorBook } from "@/actions/error_book_actions";
import Mobile_errorNote from "../components/Mobile_errorNote";

const Page = async () => {
  const { errorNotes } = await getErrorBook();
  return (
    <div>
      <Mobile_errorNote errorNotes={errorNotes} />
    </div>
  );
};

export default Page;
