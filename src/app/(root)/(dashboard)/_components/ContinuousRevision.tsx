"use client";

import { ChatIcon, VideoChatIcon, RequestMeetingIcon } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContinuousRevisionForm from "./ContinuousRevisionForm";

const ContinuousRevision = () => {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  const userStandard = useAppSelector(
    (state) => state.user.user?.academic.standard
  );

  return (
    <div className="px-4 md:px-6 py-2 space-y-2 h-full">
      {!activeSubject ? (
        <>
          <h4 className="text-2xl text-primary font-bold">
            What did you Learnt New Today?
          </h4>

          <div className="flex items-center justify-center">
            <Image
              alt="Leadlly student studying"
              src="/assets/images/revision_zone.png"
              width={110}
              height={110}
            />
          </div>

          <div className="flex items-center justify-center gap-3 w-full">
            {userSubjects?.map((subject) => (
              <Button
                key={subject.name}
                variant={"outline"}
                className="capitalize"
                onClick={() => setActiveSubject(subject.name)}
              >
                {subject.name}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <ContinuousRevisionForm
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
          userStandard={userStandard!}
          userSubjects={userSubjects!}
        />
      )}
    </div>
  );
};

export default ContinuousRevision;
