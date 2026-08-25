import { Bell, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../lib/auth";

/**
 * Header
 * Barre supérieure du dashboard, au-dessus du contenu de chaque page.
 *
 * Props:
 * - title: string          -> titre de la page courante (ex: "Tableau de bord")
 * - actions: ReactNode     -> slot optionnel pour des boutons/actions à droite
 *                             (en plus de la cloche de notifications toujours affichée)
 * - onMenuClick: () => void -> ouvre le tiroir de navigation (mobile uniquement)
 */
export default function Header({ title, actions, onMenuClick }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        {/* Seul accès à la navigation en dessous de `lg`, où la sidebar est
            repliée en tiroir. */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
          className="-ml-1 rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="truncate text-lg font-semibold text-white">{title}</h1>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        {actions}
        <button
          type="button"
          aria-label="Notifications"
          className="hidden rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200 sm:block"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Se déconnecter"
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
