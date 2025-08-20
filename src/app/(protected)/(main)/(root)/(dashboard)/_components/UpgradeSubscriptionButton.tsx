import { Button } from "@/components/ui/button";
import Link from "next/link";
import TrialPeriodTimer from "./TrialPeriodTimer";
import { useAppSelector } from "@/redux/hooks";

const UpgradeSubscriptionButton = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <Link href="/subscription-plans" className="mr-3">
      <Button className="px-5 md:px-10 flex-col">
        <span>Upgrade</span>
        {user?.subscription.status !== "active" && <TrialPeriodTimer />}
      </Button>
    </Link>
  );
};

export default UpgradeSubscriptionButton;
