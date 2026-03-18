"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "Pour lancer ton premier clone proprement.",
    featured: false,
    planKey: "starter",
    cta: "Commencer avec Starter",
    features: [
      "1 clone IA",
      "Page de chat privée",
      "Personnalité basique",
      "1 000 messages / mois",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    description: "Pour un vrai produit premium monétisable.",
    featured: true,
    planKey: "pro",
    cta: "Passer sur Pro",
    features: [
      "3 clones IA",
      "Contrôles avancés",
      "Accès premium",
      "20 000 messages / mois",
      "Pages premium",
    ],
  },
  {
    name: "Scale",
    price: "$149",
    description: "Pour agences, équipes et marques.",
    featured: false,
    planKey: "scale",
    cta: "Parler aux ventes",
    features: [
      "Clones illimités",
      "Branding personnalisé",
      "Dashboard avancé",
      "Support dédié",
    ],
  },
];

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleCheckout(plan: string) {
    try {
      setError("");
      setLoadingPlan(plan);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Impossible de démarrer le paiement.");
      }

      if (!data?.url) {
        throw new Error("Aucune URL Stripe retournée.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
            <Sparkles className="h-4 w-4" />
            Abonnements
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Passe à une offre premium
          </h1>

          <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
            Débloque plus de clones, plus de contrôle, plus de messages et une vraie logique de monétisation.
          </p>
        </div>

        {error && (
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-16 grid gap-6 xl:grid-cols-3">
          {plans.map((plan) => {
            const isLoading = loadingPlan === plan.planKey;

            return (
              <div
                key={plan.name}
                className={`rounded-[2rem] border p-8 ${
                  plan.featured
                    ? "border-white bg-white text-black shadow-[0_0_80px_rgba(255,255,255,0.12)]"
                    : "border-white/10 bg-white/[0.03] text-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className={`text-sm ${
                        plan.featured ? "text-black/60" : "text-white/45"
                      }`}
                    >
                      {plan.name}
                    </div>
                    <div className="mt-2 text-4xl font-semibold">{plan.price}</div>
                    <div
                      className={`mt-1 text-sm ${
                        plan.featured ? "text-black/65" : "text-white/55"
                      }`}
                    >
                      par mois
                    </div>
                  </div>

                  {plan.featured && (
                    <div className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                      Le plus populaire
                    </div>
                  )}
                </div>

                <p
                  className={`mt-5 text-base leading-7 ${
                    plan.featured ? "text-black/70" : "text-white/60"
                  }`}
                >
                  {plan.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleCheckout(plan.planKey)}
                  disabled={isLoading}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium transition ${
                    plan.featured
                      ? "bg-black text-white hover:opacity-90"
                      : "border border-white/10 bg-white text-black hover:scale-[1.01]"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <Crown className="h-4 w-4" />
                  {isLoading ? "Redirection..." : plan.cta}
                </button>

                <div className="mt-8 space-y-4">
                  {plan.features.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          plan.featured ? "bg-black/10" : "bg-white/10"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      <span
                        className={`text-sm ${
                          plan.featured ? "text-black/75" : "text-white/70"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}