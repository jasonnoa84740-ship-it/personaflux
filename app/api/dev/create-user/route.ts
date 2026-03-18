import { NextResponse } from "next/server";
import { db } from "@/lib/db";

async function createDevUser() {
  return db.user.upsert({
    where: { clerkUserId: "dev-user-1" },
    update: {},
    create: {
      clerkUserId: "dev-user-1",
      email: "dev@personaflux.local",
      username: "Jason",
    },
  });
}

export async function GET() {
  try {
    const user = await createDevUser();
    return NextResponse.json({ user });
  } catch (error) {
    console.error("create-user GET error:", error);

    return NextResponse.json(
      {
        error: "Erreur création user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const user = await createDevUser();
    return NextResponse.json({ user });
  } catch (error) {
    console.error("create-user POST error:", error);

    return NextResponse.json(
      {
        error: "Erreur création user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}