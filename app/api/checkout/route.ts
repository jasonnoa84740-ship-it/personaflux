import { NextResponse } from "next/server";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY est manquante");
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2025-02-24.acacia",
});

const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER || "price_1TC6MWFNYq8jcM20szkLhAZI",
  pro: process.env.STRIPE_PRICE_PRO || "price_1TC5oGFNYq8jcM20Z98dFmlC",
  scale: process.env.STRIPE_PRICE_SCALE || "price_1TC5rQFNYq8jcM20PUjWp3ug",
};

const DEV_USER_ID = "cmmv2v0050001o0gyx4orav0e";

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    const priceId =
      plan === "starter"
        ? PRICE_IDS.starter
        : plan === "pro"
        ? PRICE_IDS.pro
        : plan === "scale"
        ? PRICE_IDS.scale
        : "";

    if (!priceId) {
      return NextResponse.json(
        { error: "Price Stripe introuvable pour ce plan." },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: DEV_USER_ID,
        plan,
      },
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("POST /api/checkout error:", error);

    return NextResponse.json(
      {
        error: "Erreur checkout Stripe.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}