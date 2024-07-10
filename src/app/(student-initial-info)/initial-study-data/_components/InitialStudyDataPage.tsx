"use client";

import React, { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { subjectChaptersProps, TRevisionProps } from "@/helpers/types";
import { getSubjectChapters } from "@/actions/question_actions";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { MotionDiv } from "@/components/shared/MotionDiv";
import Image from "next/image";
import AccountSubjectForm from "@/app/(student-account)/manage-account/_components/AccountSubjectForm";
import AccountChaptersList from "@/app/(student-account)/manage-account/_components/AccountChaptersList";
import ProceedButton from "./ProceedButton";

const InitialStudyDataPage = ({
  unrevisedTopics,
}: {
  unrevisedTopics: TRevisionProps[];
}) => {
  const [activeTabChapters, setActiveTabChapters] = useState<
    subjectChaptersProps[]
  >([]);
  const [resetForm, setResetForm] = useState<() => void>(() => {
    return () => {};
  });

  const userAcademic = useAppSelector((state) => state.user.user?.academic);

  const [activeSubject, setActiveSubject] = useState(
    userAcademic?.subjects?.[0].name
  );

  const handleResetForm = useCallback((resetFunction: () => void) => {
    setResetForm(() => resetFunction);
  }, []);

  useEffect(() => {
    const chapters = async () => {
      try {
        const data = await getSubjectChapters(
          activeSubject!,
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
    <section className="flex flex-col w-full">
      <div className="px-3 flex items-center justify-between">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly"
          width={130}
          height={60}
        />

        <ProceedButton />
      </div>
      <div className="w-full h-[calc(100dvh-52px)] px-3 py-10 sm:px-10 lg:p-6 space-y-3 flex flex-col">
        <h1 className="max-w-md w-full mx-auto text-center text-xl md:text-3xl font-semibold">
          Tell us what you learnt till now
        </h1>
        <p className="max-w-md w-full mx-auto text-center text-base leading-tight">
          Choose the chapters and topics you&apos;ve finished in your classes
        </p>

        <div className="flex justify-center">
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
          activeSubject={activeSubject!}
          subjectChapters={activeTabChapters}
          userStandard={userAcademic?.standard!}
          onResetForm={handleResetForm}
        />

        <div className="flex-1 overflow-y-auto">
          <AccountChaptersList unrevisedTopics={unrevisedTopics!} />
        </div>
      </div>
    </section>
  );
};

export default InitialStudyDataPage;
