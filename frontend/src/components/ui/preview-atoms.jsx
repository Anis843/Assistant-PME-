import { Play } from "lucide-react";

function Button({
  variant = "primary",
  icon: Icon,
  className = "",
  children,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-150";
  const variants = {
    primary: "bg-teal-400 text-slate-950 hover:bg-teal-300",
    outline:
      "border border-slate-600 text-white hover:border-slate-400 hover:bg-white/5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

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

function Badge({
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
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />}
      {children}
    </span>
  );
}

export default function Preview() {
  return (
    <div className="min-h-75 bg-slate-950 p-10 flex flex-col gap-8 items-start">
      <div className="flex gap-3 flex-wrap">
        <Button variant="primary">Commencer gratuitement →</Button>
        <Button variant="outline" icon={Play}>
          Voir la démo (2 min)
        </Button>
      </div>
      <div className="flex gap-3 flex-wrap items-center">
        <Badge variant="pill" color="teal">
          IA multi-agents pour PME
        </Badge>
        <Badge variant="label" color="violet">
          BETA
        </Badge>
        <Badge variant="pill" color="orange" dot={false}>
          Économies estimées
        </Badge>
      </div>
    </div>
  );
}
