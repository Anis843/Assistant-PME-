import {
  LayoutDashboard,
  MessagesSquare,
  BarChart3,
  Bot,
  Settings,
  Plug,
  FileText,
  X,
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
 * Navigation verticale de l'app dashboard.
 *
 * Colonne fixe à partir de `lg`, tiroir coulissant en dessous : ses 240 px
 * occuperaient les deux tiers d'un écran de téléphone.
 *
 * Props:
 * - open: boolean      -> tiroir déployé (sans effet à partir de `lg`)
 * - onClose: () => void
 */
export default function Sidebar({ open = false, onClose }) {
  return (
    <>
      {/* Voile : ferme le tiroir au toucher hors de la navigation. */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col gap-1 border-r border-slate-800 bg-slate-950 p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-3 flex items-center justify-between lg:hidden">
          <span className="text-lg font-bold text-white">NexIA</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {NAV_ITEMS.map((item) => (
          // Referme le tiroir après navigation : sur mobile, il masquerait
          // sinon la page qu'on vient d'ouvrir.
          <SidebarItem key={item.to} {...item} onNavigate={onClose} />
        ))}
      </aside>
    </>
  );
}
