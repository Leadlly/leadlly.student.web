"use client";

import { subjectsForExam } from "@/lib/subjects";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContinuousRevisionForm from "./ContinuousRevisionForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRightIcon, NotebookTextIcon, X } from "lucide-react";

const ContinuousRevision = () => {
  const [open, setOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState("");

  const user = useAppSelector((state) => state.user.user);
  const userSubjects = subjectsForExam(
    user?.academic?.subjects,
    user?.academic?.competitiveExam
  );

  const userStandard = useAppSelector(
    (state) => state.user.user?.academic?.standard
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-auto w-full rounded-[28px] border-0 bg-transparent px-5 py-4"
          onClick={() => setActiveSubject(userSubjects?.[0]?.name || "")}
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

      <DialogContent className="rounded-[28px] p-5">
        <div className="flex items-start justify-between gap-3">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-bold text-dark-primary">
              Revise a chapter
            </DialogTitle>
            <DialogDescription className="text-[15px] font-medium text-secondary-text">
              Pick what you finished in class today.
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-secondary-text shadow">
            <X className="size-4" />
          </DialogClose>
        </div>
        <ContinuousRevisionForm
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
          userStandard={userStandard!}
          userSubjects={userSubjects!}
          onComplete={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContinuousRevision;
