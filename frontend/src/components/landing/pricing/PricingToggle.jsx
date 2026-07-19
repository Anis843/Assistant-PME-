/**
 * PricingToggle
 * Switch pill "Mensuel / Annuel" avec badge de réduction sur "Annuel".
 *
 * Props:
 * - value: 'monthly' | 'annual'
 * - onChange: (value: 'monthly' | 'annual') => void
 * - discountLabel: string   -> ex: "-20%"
 */
export default function PricingToggle({ value, onChange, discountLabel = "-20%" }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-slate-900 p-1">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
          value === "monthly" ? "bg-white text-slate-950" : "text-slate-400"
        }`}
      >
        Mensuel
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
          value === "annual" ? "bg-white text-slate-950" : "text-slate-400"
        }`}
      >
        Annuel
        <span className="rounded-md bg-teal-400/15 px-1.5 py-0.5 text-xs font-semibold text-teal-400">
          {discountLabel}
        </span>
      </button>
    </div>
  );
}
