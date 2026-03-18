import { db } from "@/lib/db";

export async function getUserSubscription(userId: string) {
  return db.subscription.findUnique({
    where: { userId },
  });
}

export async function isUserPremium(userId: string) {
  const subscription = await db.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) return false;

  const activeStatuses = ["ACTIVE", "TRIALING"];
  const activePlans = ["STARTER", "PRO", "SCALE"];

  return (
    activeStatuses.includes(subscription.status) &&
    activePlans.includes(subscription.plan)
  );
}