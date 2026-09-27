"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getStudyCheck, saveStudyCheck } from "@/actions/study_check_actions";
import ChapterTagger from "@/components/study-check/ChapterTagger";
import { defaultStudyCheckAnswers } from "@/lib/study-check/content";
import { LearningCoverage, TaggedChapter } from "@/lib/study-check/types";

const MarkChapters = () => {
  const [answers, setAnswers] = useState(defaultStudyCheckAnswers());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getStudyCheck()
      .then((data) => {
        if (data.studyCheck?.answers) {
          setAnswers({
            ...defaultStudyCheckAnswers(),
            ...data.studyCheck.answers,
          });
        }
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const onChange = (
    next: Record<string, TaggedChapter>,
    coverage: LearningCoverage
  ) => {
    const updated = { ...answers, chapters: next, coverage };
    setAnswers(updated);
    const { chapters: _chapters, phone: _phone, ...rest } = updated;
    saveStudyCheck({
      answers: { ...rest, chapters: next, coverage },
      stepId: "syllabus",
    }).catch(() => undefined);
  };

  if (!ready) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col">
      <h2 className="text-2xl font-bold text-dark-primary">
        Mark chapters for revision
      </h2>
      <p className="mt-1 mb-4 text-sm text-secondary-text">
        Add finished chapters to the revision planner.
      </p>
      <ChapterTagger
        chapters={answers.chapters}
        onChaptersChange={onChange}
        completeLabel="Save chapters"
        onComplete={async () => {
          toast.success("Chapters saved.");
        }}
      />
    </div>
  );
};

export default MarkChapters;
