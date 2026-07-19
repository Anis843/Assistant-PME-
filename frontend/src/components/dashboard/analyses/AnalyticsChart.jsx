import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * AnalyticsChart
 * Graphique réutilisable pour la page Analyses.
 *
 * Props:
 * - title: string
 * - type: 'line' | 'bar'
 * - data: Array<{ label: string, value: number }>
 * - color: string   -> couleur hex (ex: "#2dd4bf")
 */
export default function AnalyticsChart({ title, type = "line", data = [], color = "#2dd4bf" }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="label" stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="label" stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
