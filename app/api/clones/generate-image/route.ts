import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const traits = Array.isArray(body?.traits) ? body.traits.join(", ") : "";

    const prompt = [
      "Create a photorealistic portrait of a believable premium human persona.",
      body?.name ? `Name inspiration: ${body.name}.` : "",
      body?.category ? `Category: ${body.category}.` : "",
      body?.shortDescription
        ? `Short description: ${body.shortDescription}.`
        : "",
      body?.description ? `Detailed identity: ${body.description}.` : "",
      body?.responseStyle ? `Communication style: ${body.responseStyle}.` : "",
      body?.primaryGoal ? `Primary goal: ${body.primaryGoal}.` : "",
      traits ? `Personality traits: ${traits}.` : "",
      "Style requirements: premium, realistic, human, cinematic lighting, natural skin texture, editorial portrait, luxury brand aesthetic, ultra detailed, coherent face identity, high-end lifestyle visual.",
      "Avoid illustration, cartoon, anime, distorted anatomy, blurry face, extra fingers, duplicated features, low quality rendering.",
    ]
      .filter(Boolean)
      .join(" ");

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const image = result.data?.[0];

    if (!image?.b64_json) {
      return NextResponse.json(
        { error: "No image returned by the model." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:image/png;base64,${image.b64_json}`,
      promptUsed: prompt,
    });
  } catch (error) {
    console.error("POST /api/clones/generate-image error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Image generation failed.",
      },
      { status: 500 }
    );
  }
}