import {
  MessageCircle,
  Bot,
  BarChart3,
  Plug,
  Lock,
  Rocket,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    color: "teal",
    category: "Conversation",
    icon: MessageCircle,
    title: "Chat intelligent multi-contexte",
    description:
      "Votre assistant mémorise chaque échange, comprend le contexte métier et s'adapte au ton de votre entreprise. Intégré à votre CRM et vos outils.",
    items: [
      "Mémoire longue durée",
      "Contexte multi-sessions",
      "Ton personnalisable",
      "Support 12 langues",
    ],
  },
  {
    color: "violet",
    category: "Agents",
    icon: Bot,
    title: "Agents autonomes spécialisés",
    description:
      "Déployez des agents dédiés par département — comptabilité, RH, support client, commercial. Chacun entraîné sur vos données et processus.",
    items: [
      "Agent facturation",
      "Agent RH & recrutement",
      "Agent support client",
      "Workflows LangChain",
    ],
  },
  {
    color: "orange",
    category: "Analyses",
    icon: BarChart3,
    title: "Rapports & insights automatiques",
    description:
      "Connectez vos sources de données. L'IA génère des rapports hebdomadaires, détecte des anomalies et vous alerte avant que les problèmes émergent.",
    items: ["RAG sur vos données", "Alertes proactives", "Export PDF/Excel"],
  },
  {
    color: "teal",
    category: "Intégrations",
    icon: Plug,
    title: "Connexion à votre stack existante",
    description:
      "API REST + webhooks. Connectez-vous à Salesforce, HubSpot, Notion, Slack, Google Workspace et +80 autres outils sans ligne de code.",
    items: [
      "API FastAPI native",
      "Webhooks temps-réel",
      "OAuth2 sécurisé",
      "+80 connecteurs",
    ],
  },
  {
    color: "green",
    category: "Sécurité",
    icon: Lock,
    title: "Données hébergées en France",
    description:
      "Hébergement souverain OVH Cloud. Vos données ne quittent jamais le territoire français. Certifié RGPD, ISO 27001. Chiffrement AES-256.",
    items: [
      "Hébergement Paris/Lyon",
      "RGPD natif",
      "ISO 27001",
      "Audit trail complet",
    ],
  },
  {
    color: "red",
    category: "Déploiement",
    icon: Rocket,
    title: "En production en 48h chrono",
    description:
      "Notre équipe configure, intègre et forme vos équipes. Migration assistée depuis votre système actuel. Support dédié les 30 premiers jours.",
    items: [
      "Onboarding guidé",
      "Migration assistée",
      "Formation équipes",
      "Support 30j dédié",
    ],
  },
];

/**
 * FeaturesSection
 * Section complète "Tout ce dont votre PME a besoin" avec les 6 FeatureCard
 * (2 rangées de 3 sur desktop).
 * La liste FEATURES est définie ici — passer `features` en prop si elle
 * doit devenir dynamique (CMS, i18n...).
 */
export default function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
          Fonctionnalités
        </p>
        <h2 className="mt-4 text-4xl font-extrabold text-white">
          Tout ce dont votre PME a besoin
        </h2>
        <p className="mt-4 text-slate-400">
          Une plateforme complète, pas un chatbot. Des agents métier qui
          travaillent pour vous.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
