import Link from "next/link";
import { ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
              <Sparkles className="h-4 w-4" />
              Connexion
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Connecte-toi à ton espace
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Accède à ton dashboard, gère tes clones IA, tes conversations et ton abonnement.
            </p>

            <form className="mt-10 space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-white/80">
                  Adresse e-mail
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 py-4">
                  <Mail className="h-5 w-5 text-white/35" />
                  <input
                    type="email"
                    placeholder="ton@email.com"
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-white/80">
                  Mot de passe
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 py-4">
                  <Lock className="h-5 w-5 text-white/35" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.01]"
              >
                Se connecter
              </button>

              <div className="text-center text-sm text-white/45">
                Auth réelle à brancher ensuite avec Clerk ou Auth.js.
              </div>
            </form>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="text-sm text-white/45">Pourquoi te connecter ?</div>
            <h2 className="mt-2 text-2xl font-semibold">Retrouve toute ton activité</h2>

            <div className="mt-8 space-y-4">
              {[
                "Gérer tes clones en temps réel",
                "Modifier ton positionnement et ta personnalité",
                "Accéder au dashboard premium",
                "Préparer l’abonnement et la monétisation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/billing"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
            >
              Voir les offres premium
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}