/**
 * BrowserMockup
 * Wrapper visuel imitant une fenêtre de navigateur (dots macOS + barre d'URL),
 * utilisé pour présenter une preview statique du dashboard sur la landing page.
 *
 * Props:
 * - url: string        -> texte affiché dans la barre d'URL (ex: "app.nexia.ai/dashboard")
 * - children: ReactNode -> contenu affiché "dans" le navigateur
 */
export default function BrowserMockup({ url, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="flex items-center gap-4 border-b border-slate-800 px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 rounded-md bg-slate-800/60 px-3 py-1 text-center text-xs text-slate-400">
          {url}
        </div>
      </div>

      <div className="bg-slate-950">{children}</div>
    </div>
  );
}
