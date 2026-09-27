import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IndianRupee } from "lucide-react";
import ReferAndEarnContent from "@/components/shared/referral/ReferAndEarnContent";

const ReferAndEarn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-16 w-full justify-start gap-3 rounded-full border-[#EFEAF8] px-4 text-lg font-semibold text-dark-primary"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F3FF] text-primary">
            <IndianRupee className="h-5 w-5" />
          </span>
          Refer And Earn
        </Button>
      </DialogTrigger>

      <ReferAndEarnContent />
    </Dialog>
  );
};

export default ReferAndEarn;
