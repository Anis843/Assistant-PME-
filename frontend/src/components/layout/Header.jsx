import { Bell } from "lucide-react";

/**
 * Header
 * Barre supérieure du dashboard, au-dessus du contenu de chaque page.
 *
 * Props:
 * - title: string          -> titre de la page courante (ex: "Tableau de bord")
 * - actions: ReactNode     -> slot optionnel pour des boutons/actions à droite
 *                             (en plus de la cloche de notifications toujours affichée)
 */
export default function Header({ title, actions }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <h1 className="text-lg font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-3">
        {actions}
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
