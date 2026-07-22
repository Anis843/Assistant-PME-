import { useEffect, useState } from "react";
import ConversationList from "../components/dashboard/conversations/ConversationList";
import ConversationThread from "../components/dashboard/conversations/ConversationThread";
import { listDocuments, sendChatMessage } from "../lib/api";
import { getToken } from "../lib/auth";

const STATUS_LABEL = {
  uploaded: "Importé",
  processing: "Traitement…",
  indexed: "Indexé",
  error: "Erreur",
};

// L'assistant interroge l'ensemble des documents indexés de l'utilisateur.
// La colonne de gauche liste ces documents (contexte réel), la colonne de
// droite est le fil de discussion avec NexIA.
export default function Chat() {
  const [documents, setDocuments] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    let ignore = false;

    listDocuments(getToken())
      .then((data) => {
        if (ignore) return;
        setDocuments(data);
        if (data.length > 0) setActiveId(data[0].id);
      })
      .catch(() => {
        // La liste est purement informative : en cas d'échec, le chat reste utilisable.
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Adapte les documents au format attendu par ConversationList (colonne de gauche).
  const conversations = documents.map((doc) => ({
    id: doc.id,
    agentName: doc.original_name,
    lastMessage: STATUS_LABEL[doc.status] || doc.status,
    time: "",
    unreadCount: 0,
  }));

  function handleSend(question) {
    return sendChatMessage({ question }, getToken());
  }

  return (
    <div className="flex h-full overflow-hidden rounded-xl border border-slate-800">
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
      />
      <ConversationThread agentName="NexIA" onSend={handleSend} />
    </div>
  );
}
