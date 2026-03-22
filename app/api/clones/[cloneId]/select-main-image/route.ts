import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{ cloneId: string }>;
};

export async function POST(req: Request, context: RouteContext) {
  try {
    const { userId: clerkUserId } = await auth();
    const { cloneId } = await context.params;

    if (!clerkUserId) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const body = await req.json();
    const imageUrl =
      typeof body?.imageUrl === "string" && body.imageUrl.trim()
        ? body.imageUrl.trim()
        : null;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "imageUrl est obligatoire." },
        { status: 400 }
      );
    }

    const clone = await db.clone.findFirst({
      where: {
        id: cloneId,
        user: {
          clerkUserId,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!clone) {
      return NextResponse.json({ error: "Clone introuvable." }, { status: 404 });
    }

    const updatedClone = await db.clone.update({
      where: {
        id: clone.id,
      },
      data: {
        avatarUrl: imageUrl,
        visualAppearance: {
          upsert: {
            create: {
              referenceImageUrl: imageUrl,
            },
            update: {
              referenceImageUrl: imageUrl,
            },
          },
        },
      },
      select: {
        id: true,
        avatarUrl: true,
        visualAppearance: {
          select: {
            referenceImageUrl: true,
          },
        },
      },
    });

    const existingAvatarAsset = await db.cloneMediaAsset.findFirst({
      where: {
        cloneId: clone.id,
        type: "AVATAR",
        url: imageUrl,
      },
      select: {
        id: true,
      },
    });

    if (!existingAvatarAsset) {
      await db.cloneMediaAsset.create({
        data: {
          cloneId: clone.id,
          type: "AVATAR",
          url: imageUrl,
          altText: `${clone.name} main avatar`,
          prompt: null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      clone: updatedClone,
    });
  } catch (error) {
    console.error("POST /api/clones/[cloneId]/select-main-image error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de définir l’image principale.",
      },
      { status: 500 }
    );
  }
}