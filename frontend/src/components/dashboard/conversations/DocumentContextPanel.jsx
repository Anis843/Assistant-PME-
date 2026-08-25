import { Link } from "react-router-dom";
import { FileText, FileUp, Info, X } from "lucide-react";

/**
 * DocumentContextPanel
 * Colonne de gauche de la page Chat : liste les documents que NexIA interroge.
 *
 * C'est un panneau informatif (et non un sélecteur) : la recherche vectorielle
 * porte sur l'ensemble des documents indexés de l'utilisateur.
 *
 * Colonne fixe à partir de `lg`, volet coulissant en dessous : ses 320 px
 * s'ajouteraient à la sidebar et ne laisseraient plus rien au fil de discussion.
 *
 * Props:
 * - documents: Array<{ id, original_name, status }>
 * - loading: boolean
 * - open: boolean       -> volet déployé (sans effet à partir de `lg`)
 * - onClose: () => void
 */
const STATUS_STYLE = {
  indexed: { label: "Indexé", className: "bg-teal-400/10 text-teal-300" },
  processing: { label: "Traitement…", className: "bg-sky-400/10 text-sky-300" },
  uploaded: { label: "En attente", className: "bg-slate-700/60 text-slate-400" },
  error: { label: "Erreur", className: "bg-orange-400/10 text-orange-300" },
};

export default function DocumentContextPanel({
  documents = [],
  loading = false,
  open = false,
  onClose,
}) {
  const indexedCount = documents.filter((doc) => doc.status === "indexed").length;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-40 flex h-full w-80 max-w-[85vw] shrink-0 flex-col border-l border-slate-800 bg-slate-950 transition-transform duration-200 lg:static lg:max-w-none lg:translate-x-0 lg:border-l-0 lg:border-r ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-slate-800 px-4 py-3.5">
          <div>
            <p className="text-sm font-semibold text-white">Documents interrogés</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {loading
                ? "Chargement…"
                : `${indexedCount} document${indexedCount > 1 ? "s" : ""} indexé${
                    indexedCount > 1 ? "s" : ""
                  }`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panneau"
            className="-mr-2 -mt-1 rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-slate-200 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {!loading && documents.length === 0 && (
            <div className="px-2 py-6 text-center">
              <p className="text-sm text-slate-500">Aucun document importé.</p>
              <Link
                to="/app/Documents"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-teal-400/40 hover:text-teal-200"
              >
                <FileUp className="h-3.5 w-3.5" aria-hidden="true" />
                Importer un PDF
              </Link>
            </div>
          )}

          {documents.map((doc) => {
            const status = STATUS_STYLE[doc.status] || STATUS_STYLE.uploaded;
            return (
              <div
                key={doc.id}
                className="flex items-start gap-2.5 rounded-lg px-2.5 py-2.5 hover:bg-slate-800/40"
              >
                <FileText
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-slate-200" title={doc.original_name}>
                    {doc.original_name}
                  </p>
                  <span
                    className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explique le fonctionnement en une phrase : utile en démonstration. */}
        <div className="flex items-start gap-2 border-t border-slate-800 px-4 py-3 text-xs text-slate-500">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>NexIA cherche la réponse dans tous vos documents indexés.</span>
        </div>
      </div>
    </>
  );
}
