/**
 * PricingCard
 * Une carte de plan tarifaire.
 *
 * Props:
 * - category: string             -> ex: "STARTER", "BUSINESS", "ENTREPRISE"
 * - categoryColor: 'slate' | 'teal' | 'violet'
 * - price: string | null         -> ex: "149€" (null pour "Sur devis")
 * - priceSuffix: string          -> ex: "/mois"
 * - customPriceLabel: string     -> affiché à la place de `price` si price est null (ex: "Sur devis")
 * - description: string
 * - ctaLabel: string
 * - ctaVariant: 'solid' | 'outline'
 * - highlighted: boolean         -> true pour le plan mis en avant (ex: Business)
 * - badge: string                -> ex: "POPULAIRE" (optionnel)
 * - features: string[]
 */
const categoryColorMap = {
  slate: "text-slate-400",
  teal: "text-teal-400",
  violet: "text-violet-400",
};

const dotColorMap = {
  slate: "border-slate-500",
  teal: "border-teal-400 bg-teal-400",
  violet: "border-violet-400 bg-violet-400",
};

export default function PricingCard({
  category,
  categoryColor = "slate",
  price,
  priceSuffix = "/mois",
  customPriceLabel,
  description,
  ctaLabel,
  ctaVariant = "outline",
  highlighted = false,
  badge,
  features = [],
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        highlighted
          ? "border-teal-400/40 bg-teal-400/5"
          : "border-slate-800 bg-slate-900/40"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-400 px-3 py-1 text-xs font-semibold text-slate-950">
          {badge}
        </span>
      )}

      <p className={`text-xs font-semibold uppercase tracking-wide ${categoryColorMap[categoryColor]}`}>
        {category}
      </p>

      <div className="mt-3 flex items-baseline gap-1">
        {price ? (
          <>
            <span className="text-4xl font-extrabold text-white">{price}</span>
            <span className="text-sm text-slate-400">{priceSuffix}</span>
          </>
        ) : (
          <span className="text-4xl font-extrabold text-white">{customPriceLabel}</span>
        )}
      </div>

      <p className="mt-3 text-sm text-slate-400">{description}</p>

      <button
        type="button"
        className={`mt-6 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
          ctaVariant === "solid"
            ? "bg-teal-400 text-slate-950 hover:bg-teal-300"
            : "border border-slate-700 text-white hover:bg-white/5"
        }`}
      >
        {ctaLabel}
      </button>

      <ul className="mt-6 flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
            <span
              className={`h-3 w-3 shrink-0 rounded-full border-2 ${dotColorMap[categoryColor]}`}
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
