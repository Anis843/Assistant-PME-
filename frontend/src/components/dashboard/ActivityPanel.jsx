import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * ActivityPanel
 * Graphique d'activité sur une période (par défaut 7 derniers jours).
 *
 * Props:
 * - title: string   -> titre du panneau (ex: "Activité — 7 derniers jours")
 * - data: Array<{ label: string, value: number }>  -> points du graphique
 */
export default function ActivityPanel({ title = "Activité — 7 derniers jours", data = [] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="#64748b"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#e2e8f0" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2dd4bf"
              strokeWidth={2}
              fill="url(#activityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
