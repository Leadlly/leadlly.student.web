import { getErrorBook } from "@/actions/error_book_actions";
import PremiumGate from "@/components/shared/PremiumGate";
import Mobile_errorNote from "../components/Mobile_errorNote";

const Page = async () => {
  const { errorNotes } = await getErrorBook();
  return (
    <PremiumGate variant="errorBook">
      <div>
        <Mobile_errorNote errorNotes={errorNotes} />
      </div>
    </PremiumGate>
  );
};

export default Page;
