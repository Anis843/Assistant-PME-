import { useState } from "react";
import AgentsGrid from "../components/dashboard/agents/AgentsGrid";

// Données d'exemple — à remplacer par un fetch vers le backend
const INITIAL_AGENTS = [
  {
    id: 1,
    name: "Agent Commercial",
    category: "Commercial",
    color: "teal",
    description:
      "Suit vos prospects, relance les devis en attente et priorise les opportunités.",
    requestsHandled: 820,
    active: true,
  },
  {
    id: 2,
    name: "Agent RH",
    category: "Ressources humaines",
    color: "violet",
    description:
      "Suit les recrutements en cours et relance les candidats en attente de retour.",
    requestsHandled: 340,
    active: true,
  },
  {
    id: 3,
    name: "Agent Comptabilité",
    category: "Comptabilité",
    color: "orange",
    description:
      "Détecte les factures en retard et génère les relances automatiques.",
    requestsHandled: 510,
    active: false,
  },
];

export default function Agents() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);

  function handleToggleActive(id) {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, active: !agent.active } : agent,
      ),
    );
    // TODO: appeler l'API backend pour persister l'état actif/inactif
  }

  function handleConfigure(id) {
    // TODO: ouvrir une modale/page de configuration pour l'agent `id`
    console.log("Configurer l'agent", id);
  }

  function handleAddAgent() {
    // TODO: ouvrir le flow de création d'un nouvel agent
    console.log("Ajouter un agent");
  }

  return (
    <AgentsGrid
      agents={agents}
      onToggleActive={handleToggleActive}
      onConfigure={handleConfigure}
      onAddAgent={handleAddAgent}
    />
  );
}
