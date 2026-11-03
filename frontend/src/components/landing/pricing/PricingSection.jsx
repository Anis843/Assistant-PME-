import { useState } from "react";
import PricingToggle from "./PricingToggle";
import PricingCard from "./PricingCard";

// Prix mensuel et annuel (annuel = -20%) définis en dur pour éviter les arrondis flottants
//
// `soon: true` marque une fonctionnalité vendue dans le plan mais pas encore
// livrée. Les agents spécialisés, les connecteurs, les workflows et le tableau
// de bord d'usage sont aujourd'hui des maquettes : les annoncer au même rang
// que le RAG, qui lui fonctionne, fait tenir la promesse jusqu'à la première
// connexion du client — et pas au-delà. Mieux vaut vendre une feuille de route
// assumée qu'un produit qu'on devra démentir en rendez-vous.
const PLANS = [
  {
    id: "starter",
    category: "Starter",
    categoryColor: "slate",
    monthlyPrice: "149€",
    annualPrice: "119€",
    description:
      "Parfait pour démarrer et tester le potentiel de l'IA dans votre PME.",
    ctaLabel: "Commencer",
    ctaVariant: "outline",
    features: [
      "Questions-réponses sourcées sur vos PDF",
      "Import et indexation illimités",
      "5 000 requêtes / mois",
      "Support email 5j/7",
      { label: "2 intégrations incluses", soon: true },
      { label: "Tableau de bord d'usage", soon: true },
    ],
  },
  {
    id: "business",
    category: "Business",
    categoryColor: "teal",
    monthlyPrice: "399€",
    annualPrice: "319€",
    description:
      "Pour les équipes qui veulent automatiser leurs opérations en profondeur.",
    ctaLabel: "Démarrer l'essai",
    ctaVariant: "solid",
    highlighted: true,
    badge: "POPULAIRE",
    features: [
      "Questions-réponses sourcées sur vos PDF",
      "50 000 requêtes / mois",
      "Support prioritaire 7j/7",
      "Formation équipe incluse",
      { label: "5 agents IA spécialisés", soon: true },
      { label: "Intégrations illimitées", soon: true },
      { label: "Workflows automatisés", soon: true },
    ],
  },
  {
    id: "entreprise",
    category: "Entreprise",
    categoryColor: "violet",
    customPriceLabel: "Sur devis",
    description:
      "Solutions sur-mesure pour grandes équipes avec besoins spécifiques.",
    ctaLabel: "Contacter les ventes",
    ctaVariant: "outline",
    features: [
      "LLM privé on-premise (Ollama) — vos documents ne sortent pas",
      "Requêtes illimitées",
      "Audit sécurité inclus",
      "Contrat cadre et facturation personnalisée",
      "CSM dédié",
      { label: "Agents illimités", soon: true },
      { label: "SLA 99,9 % garanti", soon: true },
    ],
  },
];

/**
 * PricingSection
 * Section "Prix transparents, ROI immédiat" avec toggle mensuel/annuel
 * et les 3 cartes de plan.
 */
export default function PricingSection() {
  const [period, setPeriod] = useState("monthly");

  return (
    <section id="tarifs" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold text-white">
          Prix transparents, ROI immédiat
        </h2>

        <div className="mt-8 flex justify-center">
          <PricingToggle value={period} onChange={setPeriod} />
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 pt-3 md:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            category={plan.category}
            categoryColor={plan.categoryColor}
            price={period === "monthly" ? plan.monthlyPrice : plan.annualPrice}
            customPriceLabel={plan.customPriceLabel}
            description={plan.description}
            ctaLabel={plan.ctaLabel}
            ctaVariant={plan.ctaVariant}
            highlighted={plan.highlighted}
            badge={plan.badge}
            features={plan.features}
          />
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-slate-500">
        Les fonctionnalités marquées « à venir » figurent à la feuille de route
        et ne sont pas encore disponibles. Elles sont priorisées selon les
        besoins des premiers clients.
      </p>
    </section>
  );
}
