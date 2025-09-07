import { RateLimiterPrisma } from "rate-limiter-flexible";
import { prisma } from "./prisma";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 2;
const PRO_POINTS = 100;
const DURATION = 30 * 24 * 60 * 60; // 30 days in seconds
const GENERATION_COST = 1; // 1 credit per generation

export async function getUsageTracker() {
  const { has } = await auth();
  const hasPremiumAccess = has({ plan: "pro" });
  const usageTracker = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: hasPremiumAccess ? PRO_POINTS : FREE_POINTS,
    duration: DURATION,
  });
  return usageTracker;
}

export async function consumeCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.consume(userId, GENERATION_COST);
  return result;
}

export async function getUsageStatus() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.get(userId);
  return result;
}
