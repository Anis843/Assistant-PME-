import { Settings } from "lucide-react";

/**
 * AgentCard
 * Carte de gestion d'un agent IA.
 *
 * Props:
 * - name: string
 * - category: string        -> ex: "Commercial", "RH", "Comptabilité"
 * - color: 'teal' | 'violet' | 'orange'
 * - description: string
 * - requestsHandled: number
 * - active: boolean
 * - onToggleActive: () => void
 * - onConfigure: () => void
 */
const colorMap = {
  teal: { dot: "bg-teal-400", ring: "border-teal-400/30" },
  violet: { dot: "bg-violet-400", ring: "border-violet-400/30" },
  orange: { dot: "bg-orange-400", ring: "border-orange-400/30" },
};

export default function AgentCard({
  name,
  category,
  color = "teal",
  description,
  requestsHandled,
  active = true,
  onToggleActive,
  onConfigure,
}) {
  const c = colorMap[color];

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${active ? c.dot : "bg-slate-600"}`}
          />
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {category}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleActive}
          className={`relative h-5 w-9 shrink-0 rounded-full border-0 p-0 transition-colors ${
            active ? "bg-teal-400" : "bg-slate-700"
          }`}
          aria-label={active ? "Désactiver l'agent" : "Activer l'agent"}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
              active ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-400">{description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-xs text-slate-500">
          <span className="font-semibold text-slate-300">
            {requestsHandled}
          </span>{" "}
          requêtes traitées
        </span>
        <button
          type="button"
          onClick={onConfigure}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <Settings className="h-3.5 w-3.5" />
          Configurer
        </button>
      </div>
    </div>
  );
}
