import { useState } from "react";
import { ArrowRight } from "lucide-react";
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
 */
function currentTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function ConversationThread({ agentName, onSend }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSend(e) {
    e.preventDefault();
    const question = draft.trim();
    if (!question || loading) return;

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

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <span className="font-semibold text-white">{agentName}</span>
        <span className="rounded-md bg-teal-400/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-teal-300">
          En ligne
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && !loading && (
          <p className="mt-8 text-center text-sm text-slate-500">
            Posez une question sur vos documents pour démarrer la conversation.
          </p>
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
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
            {agentName} réfléchit…
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-orange-400/30 bg-orange-400/10 px-4 py-2.5 text-sm text-orange-300">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-3 border-t border-slate-800 p-4">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Écrire à ${agentName}...`}
          disabled={loading}
          className="flex-1 rounded-lg bg-slate-800/60 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Envoyer"
          disabled={loading}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400 text-slate-950 hover:bg-teal-300 disabled:opacity-50"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
