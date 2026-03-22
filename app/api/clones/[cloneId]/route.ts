import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    // 🔥 NORMALISATION IMAGE (ULTRA IMPORTANT)
    const mainAvatar =
      clone.avatarUrl ||
      clone.visualAppearance?.referenceImageUrl ||
      clone.mediaAssets?.find((m) => m.type === "AVATAR")?.url ||
      null;

    return NextResponse.json({
      clone: {
        ...clone,
        avatarUrl: mainAvatar,
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