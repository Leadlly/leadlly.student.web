import { getPricing } from "@/actions/subscription_actions";
import { getUser } from "@/actions/user_actions";
import SubscriptionPlansPage from "./_components/SubscriptionPlansPage";

const SubscriptionPlans = async () => {
  const userData = getUser();

  const pricingData = getPricing("pro");

  const [userInfo, pricingInfo] = await Promise.all([userData, pricingData]);

  return <SubscriptionPlansPage pricing={pricingInfo} user={userInfo.user} />;
};

export default SubscriptionPlans;
