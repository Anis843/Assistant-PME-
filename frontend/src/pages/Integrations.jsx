import { useState, useMemo } from "react";
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
} from "lucide-react";
import ConnectorsGrid from "../components/dashboard/integrations/ConnectorsGrid";

// Données d'exemple — à remplacer par un fetch vers le backend
const INITIAL_CONNECTORS = [
  {
    id: 1,
    name: "Salesforce",
    category: "CRM",
    icon: Cloud,
    iconBg: "bg-sky-500",
    connected: true,
  },
  {
    id: 2,
    name: "HubSpot",
    category: "CRM",
    icon: Megaphone,
    iconBg: "bg-orange-500",
    connected: false,
  },
  {
    id: 3,
    name: "Slack",
    category: "Communication",
    icon: MessageSquare,
    iconBg: "bg-purple-600",
    connected: true,
  },
  {
    id: 4,
    name: "Google Workspace",
    category: "Productivité",
    icon: LayoutGrid,
    iconBg: "bg-blue-500",
    connected: true,
  },
  {
    id: 5,
    name: "Notion",
    category: "Wiki",
    icon: FileText,
    iconBg: "bg-slate-600",
    connected: false,
  },
  {
    id: 6,
    name: "Sage",
    category: "Comptabilité",
    icon: Calculator,
    iconBg: "bg-emerald-600",
    connected: false,
  },
  {
    id: 7,
    name: "Cegid",
    category: "ERP",
    icon: Building2,
    iconBg: "bg-rose-600",
    connected: false,
  },
  {
    id: 8,
    name: "Pennylane",
    category: "Finance",
    icon: Wallet,
    iconBg: "bg-indigo-600",
    connected: true,
  },
  {
    id: 9,
    name: "Zapier",
    category: "Automatisation",
    icon: Zap,
    iconBg: "bg-orange-600",
    connected: false,
  },
  {
    id: 10,
    name: "Make",
    category: "Automatisation",
    icon: Workflow,
    iconBg: "bg-violet-600",
    connected: false,
  },
];

export default function Integrations() {
  const [connectors, setConnectors] = useState(INITIAL_CONNECTORS);
  const [search, setSearch] = useState("");

  const filteredConnectors = useMemo(
    () =>
      connectors.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [connectors, search],
  );

  const connectedCount = connectors.filter((c) => c.connected).length;

  function handleToggleConnect(id) {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, connected: !c.connected } : c)),
    );
    // TODO: déclencher le flow OAuth réel / appel API pour connecter-déconnecter
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-slate-400">
        <span className="font-semibold text-white">{connectedCount}</span>{" "}
        connecteur
        {connectedCount > 1 ? "s" : ""} actif{connectedCount > 1 ? "s" : ""} sur{" "}
        {connectors.length}
      </p>

      <ConnectorsGrid
        connectors={filteredConnectors}
        search={search}
        onSearchChange={setSearch}
        onToggleConnect={handleToggleConnect}
      />
    </div>
  );
}
