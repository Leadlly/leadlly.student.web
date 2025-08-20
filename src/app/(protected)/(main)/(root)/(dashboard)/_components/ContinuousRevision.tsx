"use client";

import Image from "next/image";
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

  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  const userStandard = useAppSelector(
    (state) => state.user.user?.academic.standard
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full border-0 h-full bg-transparent"
          onClick={() => setActiveSubject(userSubjects?.[0].name || "")}
        >
          <span className="flex items-center justify-between w-full">
            <span className="flex items-center gap-2">
              <NotebookTextIcon className="size-7" />
              <span className="flex-1">
                <p className="text-lg font-semibold">Learned something new?</p>
                <p className="text-sm text-left text-secondary-foreground">
                  Add topics to your planner
                </p>
              </span>
            </span>
            <ChevronRightIcon className="size-5" />
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>What did you learned today?</DialogTitle>
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
