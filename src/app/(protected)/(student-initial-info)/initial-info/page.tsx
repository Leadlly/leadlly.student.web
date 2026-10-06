import { getUser } from "@/actions/user_actions";
import StudyCheckFlow from "@/components/study-check/StudyCheckFlow";
import { redirect } from "next/navigation";

const StudentInitialInfoFormPage = async () => {
  let user = null;
  try {
    const data = await getUser();
    user = data?.user ?? null;
  } catch (error) {
    console.error("Failed to load user for initial info:", error);
  }

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
