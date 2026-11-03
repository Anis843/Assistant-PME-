import { Info } from "lucide-react";

/**
 * DemoNotice
 * Bandeau signalant qu'une page affiche des données d'illustration.
 *
 * Quatre pages de l'app (Dashboard, Analyses, Agents, Intégrations) sont des
 * maquettes alimentées par des tableaux en dur, et les réglages ne sont pas
 * encore persistés. Sans ce bandeau, un prospect qui parcourt la navigation
 * après une démonstration de chat réussie lit « 1 847 requêtes aujourd'hui »
 * comme un chiffre réel : la découverte ultérieure coûte plus cher que l'aveu
 * immédiat. Le dire franchement transforme une fausse promesse en feuille de
 * route.
 *
 * Props:
 * - children: le texte du bandeau (ce qui est fictif, et ce qui est réel)
 */
export default function DemoNotice({ children }) {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
