/**
 * MessageBubble
 * Une bulle de message dans un fil de conversation.
 *
 * Props:
 * - text: string
 * - fromUser: boolean   -> true = message envoyé par l'utilisateur (aligné à droite)
 * - time: string
 */
export default function MessageBubble({ text, fromUser = false, time }) {
  return (
    <div className={`flex flex-col ${fromUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
          fromUser
            ? "bg-slate-800 text-slate-200"
            : "border border-teal-400/20 bg-teal-400/5 text-slate-200"
        }`}
      >
        {text}
      </div>
      {time && <span className="mt-1 text-xs text-slate-500">{time}</span>}
    </div>
  );
}
