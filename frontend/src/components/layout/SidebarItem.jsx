import { NavLink } from "react-router-dom";

/**
 * SidebarItem
 * Un lien de navigation dans la Sidebar.
 *
 * Props:
 * - to: string          -> route cible (react-router)
 * - icon: composant lucide-react
 * - label: string        -> texte affiché
 * - end: boolean          -> passe à NavLink pour un match exact (ex: "/")
 */
export default function SidebarItem({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-teal-400/10 text-teal-300"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
        }`
      }
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </NavLink>
  );
}
