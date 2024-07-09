"use client";

import { createPlanner } from "@/actions/planner_actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ProceedButton = () => {
  const [isProceeding, setIsProceeding] = useState(false);

  const router = useRouter();

  const handleProceedClick = async () => {
    setIsProceeding(true);

    try {
      const plannerData = await createPlanner();

      if (plannerData.success) {
        toast.success(plannerData.message);
        console.log("inside plannerData");

        router.replace("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProceeding(false);
    }
  };
  return (
    <Button
      onClick={handleProceedClick}
      className="text-base w-20 leading-tight text-primary border-primary hover:bg-primary/10 hover:text-primary"
      disabled={isProceeding}
      variant={"outline"}
    >
      {isProceeding ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
        </>
      ) : (
        "Proceed"
      )}
    </Button>
  );
};

export default ProceedButton;
