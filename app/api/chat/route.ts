import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ResponseMode = "steps" | "detailed" | "short" | "smart";

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function isChatMessage(value: unknown): value is ChatMessage {
  return (
    !!value &&
    typeof value === "object" &&
    "role" in value &&
    "content" in value &&
    (((value as { role: unknown }).role === "user") ||
      ((value as { role: unknown }).role === "assistant")) &&
    typeof (value as { content: unknown }).content === "string"
  );
}

function detectResponseMode(message: string, history: ChatMessage[] = []): ResponseMode {
  const text = normalize(message);

  const asksDetailed =
    /detaille|détaille|developpe|développe|approfondis|approfondir|explique|explication|analyse|creuse|plus de details|plus de détails/.test(
      text
    );

  const asksSteps =
    /etapes|étapes|step by step|pas a pas|pas à pas|strategie|stratégie|plan|roadmap|comment faire|comment construire|comment lancer|comment creer|comment créer/.test(
      text
    );

  const asksShort =
    /court|courte|bref|rapidement|résume|resume|en une phrase|simple/.test(text);

  const veryShortFollowup =
    text.length <= 24 &&
    /detaille|détaille|explique|developpe|développe|approfondis/.test(text);

  const previousAssistant = [...history]
    .reverse()
    .find((m) => m.role === "assistant")?.content;

  if (asksDetailed || (veryShortFollowup && !!previousAssistant)) {
    return "detailed";
  }

  if (asksSteps) {
    return "steps";
  }

  if (asksShort) {
    return "short";
  }

  return "smart";
}

function buildSystemPrompt(mode: ResponseMode, hasImage: boolean) {
  const base = `
Tu es un clone IA premium dans PersonaFlux.

CONTEXTE :
- l'utilisateur construit ou améliore des clones IA
- "clone cuisinier" = assistant IA cuisine, pas robot physique
- si une image est jointe, tu peux l'analyser visuellement et répondre à partir de ce que tu vois
- tu réponds de façon utile, concrète et naturelle

STYLE GLOBAL :
- naturel
- direct
- lisible
- pas robotique
- pas de morale
- pas de phrases philosophiques
- pas de conseils de vie
- pas de banalités

INTERDIT :
- répondre comme un article de blog
- faire des longues introductions
- demander inutilement plus de détails
- inventer ce que tu ne vois pas dans l'image

RÈGLE IMAGE :
${
  hasImage
    ? "- une image est jointe : décris seulement ce que tu peux raisonnablement observer, puis réponds à la question de l'utilisateur"
    : "- aucune image jointe"
}
`.trim();

  if (mode === "steps") {
    return `${base}

FORMAT OBLIGATOIRE :
Idée principale :
...

Étape 1 :
...

Étape 2 :
...

Étape 3 :
...

Conseil :
...

RÈGLES :
- une ligne vide entre chaque bloc
- phrases courtes
- maximum 3 étapes
- plan actionnable
- pas de pavé
`.trim();
  }

  if (mode === "detailed") {
    return `${base}

FORMAT OBLIGATOIRE :
- commence par une idée centrale claire
- puis développe en 2 à 4 paragraphes courts
- chaque paragraphe doit ajouter une vraie précision
- pas de format Étape 1 / Étape 2
- pas de liste numérotée

RÈGLES :
- approfondis vraiment
- explique le pourquoi
- explique le comment
- reste concret
`.trim();
  }

  if (mode === "short") {
    return `${base}

FORMAT OBLIGATOIRE :
- réponse courte
- 2 à 4 phrases maximum
- va droit au point
- pas de liste
- pas de format étapes
`.trim();
  }

  return `${base}

FORMAT OBLIGATOIRE :
- adapte le format à la demande
- si l'utilisateur demande un plan, réponds en étapes
- si l'utilisateur demande une explication, réponds en paragraphes courts
- sinon réponds de manière concise et naturelle
`.trim();
}

function postProcessReply(reply: string, mode: ResponseMode) {
  let output = reply.trim();

  output = output
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  if (mode === "steps") {
    output = output
      .replace(/Idée principale\s*:/gi, "Idée principale :")
      .replace(/Étape\s*1\s*:/gi, "\n\nÉtape 1 :\n")
      .replace(/Étape\s*2\s*:/gi, "\n\nÉtape 2 :\n")
      .replace(/Étape\s*3\s*:/gi, "\n\nÉtape 3 :\n")
      .replace(/Conseil\s*:/gi, "\n\nConseil :\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  if (mode === "detailed") {
    output = output
      .replace(/^Idée principale\s*:\s*/i, "")
      .replace(/Étape\s*1\s*:/gi, "")
      .replace(/Étape\s*2\s*:/gi, "")
      .replace(/Étape\s*3\s*:/gi, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  if (mode === "short") {
    const sentences = output
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4);

    output = sentences.join(" ");
  }

  return output;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = safeString(body?.message);
    const history: ChatMessage[] = Array.isArray(body?.history)
      ? body.history.filter(isChatMessage)
      : [];
    const imageDataUrl = safeString(body?.imageDataUrl);

    if (!message && !imageDataUrl) {
      return NextResponse.json(
        { error: "Message ou image requis." },
        { status: 400 }
      );
    }

    const mode = detectResponseMode(message || "analyse cette image", history);
    const systemPrompt = buildSystemPrompt(mode, !!imageDataUrl);

    const recentHistory = history.slice(-8).map((m: ChatMessage) => ({
      role: m.role,
      content: m.content,
    }));

    const inputContent: Array<
      | { type: "input_text"; text: string }
      | { type: "input_image"; image_url: string; detail: "auto" }
    > = [
      {
        type: "input_text",
        text: `${systemPrompt}\n\nHistorique récent:\n${recentHistory
          .map((m: ChatMessage) => `${m.role}: ${m.content}`)
          .join("\n")}\n\nMessage utilisateur:\n${message || "Analyse cette image."}`,
      },
    ];

    if (imageDataUrl) {
      inputContent.push({
        type: "input_image",
        image_url: imageDataUrl,
        detail: "auto",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: inputContent,
        },
      ],
      max_output_tokens:
        mode === "detailed"
          ? 320
          : mode === "steps"
          ? 220
          : mode === "short"
          ? 120
          : 180,
    });

    const rawReply = response.output_text?.trim() || "Pas de réponse générée.";
    const reply = postProcessReply(rawReply, mode);

    return NextResponse.json({
      reply,
      mode,
    });
  } catch (error) {
    console.error("POST /api/chat error:", error);

    return NextResponse.json(
      {
        error: "Erreur pendant la génération de la réponse.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}