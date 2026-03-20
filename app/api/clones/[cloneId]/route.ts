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
    });

    if (!clone) {
      return NextResponse.json(
        { error: "Clone introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({ clone });
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