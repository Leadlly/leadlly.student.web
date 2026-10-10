"use client";

import { useRouter } from "next/navigation";

import ReferAndEarnContent from "@/components/shared/referral/ReferAndEarnContent";
import { Dialog } from "@/components/ui/dialog";

/**
 * Full-page Refer & Earn for the locked subscription-end flow
 * (allowlisted like mobile /refer-earn).
 */
export default function ReferEarnPage() {
  const router = useRouter();

  return (
    <div className="min-h-full w-full bg-white">
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) router.push("/subscription-end");
        }}
      >
        <ReferAndEarnContent className="md:!left-4 xl:!left-4" />
      </Dialog>
    </div>
  );
}
