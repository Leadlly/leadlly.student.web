import { Button } from "@/components/ui/button";
import Link from "next/link";
import TrialPeriodTimer from "./TrialPeriodTimer";

const UpgradeSubscriptionButton = () => {
  return (
    <Link href="/subscription-plans" className="mr-3">
      <Button className="px-5 md:px-10 flex-col">
        <span>Upgrade</span>
        <TrialPeriodTimer />
      </Button>
    </Link>
  );
};

export default UpgradeSubscriptionButton;
