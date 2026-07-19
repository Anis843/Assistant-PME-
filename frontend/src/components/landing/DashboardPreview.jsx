import {
  LayoutDashboard,
  MessagesSquare,
  BarChart3,
  Bot,
  LogIn,
  Settings,
} from "lucide-react";
import BrowserMockup from "../ui/BrowserMockup";
import StatCard from "../dashboard/StatCard";

// Nav statique (pas de routing ici, c'est juste une image/preview marketing)
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Chat", icon: MessagesSquare },
  { label: "Analyses", icon: BarChart3 },
  { label: "Agents", icon: Bot },
  { label: "Login", icon: LogIn },
  { label: "Settings", icon: Settings },
];

const STATS = [
  {
    label: "Requêtes aujourd'hui",
    value: "1 847",
    delta: "+12%",
    deltaColor: "teal",
  },
  { label: "Agents actifs", value: "7", delta: "+2", deltaColor: "violet" },
  {
    label: "Tâches automatisées",
    value: "342",
    delta: "+28%",
    deltaColor: "teal",
  },
  {
    label: "Économies estimées",
    value: "18h",
    suffix: "/semaine",
    deltaColor: "orange",
  },
];

/**
 * DashboardPreview
 * Section de la landing page qui montre un aperçu (statique, non interactif)
 * du dashboard réel, dans un BrowserMockup.
 */
export default function DashboardPreview() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <BrowserMockup url="app.nexia.ai/dashboard">
          <div className="flex">
            <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-slate-800 p-4 sm:flex">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                    item.active
                      ? "bg-teal-400/10 text-teal-300"
                      : "text-slate-500"
                  }`}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </div>
              ))}
            </aside>

            <div className="flex-1 space-y-4 p-4">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STATS.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Activité — 7 derniers jours
                </p>
                <div className="mt-4 h-48" />
              </div>
            </div>
          </div>
        </BrowserMockup>
      </div>
    </section>
  );
}
