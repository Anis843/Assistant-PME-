import { useState } from "react";
import { ArrowRight } from "lucide-react";
import MessageBubble from "./MessageBubble";

/**
 * ConversationThread
 * Colonne de droite : header (agent) + fil de messages + champ de saisie.
 * Gère un state local des messages (à remplacer par un fetch/websocket
 * réel quand le backend sera branché — voir la fonction handleSend).
 *
 * Props:
 * - agentName: string
 * - initialMessages: Array<{ id, text, fromUser, time }>
 */
export default function ConversationThread({ agentName, initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!draft.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: draft, fromUser: true, time: "À l'instant" },
    ]);
    setDraft("");

    // TODO: appeler l'API backend ici pour obtenir la vraie réponse de l'agent
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
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            fromUser={message.fromUser}
            time={message.time}
          />
        ))}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-3 border-t border-slate-800 p-4">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Écrire à ${agentName}...`}
          className="flex-1 rounded-lg bg-slate-800/60 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Envoyer"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400 text-slate-950 hover:bg-teal-300"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
