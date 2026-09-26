type SubscriptionUser = {
  subscription?: {
    status?: string;
    dateOfDeactivation?: Date | string;
  };
} | null;

export function hasActiveSubscription(user: SubscriptionUser): boolean {
  if (!user?.subscription) return false;
  if (user.subscription.status !== "active") return false;
  if (!user.subscription.dateOfDeactivation) return true;
  return new Date(user.subscription.dateOfDeactivation) > new Date();
}
