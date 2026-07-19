/**
 * Badge
 * Utilisé pour :
 * - variant "pill"  -> le badge "IA MULTI-AGENTS POUR PME" dans le Hero (avec point animé)
 * - variant "label" -> le petit tag "BETA" à côté du logo dans la Navbar
 *
 * Props:
 * - variant: 'pill' | 'label'
 * - color: 'teal' | 'violet' | 'orange'  -> couleur d'accent (dot, texte, bordure)
 * - dot: boolean -> afficher le point animé (par défaut true pour "pill")
 * - className: classes tailwind additionnelles
 */
const colorMap = {
  teal: {
    text: "text-teal-300",
    border: "border-teal-400/30",
    bg: "bg-teal-400/10",
    dot: "bg-teal-400",
  },
  violet: {
    text: "text-violet-300",
    border: "border-violet-400/30",
    bg: "bg-violet-400/10",
    dot: "bg-violet-400",
  },
  orange: {
    text: "text-orange-300",
    border: "border-orange-400/30",
    bg: "bg-orange-400/10",
    dot: "bg-orange-400",
  },
};

export default function Badge({
  variant = "pill",
  color = "teal",
  dot,
  className = "",
  children,
}) {
  const c = colorMap[color];
  const showDot = dot ?? variant === "pill";

  if (variant === "label") {
    return (
      <span
        className={`rounded-md border ${c.border} ${c.bg} px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${c.text} ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${c.border} ${c.bg} px-4 py-1.5 font-mono text-xs uppercase tracking-widest ${c.text} ${className}`}
    >
      {showDot && (
        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
