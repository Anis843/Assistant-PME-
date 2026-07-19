import { Search } from "lucide-react";
import ConversationListItem from "./ConversationListItem";

/**
 * ConversationList
 * Colonne de gauche listant toutes les conversations.
 *
 * Props:
 * - conversations: Array<{ id, agentName, lastMessage, time, unreadCount }>
 * - activeId: string|number  -> id de la conversation actuellement sélectionnée
 * - onSelect: (id) => void
 */
export default function ConversationList({ conversations = [], activeId, onSelect }) {
  return (
    <div className="flex h-full w-80 shrink-0 flex-col border-r border-slate-800">
      <div className="border-b border-slate-800 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-800/60 px-3 py-2">
          <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <input
            type="text"
            placeholder="Rechercher une conversation..."
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            agentName={conversation.agentName}
            lastMessage={conversation.lastMessage}
            time={conversation.time}
            unreadCount={conversation.unreadCount}
            active={conversation.id === activeId}
            onClick={() => onSelect(conversation.id)}
          />
        ))}
      </div>
    </div>
  );
}
