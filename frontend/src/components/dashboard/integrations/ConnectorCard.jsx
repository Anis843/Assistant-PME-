/**
 * ConnectorCard
 * Carte représentant un connecteur/outil externe, avec son statut de connexion.
 *
 * Props:
 * - name: string
 * - category: string
 * - icon: composant lucide-react
 * - iconBg: string          -> classe tailwind (ex: "bg-sky-500")
 * - connected: boolean
 * - onToggleConnect: () => void
 */
export default function ConnectorCard({
  name,
  category,
  icon: Icon,
  iconBg = "bg-slate-700",
  connected = false,
  onToggleConnect,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-slate-500">{category}</p>
      </div>

      <button
        type="button"
        onClick={onToggleConnect}
        className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
          connected
            ? "border border-slate-700 text-slate-300 hover:border-red-400/50 hover:text-red-400"
            : "bg-teal-400 text-slate-950 hover:bg-teal-300"
        }`}
      >
        {connected ? "Déconnecter" : "Connecter"}
      </button>
    </div>
  );
}
