import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function GET() {
  try {
    const clones = await db.clone.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ clones });
  } catch (error) {
    console.error("GET /api/clones error:", error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer les clones.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, name } = body;

    if (!userId || !name) {
      return NextResponse.json(
        { error: "userId et name sont obligatoires." },
        { status: 400 }
      );
    }

    const baseSlug = slugify(name);
    let finalSlug = baseSlug || `clone-${Date.now()}`;

    const existing = await db.clone.findUnique({
      where: { slug: finalSlug },
    });

    if (existing) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    const clone = await db.clone.create({
      data: {
        userId,
        name,
        slug: finalSlug,
        category: body.category ?? null,
        shortDescription: body.shortDescription ?? null,
        description: body.description ?? null,
        avatarUrl: body.avatarUrl ?? null,
        tone: body.tone ?? null,
        responseStyle: body.responseStyle ?? null,
        primaryGoal: body.primaryGoal ?? null,
        traits: Array.isArray(body.traits) ? body.traits : [],
      },
    });

    return NextResponse.json({ clone }, { status: 201 });
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