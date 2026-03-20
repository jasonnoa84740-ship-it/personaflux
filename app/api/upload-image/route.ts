import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: Request) {
  try {
    console.log("UPLOAD ROUTE START");
    console.log("SUPABASE URL OK:", !!supabaseUrl);
    console.log("SERVICE ROLE KEY OK:", !!supabaseServiceRoleKey);

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        {
          error:
            "Variables Supabase manquantes. Vérifie NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const formData = await req.formData();
    const file = formData.get("file");

    console.log("FILE EXISTS:", !!file);

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Fichier requis ou format invalide." },
        { status: 400 }
      );
    }

    console.log("FILE NAME:", file.name);
    console.log("FILE TYPE:", file.type);
    console.log("FILE SIZE:", file.size);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "png";
    const fileName = `chat/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    console.log("UPLOAD PATH:", fileName);

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("chat-images")
      .upload(fileName, buffer, {
        contentType: file.type || "image/png",
        upsert: false,
      });

    console.log("UPLOAD DATA:", uploadData);
    console.log("UPLOAD ERROR:", uploadError);

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message, details: uploadError },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("chat-images")
      .getPublicUrl(fileName);

    console.log("PUBLIC URL:", publicUrlData?.publicUrl);

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      path: fileName,
    });
  } catch (error) {
    console.error("UPLOAD ROUTE FATAL ERROR:", error);

    return NextResponse.json(
      {
        error: "Upload impossible.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}