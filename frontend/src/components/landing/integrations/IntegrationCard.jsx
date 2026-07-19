/**
 * IntegrationCard
 * Une carte représentant un outil/connecteur intégré (icône colorée + nom + catégorie).
 *
 * Props:
 * - name: string          -> nom de l'outil (ex: "Salesforce")
 * - category: string      -> catégorie affichée en dessous (ex: "CRM")
 * - icon: composant lucide-react
 * - iconBg: string        -> classe tailwind pour le fond de l'icône (ex: "bg-sky-500")
 */
export default function IntegrationCard({
  name,
  category,
  icon: Icon,
  iconBg = "bg-slate-700",
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-8 text-center hover:bg-gray-900 hover:cursor-pointer">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg}`}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-slate-500">{category}</p>
      </div>
    </div>
  );
}
