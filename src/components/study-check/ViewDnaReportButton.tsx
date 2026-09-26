"use client";

import { useCallback, useState } from "react";
import { getStudyDnaProfile } from "@/actions/study_check_actions";
import { Button } from "@/components/ui/button";
import { StudyDnaProfile } from "@/lib/study-check/dna";
import { cn } from "@/lib/utils";
import { StudyDnaDialog } from "./StudyDnaReport";

const ViewDnaReportButton = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<StudyDnaProfile | null>(null);

  const openReport = useCallback(async () => {
    setOpen(true);
    if (profile) return;
    setLoading(true);
    setError("");
    try {
      const data = await getStudyDnaProfile();
      if (!data?.profile) throw new Error("Could not load DNA report.");
      setProfile(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load DNA report.");
    } finally {
      setLoading(false);
    }
  }, [profile]);

  return (
    <>
      <Button
        type="button"
        onClick={openReport}
        className={cn(
          "h-11 rounded-full text-white",
          className
        )}
      >
        View DNA report
      </Button>
      <StudyDnaDialog
        open={open}
        loading={loading}
        error={error}
        profile={profile}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ViewDnaReportButton;
