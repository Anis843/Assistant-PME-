import StatCard from "../components/dashboard/StatCard";
import ActivityPanel from "../components/dashboard/ActivityPanel";

// Données d'exemple — à remplacer par un appel API / fetch réel
const STATS = [
  {
    label: "Requêtes aujourd'hui",
    value: "1 847",
    delta: "+12%",
    deltaColor: "teal",
  },
  { label: "Agents actifs", value: "7", delta: "+2", deltaColor: "violet" },
  {
    label: "Tâches automatisées",
    value: "342",
    delta: "+28%",
    deltaColor: "teal",
  },
  {
    label: "Économies estimées",
    value: "18h",
    suffix: "/semaine",
    deltaColor: "orange",
  },
];

const ACTIVITY_DATA = [
  { label: "Lun", value: 210 },
  { label: "Mar", value: 260 },
  { label: "Mer", value: 240 },
  { label: "Jeu", value: 300 },
  { label: "Ven", value: 280 },
  { label: "Sam", value: 150 },
  { label: "Dim", value: 190 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <ActivityPanel data={ACTIVITY_DATA} />
    </div>
  );
}
