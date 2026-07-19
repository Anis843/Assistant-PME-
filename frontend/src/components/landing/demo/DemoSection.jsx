import { useState } from "react";
import AgentOption from "./AgentOption";
import AgentDemoChat from "./AgentDemoChat";

// Données de démo — à remplacer par du contenu réel / API si besoin
const AGENTS = [
  {
    id: "commercial",
    name: "Agent Commercial",
    color: "teal",
    question: "Quels sont mes prospects qui n'ont pas été relancés depuis 30 jours ?",
    answerSegments: [
      { text: "J'ai analysé votre CRM. " },
      { text: "14 prospects", bold: true },
      { text: " n'ont pas été contactés depuis +30 jours, pour un potentiel total de " },
      { text: "127 000 €.", bold: true },
      { text: "\n\nLes 3 priorités absolues :\n• " },
      { text: "Constructions Dupont", bold: true },
      { text: " — devis 48 000 € envoyé le 3/06, pas de retour\n• " },
      { text: "Groupe Lemaire", bold: true },
      { text: " — démo effectuée, décision reportée\n• " },
      { text: "Cabinet Rousseau", bold: true },
      { text: " — intérêt fort, en attente de validation budget\n\nVoulez-vous que je rédige les emails de relance personnalisés ?" },
    ],
  },
  {
    id: "rh",
    name: "Agent RH",
    color: "violet",
    question: "Quels postes sont ouverts depuis plus de 45 jours sans candidat retenu ?",
    answerSegments: [
      { text: "J'ai vérifié votre ATS. " },
      { text: "3 postes", bold: true },
      { text: " dépassent les 45 jours ouverts, dont un poste critique.\n\nÀ prioriser :\n• " },
      { text: "Développeur Backend Senior", bold: true },
      { text: " — 52 jours, 2 entretiens finaux prévus cette semaine\n• " },
      { text: "Responsable Comptable", bold: true },
      { text: " — 61 jours, pipeline de candidats faible\n• " },
      { text: "Chargé de support client", bold: true },
      { text: " — 47 jours, 4 candidats en attente de retour\n\nVoulez-vous que je relance les candidats en attente ?" },
    ],
  },
  {
    id: "comptabilite",
    name: "Agent Comptabilité",
    color: "orange",
    question: "Quelles factures clients sont en retard de paiement ce mois-ci ?",
    answerSegments: [
      { text: "J'ai croisé vos factures avec les paiements reçus. " },
      { text: "9 factures", bold: true },
      { text: " sont en retard, pour un total de " },
      { text: "34 200 €.", bold: true },
      { text: "\n\nÀ relancer en priorité :\n• " },
      { text: "Client Delmas SARL", bold: true },
      { text: " — 12 400 €, 22 jours de retard\n• " },
      { text: "Atelier Bernard", bold: true },
      { text: " — 8 900 €, 15 jours de retard\n• " },
      { text: "Groupe Fontaine", bold: true },
      { text: " — 6 300 €, 10 jours de retard\n\nVoulez-vous que je génère les relances automatiques ?" },
    ],
  },
];

/**
 * DemoSection
 * Section "Démo interactive" : liste d'agents à gauche, chat à droite.
 * Gère le state de l'agent sélectionné.
 */
export default function DemoSection() {
  const [selectedId, setSelectedId] = useState(AGENTS[0].id);
  const selectedAgent = AGENTS.find((agent) => agent.id === selectedId);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            Démo interactive
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white">
            Des agents qui agissent, pas qui répondent
          </h2>
          <p className="mt-4 text-slate-400">
            Chaque agent accède à vos données en temps réel, exécute des
            actions et vous rapporte les résultats. Pas de copier-coller, pas
            de délégation manuelle.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {AGENTS.map((agent) => (
              <AgentOption
                key={agent.id}
                name={agent.name}
                color={agent.color}
                active={agent.id === selectedId}
                onClick={() => setSelectedId(agent.id)}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[480px]">
          <AgentDemoChat
            agentName={selectedAgent.name}
            question={selectedAgent.question}
            answerSegments={selectedAgent.answerSegments}
          />
        </div>
      </div>
    </section>
  );
}
