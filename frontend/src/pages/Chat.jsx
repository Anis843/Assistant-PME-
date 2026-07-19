import { useState } from "react";
import ConversationList from "../components/dashboard/conversations/ConversationList";
import ConversationThread from "../components/dashboard/conversations/ConversationThread";

// Données d'exemple — à remplacer par un fetch vers le backend
const CONVERSATIONS = [
  {
    id: 1,
    agentName: "Agent Commercial",
    lastMessage: "Voulez-vous que je rédige les emails de relance ?",
    time: "10:42",
    unreadCount: 2,
    messages: [
      {
        id: "a1",
        text: "Quels sont mes prospects non relancés depuis 30 jours ?",
        fromUser: true,
        time: "10:38",
      },
      {
        id: "a2",
        text: "J'ai analysé votre CRM, 14 prospects sont concernés.",
        fromUser: false,
        time: "10:39",
      },
      {
        id: "a3",
        text: "Voulez-vous que je rédige les emails de relance ?",
        fromUser: false,
        time: "10:42",
      },
    ],
  },
  {
    id: 2,
    agentName: "Agent RH",
    lastMessage: "3 postes dépassent les 45 jours ouverts.",
    time: "09:15",
    unreadCount: 0,
    messages: [
      {
        id: "b1",
        text: "Quels postes sont ouverts depuis plus de 45 jours ?",
        fromUser: true,
        time: "09:10",
      },
      {
        id: "b2",
        text: "3 postes dépassent les 45 jours ouverts.",
        fromUser: false,
        time: "09:15",
      },
    ],
  },
  {
    id: 3,
    agentName: "Agent Comptabilité",
    lastMessage: "9 factures sont en retard, pour 34 200 €.",
    time: "Hier",
    unreadCount: 0,
    messages: [
      {
        id: "c1",
        text: "Quelles factures sont en retard ce mois-ci ?",
        fromUser: true,
        time: "Hier",
      },
      {
        id: "c2",
        text: "9 factures sont en retard, pour 34 200 €.",
        fromUser: false,
        time: "Hier",
      },
    ],
  },
];

export default function Chat() {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const activeConversation = CONVERSATIONS.find((c) => c.id === activeId);

  return (
    <div className="flex h-full overflow-hidden rounded-xl border border-slate-800">
      <ConversationList
        conversations={CONVERSATIONS}
        activeId={activeId}
        onSelect={setActiveId}
      />
      <ConversationThread
        key={activeConversation.id}
        agentName={activeConversation.agentName}
        initialMessages={activeConversation.messages}
      />
    </div>
  );
}
