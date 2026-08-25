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
  // Le panneau des documents devient un volet en dessous de `lg` : son état
  // est porté ici, seul ancêtre commun du volet et de son bouton d'ouverture.
  const [panelOpen, setPanelOpen] = useState(false);

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
      <DocumentContextPanel
        documents={documents}
        loading={loading}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
      <ConversationThread
        agentName="NexIA"
        onSend={handleSend}
        documentsReady={hasIndexedDocuments}
        documentsChecked={!loading}
        suggestions={SUGGESTED_QUESTIONS}
        indexedCount={documents.filter((doc) => doc.status === "indexed").length}
        onShowDocuments={() => setPanelOpen(true)}
      />
    </div>
  );
}
