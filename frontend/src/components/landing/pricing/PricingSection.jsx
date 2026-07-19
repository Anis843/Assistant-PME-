import { useState } from "react";
import PricingToggle from "./PricingToggle";
import PricingCard from "./PricingCard";

// Prix mensuel et annuel (annuel = -20%) définis en dur pour éviter les arrondis flottants
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
      "1 agent IA configuré",
      "5 000 requêtes / mois",
      "2 intégrations incluses",
      "Support email 5j/7",
      "Hébergement France",
      "Tableau de bord analytics",
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
      "5 agents IA spécialisés",
      "50 000 requêtes / mois",
      "Intégrations illimitées",
      "Support prioritaire 7j/7",
      "Hébergement France dédié",
      "RAG sur vos documents",
      "Workflows automatisés",
      "Formation équipe incluse",
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
      "Agents illimités",
      "Requêtes illimitées",
      "LLM privé on-premise",
      "SLA 99.9% garanti",
      "CSM dédié",
      "Audit sécurité inclus",
      "Contrat cadre",
      "Facturation personnalisée",
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
    </section>
  );
}
