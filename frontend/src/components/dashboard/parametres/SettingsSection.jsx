/**
 * SettingsSection
 * Carte wrapper pour une section de la page Paramètres (Profil, Notifications...).
 *
 * Props:
 * - title: string
 * - description: string
 * - children: ReactNode
 */
export default function SettingsSection({ title, description, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}
