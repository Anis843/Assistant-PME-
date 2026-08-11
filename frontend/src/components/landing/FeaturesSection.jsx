import { FileSearch, Quote, ShieldCheck } from "lucide-react";
import FeatureCard from "./FeatureCard";

// Chaque élément listé ici doit être démontrable en direct dans l'application.
// Une promesse invérifiable coûte plus cher qu'une fonctionnalité manquante :
// le prospect qui découvre l'écart cesse de croire tout le reste.
const FEATURES = [
  {
    color: "teal",
    category: "Recherche",
    icon: FileSearch,
    title: "Trouve l'information, pas seulement le mot",
    description:
      "La recherche porte sur le sens. Posez votre question avec vos mots : NexIA retrouve le passage pertinent même s'il est formulé autrement dans le document.",
    items: [
      "Recherche vectorielle",
      "Modèle adapté au français",
      "Découpage automatique des PDF",
    ],
  },
  {
    color: "violet",
    category: "Fiabilité",
    icon: Quote,
    title: "Chaque réponse cite son document",
    description:
      "NexIA répond uniquement à partir de vos documents et affiche celui dont provient l'information. Quand la réponse ne s'y trouve pas, il le dit au lieu d'inventer.",
    items: [
      "Document source affiché",
      "Aucune source citée si l'information est absente",
      "Réponses en français",
    ],
  },
  {
    color: "green",
    category: "Confidentialité",
    icon: ShieldCheck,
    title: "Vos documents peuvent rester chez vous",
    description:
      "Le moteur d'IA se change par une simple variable de configuration. En mode local, aucun de vos documents ne sort de votre infrastructure.",
    items: [
      "Mode local disponible",
      "Ou service hébergé, au choix",
      "Aucune dépendance à un fournisseur unique",
    ],
  },
];

/**
 * FeaturesSection
 * Les trois capacités réelles du produit, chacune vérifiable dans la démo.
 */
export default function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
          Fonctionnalités
        </p>
        <h2 className="mt-4 text-4xl font-extrabold text-white">
          Ce que NexIA fait, exactement
        </h2>
        <p className="mt-4 text-slate-400">
          Importez vos PDF, posez vos questions, obtenez des réponses sourcées.
          Rien de plus, rien de moins.
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
