import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

function normalizeAvatar(clone: {
  avatarUrl?: string | null;
  visualAppearance?: { referenceImageUrl?: string | null } | null;
  mediaAssets?: Array<{ type?: string | null; url?: string | null }> | null;
}) {
  return (
    clone.avatarUrl ||
    clone.visualAppearance?.referenceImageUrl ||
    clone.mediaAssets?.find((m) => m.type === "AVATAR")?.url ||
    null
  );
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ cloneId: string }> }
) {
  try {
    const { cloneId } = await context.params;

    if (!cloneId) {
      return NextResponse.json(
        { error: "cloneId manquant" },
        { status: 400 }
      );
    }

    const clone = await prisma.clone.findUnique({
      where: { id: cloneId },
      include: {
        visualAppearance: true,
        mediaAssets: true,
      },
    });

    if (!clone) {
      return NextResponse.json(
        { error: "Clone introuvable." },
        { status: 404 }
      );
    }

    const avatarUrl = normalizeAvatar(clone);

    return NextResponse.json({
      clone: {
        ...clone,
        avatarUrl,
      },
    });
  } catch (error) {
    console.error("GET CLONE ERROR:", error);

    return NextResponse.json(
      {
        error: "Erreur pendant le chargement du clone.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ cloneId: string }> }
) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const { cloneId } = await context.params;

    if (!cloneId) {
      return NextResponse.json(
        { error: "cloneId manquant" },
        { status: 400 }
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
    } = body ?? {};

    const existingClone = await prisma.clone.findUnique({
      where: { id: cloneId },
      include: {
        user: {
          select: {
            clerkUserId: true,
          },
        },
        visualAppearance: true,
        mediaAssets: true,
      },
    });

    if (!existingClone) {
      return NextResponse.json(
        { error: "Clone introuvable." },
        { status: 404 }
      );
    }

    if (existingClone.user.clerkUserId !== clerkUserId) {
      return NextResponse.json(
        { error: "Accès interdit." },
        { status: 403 }
      );
    }

    const normalizedVisibility =
      visibility === "PUBLIC" ||
      visibility === "MEMBERS_ONLY" ||
      visibility === "PRIVATE"
        ? visibility
        : existingClone.visibility;

    const normalizedStatus =
      status === "PUBLISHED" || status === "DRAFT"
        ? status
        : existingClone.status;

    const normalizedAvatarUrl =
      typeof avatarUrl === "string" && avatarUrl.trim()
        ? avatarUrl.trim()
        : null;

    const updatedClone = await prisma.clone.update({
      where: { id: cloneId },
      data: {
        name:
          typeof name === "string" && name.trim()
            ? name.trim()
            : existingClone.name,
        category:
          typeof category === "string" && category.trim()
            ? category.trim()
            : null,
        shortDescription:
          typeof shortDescription === "string" && shortDescription.trim()
            ? shortDescription.trim()
            : null,
        description:
          typeof description === "string" && description.trim()
            ? description.trim()
            : null,
        avatarUrl: normalizedAvatarUrl,
        responseStyle:
          typeof responseStyle === "string" && responseStyle.trim()
            ? responseStyle.trim()
            : null,
        primaryGoal:
          typeof primaryGoal === "string" && primaryGoal.trim()
            ? primaryGoal.trim()
            : null,
        tone:
          typeof tone === "string" && tone.trim()
            ? tone.trim()
            : null,
        traits: Array.isArray(traits)
          ? traits.filter((item): item is string => typeof item === "string")
          : [],
        visibility: normalizedVisibility,
        status: normalizedStatus,
        visualAppearance: {
          upsert: {
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
                  : typeof responseStyle === "string" && responseStyle.trim()
                    ? responseStyle.trim()
                    : null,
              referenceImageUrl:
                typeof appearance?.referenceImageUrl === "string" &&
                appearance.referenceImageUrl.trim()
                  ? appearance.referenceImageUrl.trim()
                  : normalizedAvatarUrl,
            },
            update: {
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
                  : typeof responseStyle === "string" && responseStyle.trim()
                    ? responseStyle.trim()
                    : null,
              referenceImageUrl:
                typeof appearance?.referenceImageUrl === "string" &&
                appearance.referenceImageUrl.trim()
                  ? appearance.referenceImageUrl.trim()
                  : normalizedAvatarUrl,
            },
          },
        },
      },
      include: {
        visualAppearance: true,
        mediaAssets: true,
      },
    });

    if (normalizedAvatarUrl) {
      const existingAvatarAsset = updatedClone.mediaAssets?.find(
        (asset) => asset.type === "AVATAR"
      );

      if (existingAvatarAsset) {
        await prisma.cloneMediaAsset.update({
          where: { id: existingAvatarAsset.id },
          data: {
            url: normalizedAvatarUrl,
            altText: `${updatedClone.name} main avatar`,
          },
        });
      } else {
        await prisma.cloneMediaAsset.create({
          data: {
            cloneId: updatedClone.id,
            type: "AVATAR",
            url: normalizedAvatarUrl,
            altText: `${updatedClone.name} main avatar`,
            prompt: null,
          },
        });
      }
    }

    const refreshedClone = await prisma.clone.findUnique({
      where: { id: cloneId },
      include: {
        visualAppearance: true,
        mediaAssets: true,
      },
    });

    if (!refreshedClone) {
      return NextResponse.json(
        { error: "Clone introuvable après mise à jour." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      clone: {
        ...refreshedClone,
        avatarUrl: normalizeAvatar(refreshedClone),
      },
    });
  } catch (error) {
    console.error("PATCH CLONE ERROR:", error);

    return NextResponse.json(
      {
        error: "Erreur pendant la mise à jour du clone.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ cloneId: string }> }
) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const { cloneId } = await context.params;

    if (!cloneId) {
      return NextResponse.json(
        { error: "cloneId manquant" },
        { status: 400 }
      );
    }

    const existingClone = await prisma.clone.findUnique({
      where: { id: cloneId },
      include: {
        user: {
          select: {
            clerkUserId: true,
          },
        },
      },
    });

    if (!existingClone) {
      return NextResponse.json(
        { error: "Clone introuvable." },
        { status: 404 }
      );
    }

    if (existingClone.user.clerkUserId !== clerkUserId) {
      return NextResponse.json(
        { error: "Accès interdit." },
        { status: 403 }
      );
    }

    await prisma.clone.delete({
      where: { id: cloneId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE CLONE ERROR:", error);

    return NextResponse.json(
      {
        error: "Erreur pendant la suppression du clone.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}