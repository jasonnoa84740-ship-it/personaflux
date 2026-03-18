import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  Check,
  ChevronRight,
  Crown,
  Lock,
  MessageSquare,
  Play,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  UserCircle2,
  Wallet,
  Zap,
} from "lucide-react";

const stats = [
  { label: "Clones IA créés", value: "12k+" },
  { label: "Conversations générées", value: "1.8M+" },
  { label: "Rétention moyenne", value: "82%" },
  { label: "Revenus créateurs", value: "$94k+" },
];

const logos = [
  "CRÉATEURS",
  "COACHS",
  "FONDATEURS",
  "AGENCES",
  "MARQUES PERSONNELLES",
  "COMMUNAUTÉS",
];

const features = [
  {
    icon: UserCircle2,
    title: "Une identité visuelle qui paraît réelle",
    description:
      "Crée une version digitale premium de toi avec une photo, un nom, un ton, un positionnement et une identité publique que les gens comprennent immédiatement.",
  },
  {
    icon: Brain,
    title: "Personnalité profondément personnalisable",
    description:
      "Contrôle la façon dont ton clone parle, réagit, explique, vend, rassure, plaisante, enseigne ou guide selon ton style et tes règles de communication.",
  },
  {
    icon: MessageSquare,
    title: "Une expérience de chat pensée pour la rétention",
    description:
      "Offre des conversations plus propres, plus personnelles et plus premium qu’un bot classique grâce à une belle UI, des prompts structurés et des parcours pensés pour convertir.",
  },
  {
    icon: Crown,
    title: "Un produit prêt pour l’abonnement",
    description:
      "Bloque l’accès derrière des offres premium, des espaces réservés aux membres ou des expériences privées conçues pour transformer ton clone en vrai produit monétisable.",
  },
  {
    icon: Shield,
    title: "Accès privé et contrôle total",
    description:
      "Choisis qui peut accéder à ton clone, ce qui est public, quels comportements sont autorisés et comment ton audience interagit avec ton identité.",
  },
  {
    icon: TrendingUp,
    title: "Pensé pour le business, pas juste pour une démo",
    description:
      "Des landing pages jusqu’aux sections pricing prêtes pour le paiement, toute l’expérience est conçue pour être crédible aux yeux de vrais utilisateurs et de vrais abonnés.",
  },
];

const steps = [
  {
    number: "01",
    title: "Crée ton identité",
    text: "Ajoute un visage, définis un nom, choisis un ton et pose les fondations de la personnalité de ton clone.",
  },
  {
    number: "02",
    title: "Définis son comportement",
    text: "Choisis comment ton clone parle, gère les questions, réagit émotionnellement et représente ta marque ou ton persona.",
  },
  {
    number: "03",
    title: "Lance et monétise",
    text: "Publie ton clone, partage un lien d’accès privé, ajoute des abonnements et transforme ton IA en un véritable produit.",
  },
];

const useCases = [
  "Expériences premium pour créateurs",
  "Compagnons IA privés",
  "Clones de coachs ou mentors",
  "Avatars de vente et génération de leads",
  "Pages premium de marque personnelle",
  "Assistants digitaux réservés aux membres",
];

const pricing = [
  {
    name: "Starter",
    price: "$19",
    description: "Pour tester le produit et lancer un clone propre et soigné.",
    cta: "Voir Starter",
    featured: false,
    href: "/billing",
    features: [
      "1 clone IA",
      "Éditeur de personnalité basique",
      "Page de chat privée",
      "Jusqu’à 1 000 messages / mois",
      "Analytiques de base",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    description: "Pour les créateurs et fondateurs prêts à monétiser un clone premium.",
    cta: "Passer sur Pro",
    featured: true,
    href: "/billing",
    features: [
      "3 clones IA",
      "Contrôles avancés de personnalité",
      "Pages visuelles premium",
      "Accès par abonnement",
      "Jusqu’à 20 000 messages / mois",
      "Support prioritaire",
    ],
  },
  {
    name: "Scale",
    price: "$149",
    description: "Pour les équipes, agences et marques qui lancent plusieurs expériences.",
    cta: "Voir Scale",
    featured: false,
    href: "/billing",
    features: [
      "Clones illimités",
      "Accès équipe",
      "Dashboard admin avancé",
      "Branding personnalisé",
      "Volume élevé de messages",
      "Onboarding dédié",
    ],
  },
];

const faqs = [
  {
    question: "Qu’est-ce qu’un clone IA visuel ?",
    answer:
      "Un clone IA visuel est une version digitale et brandée d’une personne, avec un visage, un nom, une personnalité et une expérience de conversation en direct avec laquelle les utilisateurs peuvent interagir en ligne.",
  },
  {
    question: "Puis-je rendre l’accès privé ou payant ?",
    answer:
      "Oui. Le produit est pensé pour prendre en charge des accès réservés aux membres, des expériences premium et des modèles de monétisation par abonnement.",
  },
  {
    question: "Puis-je personnaliser la manière dont le clone parle ?",
    answer:
      "Oui. Tu peux définir le ton, le style, l’attitude, l’expertise, les limites, la structure des réponses et l’énergie générale de ton clone.",
  },
  {
    question: "Est-ce seulement pour les créateurs ?",
    answer:
      "Non. Cela convient aussi aux coachs, consultants, agences, fondateurs, communautés et marques personnelles premium qui veulent créer un produit d’identité digitale.",
  },
];

function SectionTitle({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
        {badge}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-white/60 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-[10%] top-[28rem] h-[22rem] w-[22rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[8%] top-[16rem] h-[20rem] w-[20rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">PersonaFlux</div>
              <div className="text-xs text-white/45">Plateforme de clone IA visuel</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="#product" className="transition hover:text-white">
              Produit
            </Link>
            <Link href="#features" className="transition hover:text-white">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="transition hover:text-white">
              Tarifs
            </Link>
            <Link href="#faq" className="transition hover:text-white">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              Connexion
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              Commencer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 shadow-[0_0_30px_rgba(255,255,255,0.04)]">
              <Zap className="h-4 w-4" />
              Plateforme premium de clones IA pour créateurs, marques et fondateurs
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Transforme ton visage, ta voix et ta personnalité en produit IA premium.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
              Crée un clone IA visuel qui paraît personnel, qui a l’air premium et qui est prêt pour de vrais utilisateurs, de vraies conversations et de vrais abonnements.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                Créer ton clone
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/examples"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Voir la démo
                <Play className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-white/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_80px_rgba(255,255,255,0.06)] backdrop-blur-xl">
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/70 p-4">
                  <div className="h-64 rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]" />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold">Alex</div>
                      <div className="mt-1 text-sm text-white/50">Clone visuel premium</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      en ligne
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/60">
                    Stratégique, chaleureux, direct, persuasif et très créatif. Conçu pour des conversations premium et un accès réservé aux membres.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Image", "Voix", "Personnalité", "Accès payant"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/80 p-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Clone Alex</div>
                        <div className="text-sm text-white/45">Répond instantanément</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                      <div className="h-2 w-2 rounded-full bg-emerald-300" />
                      En ligne
                    </div>
                  </div>

                  <div className="space-y-4 py-5">
                    <div className="max-w-[85%] rounded-3xl rounded-tl-md bg-white/10 px-4 py-3 text-sm leading-7 text-white/90">
                      Salut, moi c’est Alex. Je peux expliquer l’offre, présenter la marque et guider les visiteurs vers un abonnement premium.
                    </div>
                    <div className="ml-auto max-w-[80%] rounded-3xl rounded-br-md border border-white/10 bg-white px-4 py-3 text-sm leading-7 text-black">
                      Qu’est-ce qui rend ça différent d’un chatbot normal ?
                    </div>
                    <div className="max-w-[88%] rounded-3xl rounded-tl-md bg-white/10 px-4 py-3 text-sm leading-7 text-white/90">
                      Cela ressemble davantage à un produit d’identité digitale qu’à un simple bot utilitaire. Tu définis le visage, le ton, le positionnement, le niveau d’accès et le modèle de monétisation.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {["Onboarding créateur", "Accès premium", "Capture de leads"].map(
                        (chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                          >
                            {chip}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 rounded-full border border-white/10 bg-black px-4 py-3 text-sm text-white/40">
                        Demande quelque chose à ton clone...
                      </div>
                      <button className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
                        Envoyer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm tracking-[0.25em] text-white/35 sm:text-base">
          {logos.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </section>

      <section id="product" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            badge="Fonctionnement"
            title="Du profil initial à l’expérience IA payante"
            description="Un workflow simple pour construire un clone soigné que les gens peuvent réellement utiliser, apprécier et rejoindre via abonnement."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_50px_rgba(255,255,255,0.03)]"
              >
                <div className="text-sm font-medium tracking-[0.25em] text-white/40">
                  {step.number}
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-white/60">{step.text}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/70">
                  En savoir plus
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            badge="Fonctionnalités"
            title="Tout ce qu’il faut pour une sensation premium"
            description="Pas juste une interface de chatbot. Une vraie direction produit pour l’identité, la rétention, le contrôle d’accès et la monétisation."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:bg-white/[0.05]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-base leading-7 text-white/60">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
              <Star className="h-4 w-4" />
              Conçu pour des usages à forte valeur
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Plus qu’un clone. Cela peut devenir une vraie gamme de produits.
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Positionne ton IA comme un coach, un ambassadeur de marque, un compagnon premium, une expérience créateur privée ou une couche de parcours client monétisée.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {useCases.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm text-white/80"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                    <Check className="h-4 w-4" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/45">Aperçu du dashboard de revenus</div>
                <div className="mt-1 text-2xl font-semibold">Couche de monétisation</div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                Aperçu
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Revenu mensuel récurrent</div>
                      <div className="text-sm text-white/45">Abonnements et accès privés</div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold">$12,480</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                  <div className="text-sm text-white/45">Taux de conversion</div>
                  <div className="mt-2 text-3xl font-semibold">8.4%</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                  <div className="text-sm text-white/45">Membres payants</div>
                  <div className="mt-2 text-3xl font-semibold">1,294</div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                <div className="mb-4 flex items-center justify-between text-sm text-white/45">
                  <span>Croissance de l’engagement</span>
                  <span>30 derniers jours</span>
                </div>
                <div className="flex h-36 items-end gap-3">
                  {[28, 45, 34, 60, 56, 74, 88, 70].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-2xl bg-white/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            badge="Tarifs"
            title="Des offres pensées pour lancer, grandir et monétiser"
            description="Commence simplement, peaufine l’expérience, puis transforme-la en produit par abonnement avec plus d’accès, plus de clones et plus de contrôle."
          />

          <div className="mt-16 grid gap-6 xl:grid-cols-3">
            {pricing.map((plan) => (
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

                <Link
                  href={plan.href}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-medium transition ${
                    plan.featured
                      ? "bg-black text-white hover:opacity-90"
                      : "border border-white/10 bg-white text-black hover:scale-[1.01]"
                  }`}
                >
                  {plan.cta}
                </Link>

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
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
                <Lock className="h-4 w-4" />
                Accès, contrôle et confiance
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Donne-lui une apparence assez crédible pour que les gens paient.
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                Un produit IA payant a besoin de plus qu’un chat. Il a besoin d’un positionnement clair, de confiance, d’un design premium, d’un accès contrôlé et d’un parcours utilisateur qui semble vraiment terminé.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Landing pages premium",
                "Expériences réservées aux membres",
                "Onboarding propre",
                "Profil visuel du clone",
                "Structure prête pour le pricing",
                "UI pensée pour convertir",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-3xl border border-white/10 bg-black/40 px-5 py-5 text-sm text-white/75"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            badge="FAQ"
            title="Les questions que les gens se posent avant de s’abonner"
            description="Utilise cette section pour enlever les frictions, clarifier la promesse et répondre aux vrais doutes des futurs clients payants."
          />

          <div className="mt-16 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7"
              >
                <h3 className="text-lg font-medium text-white sm:text-xl">
                  {faq.question}
                </h3>
                <p className="mt-3 text-base leading-7 text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white text-black shadow-[0_0_90px_rgba(255,255,255,0.08)]">
          <div className="grid gap-8 px-8 py-12 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-black/60">
                Prêt à lancer
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Crée ton clone IA maintenant. Transforme-le ensuite en vrai produit.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
                Commence par l’identité, façonne l’expérience, puis transforme l’ensemble en plateforme premium prête pour l’abonnement.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white"
              >
                Commencer
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-medium text-black"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-base font-semibold">PersonaFlux</div>
            <div className="mt-1 text-sm text-white/45">
              Des clones IA visuels premium pour des produits digitaux modernes.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-white/55">
            <Link href="/pricing" className="transition hover:text-white">
              Tarifs
            </Link>
            <Link href="/examples" className="transition hover:text-white">
              Exemples
            </Link>
            <Link href="/create" className="transition hover:text-white">
              Créer
            </Link>
            <Link href="/dashboard" className="transition hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}