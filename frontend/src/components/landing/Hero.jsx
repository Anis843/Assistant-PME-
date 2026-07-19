import { Play } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

/**
 * Hero
 * Section d'accroche en haut de la landing page.
 *
 * Props:
 * - onPrimaryClick: callback pour "Commencer gratuitement"
 * - onDemoClick: callback pour "Voir la démo"
 */
export default function Hero({ onPrimaryClick, onDemoClick }) {
  return (
    <section className="flex flex-col items-center px-6 py-24 text-center">
      <Badge variant="pill" color="teal" className="mb-8">
        IA multi-agents pour PME
      </Badge>

      <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
        Votre assistant IA{" "}
        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
          qui comprend votre business
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-400">
        Automatisez vos opérations, analysez vos données et pilotez votre
        équipe avec une IA entraînée sur vos processus métier. Déployé en 48h.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button variant="primary" onClick={onPrimaryClick}>
          Commencer gratuitement →
        </Button>
        <Button variant="outline" icon={Play} onClick={onDemoClick}>
          Voir la démo (2 min)
        </Button>
      </div>
    </section>
  );
}
