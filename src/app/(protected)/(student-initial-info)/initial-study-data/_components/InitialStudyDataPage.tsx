"use client";

import React, { useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { TRevisionProps } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";
import { MotionDiv } from "@/components/shared/MotionDiv";
import Image from "next/image";
import AccountSubjectForm from "../../../(main)/(student-account)/manage-account/_components/AccountSubjectForm";

import AccountChaptersList from "../../../(main)/(student-account)/manage-account/_components/AccountChaptersList";
import ProceedButton from "./ProceedButton";

const InitialStudyDataPage = ({
  unrevisedTopics,
}: {
  unrevisedTopics: TRevisionProps[];
}) => {
  const [resetForm, setResetForm] = useState<() => void>(() => {
    return () => {};
  });

  const userAcademic = useAppSelector((state) => state.user.user?.academic);

  const [activeSubject, setActiveSubject] = useState(
    userAcademic?.subjects?.[0]?.name
  );

  const handleResetForm = useCallback((resetFunction: () => void) => {
    setResetForm(() => resetFunction);
  }, []);

  return (
    <section className="flex w-full flex-col lg:h-full">
      <div className="px-3 flex items-center justify-between">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly"
          width={130}
          height={60}
        />

        <ProceedButton />
      </div>
      <div className="flex w-full flex-col space-y-3 px-3 py-6 sm:px-10 lg:min-h-0 lg:flex-1 lg:p-6">
        <h1 className="max-w-md w-full mx-auto text-center text-xl md:text-3xl font-semibold">
          Tell us what you learnt till now
        </h1>
        <p className="max-w-md w-full mx-auto text-center text-base leading-tight">
          Choose the chapters and topics you&apos;ve finished in your classes
        </p>

        <div className="flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-2 border-2 rounded-md p-1 sm:gap-3">
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
          userStandard={userAcademic?.standard!}
          onResetForm={handleResetForm}
        />

        <div className="custom__scrollbar lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          <AccountChaptersList unrevisedTopics={unrevisedTopics!} />
        </div>
      </div>
    </section>
  );
};

export default InitialStudyDataPage;
