import { Search } from "lucide-react";
import ConnectorCard from "./ConnectorCard";

/**
 * ConnectorsGrid
 * Grille des ConnectorCard avec une barre de recherche.
 *
 * Props:
 * - connectors: Array<{ id, name, category, icon, iconBg, connected }>
 * - search: string
 * - onSearchChange: (value: string) => void
 * - onToggleConnect: (id) => void
 */
export default function ConnectorsGrid({ connectors = [], search, onSearchChange, onToggleConnect }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 sm:max-w-xs">
        <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un connecteur..."
          className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {connectors.map((connector) => (
          <ConnectorCard
            key={connector.id}
            name={connector.name}
            category={connector.category}
            icon={connector.icon}
            iconBg={connector.iconBg}
            connected={connector.connected}
            onToggleConnect={() => onToggleConnect(connector.id)}
          />
        ))}
      </div>

      {connectors.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500">
          Aucun connecteur ne correspond à votre recherche.
        </p>
      )}
    </div>
  );
}
