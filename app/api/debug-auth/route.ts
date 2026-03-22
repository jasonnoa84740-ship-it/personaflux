import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const session = await auth();
  const user = await currentUser();

  return NextResponse.json({
    authUserId: session.userId ?? null,
    sessionClaims: session.sessionClaims ?? null,
    currentUserId: user?.id ?? null,
    currentUserEmail:
      user?.emailAddresses?.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress ?? null,
  });
}