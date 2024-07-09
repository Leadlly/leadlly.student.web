"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { subjectChaptersProps } from "@/helpers/types";
import { getSubjectChapters } from "@/actions/question_actions";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { MotionDiv } from "@/components/shared/MotionDiv";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPlanner } from "@/actions/planner_actions";
import AccountSubjectForm from "@/app/(student-account)/manage-account/_components/AccountSubjectForm";
import { Loader2 } from "lucide-react";

const InitialStudyData = () => {
  const [isProceeding, setIsProceeding] = useState(false);
  const [activeSubject, setActiveSubject] = useState("maths");
  const [activeTabChapters, setActiveTabChapters] = useState<
    subjectChaptersProps[]
  >([]);
  const [resetForm, setResetForm] = useState<() => void>(() => {
    return () => {};
  });

  const router = useRouter();

  const userAcademic = useAppSelector((state) => state.user.user?.academic);

  const handleResetForm = useCallback((resetFunction: () => void) => {
    setResetForm(() => resetFunction);
  }, []);

  const handleProceedClick = async () => {
    setIsProceeding(true);

    try {
      const plannerData = await createPlanner();

      if (plannerData.success) {
        toast.success(plannerData.message);
        console.log("inside plannerData");

        router.replace("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProceeding(false);
    }
  };

  useEffect(() => {
    const chapters = async () => {
      try {
        const data = await getSubjectChapters(
          activeSubject,
          userAcademic?.standard!
        );

        setActiveTabChapters(data.chapters);
      } catch (error: any) {
        toast.error("Unable to fetch chapters!", {
          description: error.message,
        });
      }
    };

    chapters();
  }, [activeSubject, userAcademic?.standard]);

  return (
    <section className="flex flex-col px-3 h-full w-full">
      <div>
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly"
          width={130}
          height={60}
        />
      </div>
      <div className="flex-1 grid place-items-center w-full">
        <div className="w-full rounded-xl shadow-2xl px-3 py-10 sm:px-10 lg:p-6 space-y-10">
          <div className="w-full text-center">
            <h1 className="text-xl md:text-3xl font-semibold">
              Tell us about your learnings
            </h1>
          </div>
          <div className="w-full grid place-items-center">
            <ul className="flex items-center gap-3 border-2 rounded-md p-1">
              {userAcademic?.subjects?.map((subject) => (
                <li
                  key={subject.name}
                  className={cn(
                    "relative text-base md:text-lg capitalize font-medium px-3 py-1 cursor-pointer",
                    activeSubject === subject.name && "text-white"
                  )}
                  onClick={() => {
                    setActiveSubject(subject.name);
                    resetForm();
                  }}
                >
                  {subject.name}
                  {activeSubject === subject.name && (
                    <MotionDiv
                      layoutId="active_chat_tab"
                      transition={{
                        type: "spring",
                        duration: 0.6,
                      }}
                      className="absolute rounded h-full w-full -z-10 bg-primary inset-0"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <AccountSubjectForm
            activeSubject={activeSubject}
            subjectChapters={activeTabChapters}
            userStandard={userAcademic?.standard!}
            onResetForm={handleResetForm}
          />

          <div className="w-full grid place-items-center">
            <Button
              onClick={handleProceedClick}
              className="text-base"
              disabled={isProceeding}
            >
              {isProceeding ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                "Proceed"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InitialStudyData;
