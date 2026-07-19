import {
  Cloud,
  Megaphone,
  MessageSquare,
  LayoutGrid,
  FileText,
  Calculator,
  Building2,
  Wallet,
  Zap,
  Workflow,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import IntegrationCard from "./IntegrationCard";

// Icônes génériques utilisées à la place des logos de marque (pas de reproduction de logo)
const INTEGRATIONS = [
  { name: "Salesforce", category: "CRM", icon: Cloud, iconBg: "bg-sky-500" },
  { name: "HubSpot", category: "CRM", icon: Megaphone, iconBg: "bg-orange-500" },
  { name: "Slack", category: "Communication", icon: MessageSquare, iconBg: "bg-purple-600" },
  { name: "Google Workspace", category: "Productivité", icon: LayoutGrid, iconBg: "bg-blue-500" },
  { name: "Notion", category: "Wiki", icon: FileText, iconBg: "bg-slate-600" },
  { name: "Sage", category: "Comptabilité", icon: Calculator, iconBg: "bg-emerald-600" },
  { name: "Cegid", category: "ERP", icon: Building2, iconBg: "bg-rose-600" },
  { name: "Pennylane", category: "Finance", icon: Wallet, iconBg: "bg-indigo-600" },
  { name: "Zapier", category: "Automatisation", icon: Zap, iconBg: "bg-orange-600" },
  { name: "Make", category: "Automatisation", icon: Workflow, iconBg: "bg-violet-600" },
  { name: "Pipedrive", category: "CRM", icon: TrendingUp, iconBg: "bg-slate-700" },
  { name: "Monday.com", category: "Gestion", icon: CalendarDays, iconBg: "bg-pink-600" },
];

/**
 * IntegrationsSection
 * Section "Connecté à votre écosystème" avec la grille des 12 intégrations.
 * La liste INTEGRATIONS est en dur ici — passer `integrations` en prop
 * si elle doit venir d'une source dynamique (config, API...).
 */
export default function IntegrationsSection() {
  return (
    <section id="integrations" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Intégrations &amp; stack
        </p>
        <h2 className="mt-4 text-4xl font-extrabold text-white">
          Connecté à votre écosystème
        </h2>
        <p className="mt-4 text-slate-400">
          +80 connecteurs natifs. Zéro friction pour démarrer.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {INTEGRATIONS.map((integration) => (
          <IntegrationCard key={integration.name} {...integration} />
        ))}
      </div>
    </section>
  );
}
