import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "Pour lancer un premier clone propre.",
    features: [
      "1 clone IA",
      "Personnalité basique",
      "Page de chat privée",
      "Jusqu’à 1 000 messages / mois",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "Pour un vrai produit premium monétisable.",
    features: [
      "3 clones IA",
      "Contrôles avancés",
      "Accès par abonnement",
      "Pages premium",
      "Jusqu’à 20 000 messages / mois",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "$149",
    description: "Pour agences, équipes et marques.",
    features: [
      "Clones illimités",
      "Branding personnalisé",
      "Dashboard avancé",
      "Support dédié",
    ],
    featured: false,
  },
];

export default function PricingPage() {
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
            Tarifs
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Des offres pensées pour un vrai produit
          </h1>

          <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
            Choisis l’offre qui correspond à ton niveau actuel : lancement,
            monétisation ou scale.
          </p>
        </div>

        <div className="mt-16 grid gap-6 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[2rem] border p-8 ${
                plan.featured
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/[0.03] text-white"
              }`}
            >
              <div className="text-sm opacity-70">{plan.name}</div>
              <div className="mt-3 text-4xl font-semibold">{plan.price}</div>
              <p className="mt-5 text-sm leading-7 opacity-75">{plan.description}</p>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/create"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-medium ${
                  plan.featured
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Choisir
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}