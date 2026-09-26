"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudyDnaProfile } from "@/actions/study_check_actions";
import { StudyDnaDialog } from "@/components/study-check/StudyDnaReport";
import { StudyDnaProfile } from "@/lib/study-check/dna";

const OpenDnaReport = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<StudyDnaProfile | null>(null);

  useEffect(() => {
    let cancelled = false;
    getStudyDnaProfile()
      .then((data) => {
        if (cancelled) return;
        if (!data?.profile) throw new Error("Could not load DNA report.");
        setProfile(data.profile);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not load DNA report.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const close = () => {
    setOpen(false);
    router.replace("/", { scroll: false });
  };

  return (
    <StudyDnaDialog
      open={open}
      loading={loading}
      error={error}
      profile={profile}
      onClose={close}
    />
  );
};

export default OpenDnaReport;
