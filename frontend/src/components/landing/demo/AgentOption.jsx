/**
 * AgentOption
 * Ligne cliquable pour sélectionner un agent dans la démo interactive.
 *
 * Props:
 * - name: string           -> nom de l'agent (ex: "Agent Commercial")
 * - color: 'teal' | 'violet' | 'orange'
 * - active: boolean        -> true si c'est l'agent actuellement sélectionné
 * - onClick: () => void
 */
const dotColorMap = {
  teal: "bg-teal-400",
  violet: "bg-violet-400",
  orange: "bg-orange-400",
};

const activeBorderMap = {
  teal: "border-teal-400/50 bg-teal-400/5",
  violet: "border-violet-400/50 bg-violet-400/5",
  orange: "border-orange-400/50 bg-orange-400/5",
};

export default function AgentOption({ name, color = "teal", active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-5 py-4 text-left transition-colors ${
        active
          ? activeBorderMap[color]
          : "border-slate-800 hover:border-slate-700"
      }`}
    >
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColorMap[color]}`} />
      <span>
        <span className="block font-semibold text-white">{name}</span>
        <span className="block text-xs uppercase tracking-wide text-slate-500">
          {active ? "Sélectionné" : "Cliquer pour voir"}
        </span>
      </span>
    </button>
  );
}
