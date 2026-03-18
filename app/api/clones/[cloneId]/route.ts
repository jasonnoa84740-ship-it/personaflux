import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface RouteContext {
  params: Promise<{
    cloneId: string;
  }>;
}

export async function GET(_: Request, context: RouteContext) {
  try {
    const { cloneId } = await context.params;

    const clone = await db.clone.findUnique({
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
    console.error("GET /api/clones/[cloneId] error:", error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer le clone.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: RouteContext) {
  try {
    const { cloneId } = await context.params;
    const body = await req.json();

    const clone = await db.clone.update({
      where: { id: cloneId },
      data: {
        name: body.name,
        category: body.category ?? null,
        shortDescription: body.shortDescription ?? null,
        description: body.description ?? null,
        avatarUrl: body.avatarUrl ?? null,
        tone: body.tone ?? null,
        responseStyle: body.responseStyle ?? null,
        primaryGoal: body.primaryGoal ?? null,
        traits: Array.isArray(body.traits) ? body.traits : [],
        status: body.status ?? undefined,
        visibility: body.visibility ?? undefined,
      },
    });

    return NextResponse.json({ clone });
  } catch (error) {
    console.error("PATCH /api/clones/[cloneId] error:", error);

    return NextResponse.json(
      {
        error: "Impossible de modifier le clone.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}