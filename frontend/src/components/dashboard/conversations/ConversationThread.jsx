import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileUp, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";

/**
 * ConversationThread
 * Colonne de droite : header (agent) + fil de messages + champ de saisie.
 * Interroge le backend via la prop `onSend` (asynchrone) et affiche la vraie
 * réponse de l'IA, avec ses sources. Gère les états de chargement et d'erreur.
 *
 * Props:
 * - agentName: string
 * - onSend: (question: string) => Promise<{ answer, sources }>
 * - documentsReady: boolean   -> au moins un document est indexé
 * - documentsChecked: boolean -> la liste des documents a fini de charger
 * - suggestions: string[]     -> questions proposées au démarrage
 */
function currentTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function ConversationThread({
  agentName,
  onSend,
  documentsReady = true,
  documentsChecked = true,
  suggestions = [],
}) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  // Sans document indexé, une question ne peut pas aboutir : on bloque en amont
  // plutôt que de laisser l'utilisateur recevoir une réponse vide.
  const canChat = documentsReady && !loading;

  // Garde le dernier message visible : sans ça, la réponse arrive hors écran
  // dès que le fil dépasse la hauteur de la zone.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function submitQuestion(question) {
    if (!question || loading || !documentsReady) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: question, fromUser: true, time: currentTime() },
    ]);
    setDraft("");
    setError(null);
    setLoading(true);

    try {
      const { answer, sources } = await onSend(question);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: answer,
          fromUser: false,
          time: currentTime(),
          sources: sources || [],
        },
      ]);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitQuestion(draft.trim());
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <span className="font-semibold text-white">{agentName}</span>
        <span className="rounded-md bg-teal-400/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-teal-300">
          En ligne
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {/* Aucun document indexé : on l'annonce et on renvoie vers l'import. */}
        {documentsChecked && !documentsReady && (
          <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
            <p className="font-semibold">Aucun document indexé</p>
            <p className="mt-1 text-amber-200/80">
              NexIA répond uniquement à partir de vos documents. Importez un PDF
              pour démarrer.
            </p>
            <Link
              to="/app/Documents"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-amber-300"
            >
              <FileUp className="h-3.5 w-3.5" aria-hidden="true" />
              Importer un document
            </Link>
          </div>
        )}

        {messages.length === 0 && !loading && documentsReady && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Posez une question sur vos documents pour démarrer la conversation.
            </p>

            {suggestions.length > 0 && (
              <div className="mt-5">
                <p className="mb-2.5 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wide text-slate-600">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Suggestions
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => submitQuestion(question)}
                      className="rounded-full border border-slate-700 bg-slate-800/50 px-3.5 py-1.5 text-xs text-slate-300 transition hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            fromUser={message.fromUser}
            time={message.time}
            sources={message.sources}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 rounded-xl border border-teal-400/20 bg-teal-400/5 px-4 py-3 text-sm text-slate-400 w-fit">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400" />
            </span>
            {agentName} analyse vos documents…
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-orange-400/30 bg-orange-400/10 px-4 py-2.5 text-sm text-orange-300">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-slate-800 p-4">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={
            documentsReady
              ? `Écrire à ${agentName}...`
              : "Importez un document pour commencer…"
          }
          disabled={!canChat}
          className="flex-1 rounded-lg bg-slate-800/60 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Envoyer"
          disabled={!canChat || !draft.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400 text-slate-950 hover:bg-teal-300 disabled:opacity-50"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
