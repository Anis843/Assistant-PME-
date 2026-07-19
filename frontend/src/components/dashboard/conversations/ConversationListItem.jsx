/**
 * ConversationListItem
 * Une ligne dans la liste des conversations.
 *
 * Props:
 * - agentName: string
 * - lastMessage: string      -> aperçu du dernier message
 * - time: string             -> ex: "10:42" ou "Hier"
 * - unreadCount: number      -> 0 si aucun message non lu
 * - active: boolean          -> true si c'est la conversation actuellement ouverte
 * - onClick: () => void
 */
export default function ConversationListItem({
  agentName,
  lastMessage,
  time,
  unreadCount = 0,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 border-b border-slate-800 px-4 py-3 text-left transition-colors ${
        active ? "bg-teal-400/5" : "hover:bg-white/5"
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-300">
        {agentName.charAt(0)}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-white">{agentName}</span>
          <span className="shrink-0 text-xs text-slate-500">{time}</span>
        </span>
        <span className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-sm text-slate-400">{lastMessage}</span>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-teal-400 px-1.5 text-[11px] font-semibold text-slate-950">
              {unreadCount}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}
