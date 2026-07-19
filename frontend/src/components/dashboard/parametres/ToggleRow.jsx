/**
 * ToggleRow
 * Une ligne "label + description + switch" (ex: pour les notifications).
 *
 * Props:
 * - label: string
 * - description: string
 * - checked: boolean
 * - onChange: () => void
 */
export default function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-4 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-5 w-9 shrink-0 rounded-full border-0 p-0 transition-colors ${
          checked ? "bg-teal-400" : "bg-slate-700"
        }`}
        aria-label={label}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
