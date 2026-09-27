"use client";

import { subjectsForExam } from "@/lib/subjects";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContinuousRevisionForm from "./ContinuousRevisionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRightIcon, NotebookTextIcon } from "lucide-react";

const ContinuousRevision = () => {
  const [activeSubject, setActiveSubject] = useState("");

  const user = useAppSelector((state) => state.user.user);
  const userSubjects = subjectsForExam(
    user?.academic?.subjects,
    user?.academic?.competitiveExam
  );

  const userStandard = useAppSelector(
    (state) => state.user.user?.academic.standard
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-auto w-full rounded-[28px] border-0 bg-transparent px-5 py-4"
          onClick={() => setActiveSubject(userSubjects?.[0].name || "")}
        >
          <span className="flex w-full items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5F3FF] text-primary">
                <NotebookTextIcon className="size-6" />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <p className="text-lg font-semibold text-dark-primary">What did you learn today?</p>
                <p className="text-sm text-secondary-text">
                  Add what you covered in class today.
                </p>
              </span>
            </span>
            <ChevronRightIcon className="size-5 shrink-0 text-secondary-text" />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>What did you learn today?</DialogTitle>
          <DialogDescription className="sr-only">
            Add topics to your planner
          </DialogDescription>
        </DialogHeader>
        <ContinuousRevisionForm
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
          userStandard={userStandard!}
          userSubjects={userSubjects!}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContinuousRevision;
