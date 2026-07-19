/**
 * FeatureCard
 * Une carte de la section "Fonctionnalités" (barre colorée en haut,
 * catégorie, icône, titre, description, liste à puces).
 *
 * Props:
 * - color: 'teal' | 'violet' | 'orange'
 * - category: string           -> label au-dessus du titre (ex: "CONVERSATION")
 * - icon: composant lucide-react
 * - title: string
 * - description: string
 * - items: string[]            -> liste à puces
 */
/**
 * FeatureCard
 * Une carte de la section "Fonctionnalités" (barre colorée en haut,
 * catégorie, icône, titre, description, liste à puces).
 *
 * Props:
 * - color: 'teal' | 'violet' | 'orange' | 'green' | 'red'
 * - category: string           -> label au-dessus du titre (ex: "CONVERSATION")
 * - icon: composant lucide-react
 * - title: string
 * - description: string
 * - items: string[]            -> liste à puces
 */
const colorMap = {
  teal: { bar: "bg-teal-400", text: "text-teal-400", dot: "bg-teal-400" },
  violet: {
    bar: "bg-violet-400",
    text: "text-violet-400",
    dot: "bg-violet-400",
  },
  orange: {
    bar: "bg-orange-400",
    text: "text-orange-400",
    dot: "bg-orange-400",
  },
  green: {
    bar: "bg-emerald-400",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  red: { bar: "bg-rose-400", text: "text-rose-400", dot: "bg-rose-400" },
};

export default function FeatureCard({
  color = "teal",
  category,
  icon: Icon,
  title,
  description,
  items = [],
}) {
  const c = colorMap[color];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
      <div className={`h-1 ${c.bar}`} />

      <div className="p-6">
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}
        >
          {category}
        </p>

        {Icon && (
          <Icon className="mt-4 h-6 w-6 text-white" aria-hidden="true" />
        )}

        <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>

        <ul className="mt-5 flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
