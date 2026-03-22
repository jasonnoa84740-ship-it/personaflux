import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { buildCharacterBible } from "@/lib/clone/character-bible";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

async function generateUniqueSlug(base: string) {
  let slug = slugify(base);
  if (!slug) slug = `clone-${Date.now()}`;

  let finalSlug = slug;
  let count = 1;

  while (true) {
    const existing = await db.clone.findUnique({
      where: { slug: finalSlug },
      select: { id: true },
    });

    if (!existing) return finalSlug;

    count += 1;
    finalSlug = `${slug}-${count}`;
  }
}

export async function POST(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { error: "Utilisateur Clerk introuvable." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      name,
      category,
      shortDescription,
      description,
      avatarUrl,
      responseStyle,
      primaryGoal,
      tone,
      traits,
      visibility,
      status,
      appearance,
    } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Le nom du clone est obligatoire." },
        { status: 400 }
      );
    }

    const normalizedStatus = status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

    const normalizedVisibility =
      visibility === "PUBLIC" ||
      visibility === "MEMBERS_ONLY" ||
      visibility === "PRIVATE"
        ? visibility
        : "PRIVATE";

    const normalizedAvatarUrl =
      typeof avatarUrl === "string" && avatarUrl.trim() ? avatarUrl.trim() : null;

    let user = await db.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          clerkUserId,
          email:
            clerkUser.emailAddresses.find(
              (email) => email.id === clerkUser.primaryEmailAddressId
            )?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress || null,
          username: clerkUser.username || null,
          imageUrl: clerkUser.imageUrl || null,
        },
        select: { id: true },
      });
    }

    const slug = await generateUniqueSlug(name);

    const clone = await db.clone.create({
      data: {
        userId: user.id,
        name: name.trim(),
        slug,
        category: typeof category === "string" ? category : null,
        shortDescription:
          typeof shortDescription === "string" && shortDescription.trim()
            ? shortDescription.trim()
            : null,
        description:
          typeof description === "string" && description.trim()
            ? description.trim()
            : null,
        avatarUrl: normalizedAvatarUrl,
        responseStyle: typeof responseStyle === "string" ? responseStyle : null,
        primaryGoal: typeof primaryGoal === "string" ? primaryGoal : null,
        tone: typeof tone === "string" && tone.trim() ? tone.trim() : null,
        traits: Array.isArray(traits)
          ? traits.filter((item): item is string => typeof item === "string")
          : [],
        visibility: normalizedVisibility,
        status: normalizedStatus,

        visualAppearance: {
          create: {
            energy:
              typeof appearance?.energy === "string" && appearance.energy.trim()
                ? appearance.energy.trim()
                : typeof tone === "string" && tone.trim()
                  ? tone.trim()
                  : null,
            approxAgeRange:
              typeof appearance?.approxAgeRange === "string" &&
              appearance.approxAgeRange.trim()
                ? appearance.approxAgeRange.trim()
                : null,
            genderPresentation:
              typeof appearance?.genderPresentation === "string" &&
              appearance.genderPresentation.trim()
                ? appearance.genderPresentation.trim()
                : null,
            hairColor:
              typeof appearance?.hairColor === "string" &&
              appearance.hairColor.trim()
                ? appearance.hairColor.trim()
                : null,
            eyeColor:
              typeof appearance?.eyeColor === "string" &&
              appearance.eyeColor.trim()
                ? appearance.eyeColor.trim()
                : null,
            skinTone:
              typeof appearance?.skinTone === "string" &&
              appearance.skinTone.trim()
                ? appearance.skinTone.trim()
                : null,
            fashionStyle:
              typeof appearance?.fashionStyle === "string" &&
              appearance.fashionStyle.trim()
                ? appearance.fashionStyle.trim()
                : null,
            referenceImageUrl:
              typeof appearance?.referenceImageUrl === "string" &&
              appearance.referenceImageUrl.trim()
                ? appearance.referenceImageUrl.trim()
                : normalizedAvatarUrl,
          },
        },

        mediaAssets: normalizedAvatarUrl
          ? {
              create: [
                {
                  type: "AVATAR",
                  url: normalizedAvatarUrl,
                  altText: `${name.trim()} main avatar`,
                  prompt: null,
                },
              ],
            }
          : undefined,
      },
      include: {
        visualAppearance: true,
      },
    });

    const bible = buildCharacterBible({
      name: clone.name,
      description: clone.description,
      tone: clone.tone,
      appearance: clone.visualAppearance,
    });

    await db.cloneCharacterBible.create({
      data: {
        cloneId: clone.id,
        characterSummary: bible.characterSummary,
        canonicalVisualPrompt: bible.canonicalVisualPrompt,
        negativePrompt: bible.negativePrompt,
      },
    });

    return NextResponse.json(
      {
        clone: {
          id: clone.id,
          name: clone.name,
          slug: clone.slug,
          status: clone.status,
          avatarUrl: clone.avatarUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/clones error:", error);

    return NextResponse.json(
      {
        error: "Impossible de créer le clone.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}