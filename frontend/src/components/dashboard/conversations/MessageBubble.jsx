import { FileText } from "lucide-react";

/**
 * MessageBubble
 * Une bulle de message dans un fil de conversation.
 *
 * Props:
 * - text: string
 * - fromUser: boolean   -> true = message envoyé par l'utilisateur (aligné à droite)
 * - time: string
 * - sources: Array<{ document_id, document_name, ... }>  -> documents cités (réponse IA)
 */
function uniqueSourceNames(sources) {
  // Un même document peut apparaître via plusieurs extraits : on dédoublonne
  // par nom pour n'afficher chaque source qu'une fois.
  return [...new Set(sources.map((s) => s.document_name))];
}

export default function MessageBubble({ text, fromUser = false, time, sources = [] }) {
  const sourceNames = fromUser ? [] : uniqueSourceNames(sources);

  return (
    <div className={`flex flex-col ${fromUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
          fromUser
            ? "bg-slate-800 text-slate-200"
            : "border border-teal-400/20 bg-teal-400/5 text-slate-200"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>

        {sourceNames.length > 0 && (
          <div className="mt-3 border-t border-teal-400/10 pt-2">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal-300/80">
              Sources
            </p>
            <ul className="space-y-1">
              {sourceNames.map((name) => (
                <li key={name} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <FileText className="h-3 w-3 shrink-0 text-slate-500" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {time && <span className="mt-1 text-xs text-slate-500">{time}</span>}
    </div>
  );
}
