import InsightItem from "./InsightItem";

/**
 * InsightsList
 * Panneau listant les insights/alertes générés par l'IA.
 *
 * Props:
 * - insights: Array<{ id, type, title, description, time }>
 */
export default function InsightsList({ insights = [] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50">
      <p className="border-b border-slate-800 px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
        Alertes &amp; insights
      </p>
      <div>
        {insights.map((insight) => (
          <InsightItem key={insight.id} {...insight} />
        ))}
      </div>
    </div>
  );
}
