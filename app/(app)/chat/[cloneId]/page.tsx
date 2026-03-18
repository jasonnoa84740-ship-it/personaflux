import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  Lock,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Send,
  Settings2,
  Share2,
  Sparkles,
  Volume2,
} from "lucide-react";
import { db } from "@/lib/db";

interface ChatPageProps {
  params: Promise<{
    cloneId: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { cloneId } = await params;

  const clone = await db.clone.findUnique({
    where: { id: cloneId },
  });

  if (!clone) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[12%] top-[18rem] h-[18rem] w-[18rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[8%] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-1/2 top-[-10rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="grid min-h-screen lg:grid-cols-[320px_1fr]">
        <aside className="border-r border-white/10 bg-white/[0.03]">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 p-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Link>

              <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/40 p-4">
                <div className="h-48 rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]" />

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-semibold">{clone.name}</div>
                    <div className="mt-1 text-sm text-white/45">
                      {clone.category || "Sans catégorie"}
                    </div>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                    {clone.status}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {clone.shortDescription ||
                    "Ce clone est prêt à recevoir une vraie interface de conversation liée à ton IA."}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(clone.traits.length > 0
                    ? clone.traits
                    : ["Premium", "Privé", "Brouillon"]
                  ).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Infos du clone</div>
                    <div className="text-sm text-white/45">
                      Données réelles depuis la base
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-white/65">
                  <div>Visibilité : {clone.visibility}</div>
                  <div>Style : {clone.responseStyle || "Non défini"}</div>
                  <div>Objectif : {clone.primaryGoal || "Non défini"}</div>
                  <div>Tonalité : {clone.tone || "Non définie"}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex min-h-screen flex-col">
          <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Crown className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-lg font-semibold">{clone.name}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-white/45">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    Espace de test du clone
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-full border border-white/10 bg-white/5 p-3 text-white/70 transition hover:bg-white/10 hover:text-white">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="rounded-full border border-white/10 bg-white/5 p-3 text-white/70 transition hover:bg-white/10 hover:text-white">
                  <Settings2 className="h-4 w-4" />
                </button>
                <button className="rounded-full border border-white/10 bg-white/5 p-3 text-white/70 transition hover:bg-white/10 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8">
            <div className="mb-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Chat réel à brancher ensuite</div>
                  <p className="mt-2 text-sm leading-7 text-white/55">
                    Cette page est maintenant reliée au vrai clone en base.
                    L’étape suivante sera de connecter ici les conversations réelles
                    avec ton modèle IA et de sauvegarder les messages.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold">
                  Le clone est bien chargé
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/60">
                  Tu es sur une vraie page liée au clone <strong>{clone.name}</strong>.
                  Le design est prêt. Il reste maintenant à brancher le moteur de chat,
                  la sauvegarde des messages et les réponses IA.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-end gap-3">
                <div className="flex flex-1 items-end gap-3 rounded-[1.5rem] border border-white/10 bg-black px-4 py-4">
                  <textarea
                    rows={1}
                    placeholder="Écris ton message ici..."
                    className="max-h-40 min-h-[28px] flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />

                  <button className="rounded-full p-2 text-white/45 transition hover:bg-white/5 hover:text-white">
                    <Mic className="h-5 w-5" />
                  </button>

                  <button className="rounded-full p-2 text-white/45 transition hover:bg-white/5 hover:text-white">
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>

                <button className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition hover:scale-[1.02]">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}