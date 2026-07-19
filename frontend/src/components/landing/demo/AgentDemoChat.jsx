import { ArrowRight, Sparkles } from "lucide-react";

/**
 * AgentDemoChat
 * Fenêtre de chat statique montrant un échange exemple avec l'agent sélectionné.
 *
 * Props:
 * - agentName: string
 * - question: string                 -> message affiché côté utilisateur
 * - answerSegments: Array<{ text: string, bold?: boolean }>
 *                                     -> réponse de l'agent, avec passages en gras
 */
export default function AgentDemoChat({ agentName, question, answerSegments = [] }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/50">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-teal-400" />
          <span className="font-semibold text-white">{agentName}</span>
        </div>
        <span className="rounded-md bg-teal-400/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-teal-300">
          En ligne
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        <div className="ml-auto max-w-[85%] rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-200">
          {question}
        </div>

        <div className="flex gap-3">
          <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-400/20 text-teal-300">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div className="max-w-[85%] whitespace-pre-line rounded-xl border border-teal-400/20 bg-teal-400/5 px-4 py-3 text-sm leading-relaxed text-slate-200">
            {answerSegments.map((segment, i) =>
              segment.bold ? (
                <strong key={i} className="font-semibold text-white">
                  {segment.text}
                </strong>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-800 p-4">
        <input
          type="text"
          disabled
          placeholder={`Posez une question à ${agentName}...`}
          className="flex-1 rounded-lg bg-slate-800/60 px-4 py-2.5 text-sm text-slate-400 placeholder:text-slate-500"
        />
        <button
          type="button"
          disabled
          aria-label="Envoyer"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400 text-slate-950"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
