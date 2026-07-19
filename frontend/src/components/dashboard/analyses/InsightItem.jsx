import { AlertTriangle, TrendingUp, Info } from "lucide-react";

/**
 * InsightItem
 * Une ligne d'insight/alerte détectée automatiquement.
 *
 * Props:
 * - type: 'warning' | 'positive' | 'info'
 * - title: string
 * - description: string
 * - time: string
 */
const typeConfig = {
  warning: { icon: AlertTriangle, text: "text-orange-400", bg: "bg-orange-400/10" },
  positive: { icon: TrendingUp, text: "text-teal-400", bg: "bg-teal-400/10" },
  info: { icon: Info, text: "text-blue-400", bg: "bg-blue-400/10" },
};

export default function InsightItem({ type = "info", title, description, time }) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 border-b border-slate-800 px-4 py-4 last:border-b-0">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
        <Icon className={`h-4 w-4 ${config.text}`} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-white">{title}</p>
          <span className="shrink-0 text-xs text-slate-500">{time}</span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
