"use client";

import { useCallback, useEffect, useState } from "react";

import AccountSubjectForm from "./AccountSubjectForm";

import { TabContent } from "@/components";

import AccountChaptersList from "./AccountChaptersList";
import { getSubjectChapters } from "@/actions/question_actions";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { cn } from "@/lib/utils";
import { TRevisionProps } from "@/helpers/types";

const AccountStudyProgress = ({
  unrevisedTopics,
}: {
  unrevisedTopics: TRevisionProps[];
}) => {
  const [activeTabChapters, setActiveTabChapters] = useState([]);
  const [resetForm, setResetForm] = useState<() => void>(() => {
    return () => {};
  });

  const userData = useAppSelector((state) => state.user.user);
  const userSubjects = userData?.academic.subjects;
  const userStandard = userData?.academic.standard;

  const [activeTab, setActiveTab] = useState(userSubjects?.[0].name);

  const handleResetForm = useCallback((resetFunction: () => void) => {
    setResetForm(() => resetFunction);
  }, []);

  useEffect(() => {
    const chapters = async () => {
      try {
        const data = await getSubjectChapters(activeTab!, userStandard!);
        setActiveTabChapters(data.chapters);
      } catch (error: any) {
        toast.error("Unable to fetch chapters!", {
          description: error.message,
        });
      }
    };
    chapters();
  }, [activeTab, userStandard]);

  return (
    <section className="border rounded-xl h-full shadow-[0_0_28.6px_-4px_rgba(150,84,244,0.16)] flex flex-col">
      <div className="bg-primary/15 px-3 py-2 flex items-center justify-between rounded-t-xl">
        <h3 className="text-lg lg:text-2xl font-semibold">
          Student Study Feedback
        </h3>

        <div className="flex items-center gap-x-5">
          <ul className="flex items-center justify-between p-1 bg-white rounded-md">
            {userSubjects?.map((subject) => (
              <li
                key={subject.name}
                className={cn(
                  "relative text-base md:text-lg capitalize font-medium px-3 py-1 cursor-pointer z-30",
                  activeTab === subject.name && "text-white"
                )}
                onClick={() => {
                  setActiveTab(subject.name);
                  resetForm();
                }}
              >
                {subject.name}
                {activeTab === subject.name && (
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
      </div>

      <TabContent id={activeTab!} activeTab={activeTab!} className="h-auto">
        <AccountSubjectForm
          subjectChapters={activeTabChapters}
          activeSubject={activeTab!}
          userStandard={userStandard!}
          onResetForm={handleResetForm}
        />
      </TabContent>

      <AccountChaptersList unrevisedTopics={unrevisedTopics} />
    </section>
  );
};

export default AccountStudyProgress;
