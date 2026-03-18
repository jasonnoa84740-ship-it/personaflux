import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, Sparkles } from "lucide-react";

const examples = [
  {
    title: "Clone créateur premium",
    category: "Créateur / audience",
    description:
      "Une expérience pensée pour donner une présence digitale forte et monétisable.",
  },
  {
    title: "Clone coach branding",
    category: "Coaching / expertise",
    description:
      "Un clone plus stratégique, orienté clarté, image et transformation client.",
  },
  {
    title: "Clone business / agence",
    category: "Vente / acquisition",
    description:
      "Un clone conçu pour capter des leads et vendre avec plus de crédibilité.",
  },
];

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>

          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black"
          >
            Créer mon clone
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
            <Sparkles className="h-4 w-4" />
            Exemples
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Explore des cas d’usage crédibles
          </h1>

          <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
            Utilise ces exemples pour structurer ton propre clone comme un vrai produit premium.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {examples.map((example) => (
            <div
              key={example.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="h-56 rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]" />
              <div className="mt-6 text-sm text-white/45">{example.category}</div>
              <h2 className="mt-2 text-2xl font-semibold">{example.title}</h2>
              <p className="mt-4 text-base leading-8 text-white/60">
                {example.description}
              </p>

              <div className="mt-6 flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
                  <Eye className="h-4 w-4" />
                  Voir
                </button>
                <Link
                  href="/create"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75"
                >
                  S’inspirer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}