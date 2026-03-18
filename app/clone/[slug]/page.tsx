"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function CloneChatPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Alex";
  const description =
    searchParams.get("description") ||
    "Ambitieux, créatif, direct, aime construire des projets stylés.";
  const tone = searchParams.get("tone") || "friendly";
  const imageUrl =
    searchParams.get("imageUrl") ||
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Je suis ${name}. Vas-y, parle.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const currentInput = input.trim();

    const userMessage: Message = {
      role: "user",
      content: currentInput,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          history: nextMessages,
          clone: {
            name,
            description,
            tone,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Chat failed");
      }

      const cleanedReply = (data.reply || "Pas de réponse générée.")
        .replace(/^Clone:\s*/i, "")
        .trim();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: cleanedReply,
        },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error?.message || "Erreur pendant la réponse du clone.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[380px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
            <img
              src={imageUrl}
              alt={name}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div className="mt-5">
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="mt-3 inline-flex rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300">
              {tone}
            </div>
            <p className="mt-4 text-gray-400">{description}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-950 p-4 shadow-2xl">
          <div className="mb-4 h-[720px] space-y-4 overflow-y-auto rounded-2xl bg-black/40 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-lg leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-white text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3 text-white">
                ...
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder={`Écris à ${name}...`}
              className="flex-1 rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none placeholder:text-gray-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:opacity-85 disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}