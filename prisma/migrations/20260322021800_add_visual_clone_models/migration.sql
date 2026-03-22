/*
  Warnings:

  - Added the required column `cloneId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CloneDomain" AS ENUM ('GENERAL', 'BRANDING', 'BUSINESS', 'COACHING', 'CREATOR', 'COOKING', 'EDUCATION', 'SALES');

-- CreateEnum
CREATE TYPE "ResponseFormat" AS ENUM ('NATURAL', 'SHORT', 'DETAILED', 'BULLETS', 'STEP_BY_STEP');

-- CreateEnum
CREATE TYPE "KnowledgeEntryType" AS ENUM ('FACT', 'FAQ', 'STYLE_RULE', 'OFFER', 'BIO', 'LIMIT', 'EXAMPLE');

-- CreateEnum
CREATE TYPE "MemoryType" AS ENUM ('FACT', 'PREFERENCE', 'GOAL', 'CONTEXT', 'LIMIT');

-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ConversationSource" AS ENUM ('WEB', 'EMBED', 'MOBILE', 'API');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST');

-- CreateEnum
CREATE TYPE "MediaAssetType" AS ENUM ('AVATAR', 'COVER', 'GALLERY', 'VOICE_SAMPLE', 'VIDEO');

-- CreateEnum
CREATE TYPE "CapabilityKey" AS ENUM ('CHAT', 'MEMORY', 'IMAGE_GENERATION', 'VIDEO_GENERATION', 'VOICE', 'LEAD_CAPTURE', 'PAYWALL', 'FILE_CONTEXT');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BILLING', 'PRODUCT', 'USAGE', 'SYSTEM', 'MARKETING');

-- CreateEnum
CREATE TYPE "SceneStatus" AS ENUM ('DRAFT', 'READY', 'GENERATING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "VideoJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Clone" ADD COLUMN     "allowFileContext" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allowLeadCapture" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allowMemory" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "customDomain" TEXT,
ADD COLUMN     "domain" "CloneDomain" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageGenerationEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTemplate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'fr',
ADD COLUMN     "leadCaptureEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "longDescription" TEXT,
ADD COLUMN     "maxResponseLength" INTEGER NOT NULL DEFAULT 900,
ADD COLUMN     "minResponseLength" INTEGER NOT NULL DEFAULT 80,
ADD COLUMN     "placeholderPrompt" TEXT,
ADD COLUMN     "publicHeadline" TEXT,
ADD COLUMN     "publicSubheadline" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "strictMode" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.6,
ADD COLUMN     "videoEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "websiteUrl" TEXT,
ADD COLUMN     "welcomeMessage" TEXT;

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'fr',
ADD COLUMN     "lastMessageAt" TIMESTAMP(3),
ADD COLUMN     "source" "ConversationSource" NOT NULL DEFAULT 'WEB',
ADD COLUMN     "status" "ConversationStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "summary" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "cloneId" TEXT NOT NULL,
ADD COLUMN     "containsLeadIntent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsPaymentIntent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "latencyMs" INTEGER,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "tokenCount" INTEGER;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "lastSeenAt" TIMESTAMP(3),
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tiktokUrl" TEXT,
ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "websiteUrl" TEXT,
ADD COLUMN     "youtubeUrl" TEXT;

-- CreateTable
CREATE TABLE "CloneConfig" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "systemIdentity" TEXT,
    "responseRules" TEXT,
    "safetyRules" TEXT,
    "forbiddenTopics" TEXT[],
    "preferredTopics" TEXT[],
    "fallbackMessage" TEXT,
    "fallbackWhenUnknown" BOOLEAN NOT NULL DEFAULT true,
    "useKnowledgeBase" BOOLEAN NOT NULL DEFAULT true,
    "useConversationMemory" BOOLEAN NOT NULL DEFAULT true,
    "useStyleGuard" BOOLEAN NOT NULL DEFAULT true,
    "useTopicGuard" BOOLEAN NOT NULL DEFAULT true,
    "useLeadCapturePrompt" BOOLEAN NOT NULL DEFAULT false,
    "askFollowupQuestions" BOOLEAN NOT NULL DEFAULT true,
    "allowOffTopic" BOOLEAN NOT NULL DEFAULT false,
    "responseFormat" "ResponseFormat" NOT NULL DEFAULT 'NATURAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClonePricing" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "monthlyPrice" INTEGER,
    "yearlyPrice" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "freeMessagesLimit" INTEGER NOT NULL DEFAULT 10,
    "paidMessagesLimit" INTEGER NOT NULL DEFAULT 1000,
    "showPricingPage" BOOLEAN NOT NULL DEFAULT false,
    "ctaText" TEXT,
    "ctaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClonePricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneAnalytics" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "totalConversations" INTEGER NOT NULL DEFAULT 0,
    "totalMessages" INTEGER NOT NULL DEFAULT 0,
    "totalLeads" INTEGER NOT NULL DEFAULT 0,
    "totalConversions" INTEGER NOT NULL DEFAULT 0,
    "totalRevenueCents" INTEGER NOT NULL DEFAULT 0,
    "avgConversationLength" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgMessagesPerUser" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bounceRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "conversionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneCapability" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "key" "CapabilityKey" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "label" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneCapability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneFaq" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptPreset" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "isSuggested" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeEntry" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT,
    "type" "KnowledgeEntryType" NOT NULL DEFAULT 'FACT',
    "topic" TEXT,
    "sourceLabel" TEXT,
    "sourceUrl" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryEntry" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "conversationId" TEXT,
    "userId" TEXT,
    "content" TEXT NOT NULL,
    "summary" TEXT,
    "type" "MemoryType" NOT NULL DEFAULT 'FACT',
    "importance" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemoryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadSubmission" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "conversationId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "notes" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneMediaAsset" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "type" "MediaAssetType" NOT NULL,
    "url" TEXT NOT NULL,
    "storagePath" TEXT,
    "altText" TEXT,
    "prompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneMediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneVisualAppearance" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "energy" TEXT,
    "approxAgeRange" TEXT,
    "genderPresentation" TEXT,
    "hairColor" TEXT,
    "eyeColor" TEXT,
    "skinTone" TEXT,
    "fashionStyle" TEXT,
    "referenceImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneVisualAppearance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneCharacterBible" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "characterSummary" TEXT NOT NULL,
    "canonicalVisualPrompt" TEXT NOT NULL,
    "negativePrompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneCharacterBible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneScene" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "templateKey" TEXT NOT NULL,
    "actionPrompt" TEXT NOT NULL,
    "environmentPrompt" TEXT,
    "cameraPrompt" TEXT,
    "wardrobeOverride" TEXT,
    "status" "SceneStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneScene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloneVideoJob" (
    "id" TEXT NOT NULL,
    "cloneId" TEXT NOT NULL,
    "sceneId" TEXT,
    "provider" TEXT NOT NULL,
    "providerJobId" TEXT,
    "status" "VideoJobStatus" NOT NULL DEFAULT 'PENDING',
    "prompt" TEXT,
    "outputUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloneVideoJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageCounter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monthKey" TEXT NOT NULL,
    "messagesCount" INTEGER NOT NULL DEFAULT 0,
    "clonesCreatedCount" INTEGER NOT NULL DEFAULT 0,
    "imagesGeneratedCount" INTEGER NOT NULL DEFAULT 0,
    "videosGeneratedCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsageCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CloneConfig_cloneId_key" ON "CloneConfig"("cloneId");

-- CreateIndex
CREATE UNIQUE INDEX "ClonePricing_cloneId_key" ON "ClonePricing"("cloneId");

-- CreateIndex
CREATE UNIQUE INDEX "CloneAnalytics_cloneId_key" ON "CloneAnalytics"("cloneId");

-- CreateIndex
CREATE INDEX "CloneCapability_cloneId_idx" ON "CloneCapability"("cloneId");

-- CreateIndex
CREATE UNIQUE INDEX "CloneCapability_cloneId_key_key" ON "CloneCapability"("cloneId", "key");

-- CreateIndex
CREATE INDEX "CloneFaq_cloneId_position_idx" ON "CloneFaq"("cloneId", "position");

-- CreateIndex
CREATE INDEX "PromptPreset_cloneId_isSuggested_idx" ON "PromptPreset"("cloneId", "isSuggested");

-- CreateIndex
CREATE INDEX "PromptPreset_cloneId_position_idx" ON "PromptPreset"("cloneId", "position");

-- CreateIndex
CREATE INDEX "KnowledgeEntry_cloneId_isActive_idx" ON "KnowledgeEntry"("cloneId", "isActive");

-- CreateIndex
CREATE INDEX "KnowledgeEntry_cloneId_type_idx" ON "KnowledgeEntry"("cloneId", "type");

-- CreateIndex
CREATE INDEX "KnowledgeEntry_cloneId_priority_idx" ON "KnowledgeEntry"("cloneId", "priority");

-- CreateIndex
CREATE INDEX "KnowledgeEntry_topic_idx" ON "KnowledgeEntry"("topic");

-- CreateIndex
CREATE INDEX "MemoryEntry_cloneId_type_idx" ON "MemoryEntry"("cloneId", "type");

-- CreateIndex
CREATE INDEX "MemoryEntry_conversationId_idx" ON "MemoryEntry"("conversationId");

-- CreateIndex
CREATE INDEX "MemoryEntry_userId_idx" ON "MemoryEntry"("userId");

-- CreateIndex
CREATE INDEX "LeadSubmission_cloneId_status_idx" ON "LeadSubmission"("cloneId", "status");

-- CreateIndex
CREATE INDEX "LeadSubmission_conversationId_idx" ON "LeadSubmission"("conversationId");

-- CreateIndex
CREATE INDEX "LeadSubmission_email_idx" ON "LeadSubmission"("email");

-- CreateIndex
CREATE INDEX "CloneMediaAsset_cloneId_type_idx" ON "CloneMediaAsset"("cloneId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "CloneVisualAppearance_cloneId_key" ON "CloneVisualAppearance"("cloneId");

-- CreateIndex
CREATE INDEX "CloneVisualAppearance_cloneId_idx" ON "CloneVisualAppearance"("cloneId");

-- CreateIndex
CREATE UNIQUE INDEX "CloneCharacterBible_cloneId_key" ON "CloneCharacterBible"("cloneId");

-- CreateIndex
CREATE INDEX "CloneCharacterBible_cloneId_idx" ON "CloneCharacterBible"("cloneId");

-- CreateIndex
CREATE INDEX "CloneScene_cloneId_idx" ON "CloneScene"("cloneId");

-- CreateIndex
CREATE INDEX "CloneScene_templateKey_idx" ON "CloneScene"("templateKey");

-- CreateIndex
CREATE INDEX "CloneScene_status_idx" ON "CloneScene"("status");

-- CreateIndex
CREATE INDEX "CloneVideoJob_cloneId_idx" ON "CloneVideoJob"("cloneId");

-- CreateIndex
CREATE INDEX "CloneVideoJob_sceneId_idx" ON "CloneVideoJob"("sceneId");

-- CreateIndex
CREATE INDEX "CloneVideoJob_status_idx" ON "CloneVideoJob"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UsageCounter_userId_key" ON "UsageCounter"("userId");

-- CreateIndex
CREATE INDEX "UsageCounter_monthKey_idx" ON "UsageCounter"("monthKey");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_keyHash_key" ON "ApiKey"("keyHash");

-- CreateIndex
CREATE INDEX "ApiKey_userId_idx" ON "ApiKey"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "Clone_userId_idx" ON "Clone"("userId");

-- CreateIndex
CREATE INDEX "Clone_slug_idx" ON "Clone"("slug");

-- CreateIndex
CREATE INDEX "Clone_status_idx" ON "Clone"("status");

-- CreateIndex
CREATE INDEX "Clone_visibility_idx" ON "Clone"("visibility");

-- CreateIndex
CREATE INDEX "Clone_domain_idx" ON "Clone"("domain");

-- CreateIndex
CREATE INDEX "Clone_featured_idx" ON "Clone"("featured");

-- CreateIndex
CREATE INDEX "Clone_userId_status_idx" ON "Clone"("userId", "status");

-- CreateIndex
CREATE INDEX "Clone_userId_visibility_idx" ON "Clone"("userId", "visibility");

-- CreateIndex
CREATE INDEX "Conversation_userId_idx" ON "Conversation"("userId");

-- CreateIndex
CREATE INDEX "Conversation_cloneId_idx" ON "Conversation"("cloneId");

-- CreateIndex
CREATE INDEX "Conversation_status_idx" ON "Conversation"("status");

-- CreateIndex
CREATE INDEX "Conversation_lastMessageAt_idx" ON "Conversation"("lastMessageAt");

-- CreateIndex
CREATE INDEX "Conversation_cloneId_updatedAt_idx" ON "Conversation"("cloneId", "updatedAt");

-- CreateIndex
CREATE INDEX "Message_conversationId_createdAt_idx" ON "Message"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_cloneId_createdAt_idx" ON "Message"("cloneId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_role_idx" ON "Message"("role");

-- CreateIndex
CREATE INDEX "User_clerkUserId_idx" ON "User"("clerkUserId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CloneConfig" ADD CONSTRAINT "CloneConfig_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClonePricing" ADD CONSTRAINT "ClonePricing_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneAnalytics" ADD CONSTRAINT "CloneAnalytics_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneCapability" ADD CONSTRAINT "CloneCapability_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneFaq" ADD CONSTRAINT "CloneFaq_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptPreset" ADD CONSTRAINT "PromptPreset_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeEntry" ADD CONSTRAINT "KnowledgeEntry_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryEntry" ADD CONSTRAINT "MemoryEntry_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryEntry" ADD CONSTRAINT "MemoryEntry_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryEntry" ADD CONSTRAINT "MemoryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadSubmission" ADD CONSTRAINT "LeadSubmission_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadSubmission" ADD CONSTRAINT "LeadSubmission_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneMediaAsset" ADD CONSTRAINT "CloneMediaAsset_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneVisualAppearance" ADD CONSTRAINT "CloneVisualAppearance_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneCharacterBible" ADD CONSTRAINT "CloneCharacterBible_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneScene" ADD CONSTRAINT "CloneScene_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneVideoJob" ADD CONSTRAINT "CloneVideoJob_cloneId_fkey" FOREIGN KEY ("cloneId") REFERENCES "Clone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloneVideoJob" ADD CONSTRAINT "CloneVideoJob_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "CloneScene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageCounter" ADD CONSTRAINT "UsageCounter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
