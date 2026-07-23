import { useEffect, useState } from "react";
import DocumentContextPanel from "../components/dashboard/conversations/DocumentContextPanel";
import ConversationThread from "../components/dashboard/conversations/ConversationThread";
import { listDocuments, sendChatMessage } from "../lib/api";
import { getToken } from "../lib/auth";

// Questions proposées au démarrage : elles montrent immédiatement le type de
// réponse attendu, sans que l'utilisateur ait à deviner quoi demander.
const SUGGESTED_QUESTIONS = [
  "Quelles sont les conditions de résiliation ?",
  "Quel est le montant TTC de la facture ?",
  "Combien de jours de télétravail sont autorisés ?",
];

// L'assistant interroge l'ensemble des documents indexés de l'utilisateur.
// La colonne de gauche affiche ce périmètre, la colonne de droite est le fil
// de discussion avec NexIA.
export default function Chat() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    listDocuments(getToken())
      .then((data) => {
        if (!ignore) setDocuments(data);
      })
      .catch(() => {
        // La liste est informative : en cas d'échec, on n'empêche pas le chat.
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const hasIndexedDocuments = documents.some((doc) => doc.status === "indexed");

  function handleSend(question) {
    return sendChatMessage({ question }, getToken());
  }

  return (
    <div className="flex h-full overflow-hidden rounded-xl border border-slate-800">
      <DocumentContextPanel documents={documents} loading={loading} />
      <ConversationThread
        agentName="NexIA"
        onSend={handleSend}
        documentsReady={hasIndexedDocuments}
        documentsChecked={!loading}
        suggestions={SUGGESTED_QUESTIONS}
      />
    </div>
  );
}
