/**
 * AuthLayout
 * Wrapper centré pour les pages d'authentification (Login, Signup, etc.)
 * Affiche le logo NexIA en haut d'une carte centrée sur fond sombre.
 *
 * Props:
 * - title: string
 * - subtitle: string
 * - children: ReactNode   -> le formulaire
 * - footer: ReactNode     -> lien optionnel sous la carte (ex: "Pas de compte ? Créer un compte")
 */
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-400 to-violet-500" />
          <span className="text-lg font-bold text-white">NexIA</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}

          <div className="mt-6">{children}</div>
        </div>

        {footer && <div className="mt-6 text-center text-sm text-slate-400">{footer}</div>}
      </div>
    </div>
  );
}
