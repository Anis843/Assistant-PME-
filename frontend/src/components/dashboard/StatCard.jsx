/**
 * StatCard
 * Une carte affichant un indicateur clé (ex: "Requêtes aujourd'hui").
 *
 * Props:
 * - label: string             -> label en majuscules au-dessus (ex: "AGENTS ACTIFS")
 * - value: string | number    -> valeur principale, affichée en grand
 * - delta: string             -> variation affichée à côté (ex: "+12%", "+2")
 * - deltaColor: 'teal' | 'violet' | 'orange'  -> couleur du delta
 * - suffix: string            -> texte optionnel après la valeur (ex: "/semaine")
 */
const deltaColorMap = {
  teal: "text-teal-400",
  violet: "text-violet-400",
  orange: "text-orange-400",
};

export default function StatCard({ label, value, delta, deltaColor = "teal", suffix }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {suffix && <span className="text-sm text-slate-400">{suffix}</span>}
        {delta && (
          <span className={`text-sm font-medium ${deltaColorMap[deltaColor]}`}>
            {delta}
          </span>
        )}
      </p>
    </div>
  );
}
