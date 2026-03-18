-- CreateEnum
CREATE TYPE "CloneVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'MEMBERS_ONLY');

-- CreateEnum
CREATE TYPE "CloneStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'STARTER', 'PRO', 'SCALE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('INACTIVE', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIALING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clone" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "shortDescription" TEXT,
    "description" TEXT,
    "avatarUrl" TEXT,
    "voiceEnabled" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "CloneVisibility" NOT NULL DEFAULT 'PRIVATE',
    "status" "CloneStatus" NOT NULL DEFAULT 'DRAFT',
    "tone" TEXT,
    "responseStyle" TEXT,
    "primaryGoal" TEXT,
    "traits" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "cloneId" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubId" TEXT,
    "stripePriceId" TEXT,
    "plan" "PlanType" NOT NULL DEFAULT 'FREE',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'INACTIVE',
    "currentPeriodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clone_slug_key" ON "Clone"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeCustomerId_key" ON "Subscription"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubId_key" ON "Subscription"("stripeSubId");

-- AddForeignKey
ALTER TABLE "Clone" ADD CONSTRAINT "Clone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
