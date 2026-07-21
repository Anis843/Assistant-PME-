import {
  LayoutDashboard,
  MessagesSquare,
  BarChart3,
  Bot,
  Settings,
  Plug,
  FileText,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const NAV_ITEMS = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/Chat", label: "Chat", icon: MessagesSquare },
  { to: "/app/Documents", label: "Documents", icon: FileText },
  { to: "/app/Analyses", label: "Analyses", icon: BarChart3 },
  { to: "/app/Agents", label: "Agents", icon: Bot },
  { to: "/app/Integrations", label: "Integrations", icon: Plug },
  { to: "/app/Settings", label: "Settings", icon: Settings },
];

/**
 * Sidebar
 * Navigation verticale fixe de l'app dashboard.
 * Ne prend pas de props : la liste de nav est définie ici (NAV_ITEMS).
 * Si la nav doit devenir dynamique (rôles utilisateur, permissions...),
 * passer `items` en prop plutôt que d'éditer NAV_ITEMS directement.
 */
export default function Sidebar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col gap-1 border-r border-slate-800 bg-slate-950 p-4">
      {NAV_ITEMS.map((item) => (
        <SidebarItem key={item.to} {...item} />
      ))}
    </aside>
  );
}
