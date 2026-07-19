import { Plus } from "lucide-react";
import AgentCard from "./AgentCard";

/**
 * AgentsGrid
 * Grille des AgentCard + carte "Ajouter un agent".
 *
 * Props:
 * - agents: Array<{ id, name, category, color, description, requestsHandled, active }>
 * - onToggleActive: (id) => void
 * - onConfigure: (id) => void
 * - onAddAgent: () => void
 */
export default function AgentsGrid({ agents = [], onToggleActive, onConfigure, onAddAgent }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          name={agent.name}
          category={agent.category}
          color={agent.color}
          description={agent.description}
          requestsHandled={agent.requestsHandled}
          active={agent.active}
          onToggleActive={() => onToggleActive(agent.id)}
          onConfigure={() => onConfigure(agent.id)}
        />
      ))}

      <button
        type="button"
        onClick={onAddAgent}
        className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
      >
        <Plus className="h-6 w-6" />
        <span className="text-sm font-medium">Ajouter un agent</span>
      </button>
    </div>
  );
}
