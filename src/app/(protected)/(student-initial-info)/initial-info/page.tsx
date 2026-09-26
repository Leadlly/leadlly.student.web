import { getUser } from "@/actions/user_actions";
import StudyCheckFlow from "@/components/study-check/StudyCheckFlow";
import { redirect } from "next/navigation";

const StudentInitialInfoFormPage = async () => {
  const { user } = await getUser();
  if (user?.onboard === true) {
    redirect("/");
  }

  return (
    <div className="h-full">
      <StudyCheckFlow />
    </div>
  );
};

export default StudentInitialInfoFormPage;
