import StatCard from "../components/dashboard/StatCard";
import AnalyticsChart from "../components/dashboard/analyses/AnalyticsChart";
import InsightsList from "../components/dashboard/analyses/InsightsList";

// Données d'exemple — à remplacer par un fetch vers le backend
const STATS = [
  {
    label: "Requêtes ce mois",
    value: "48 210",
    delta: "+18%",
    deltaColor: "teal",
  },
  {
    label: "Taux de résolution",
    value: "94%",
    delta: "+3pts",
    deltaColor: "teal",
  },
  {
    label: "Temps de réponse moyen",
    value: "1.2s",
    delta: "-0.3s",
    deltaColor: "violet",
  },
  {
    label: "Anomalies détectées",
    value: "3",
    delta: "cette semaine",
    deltaColor: "orange",
  },
];

const USAGE_DATA = [
  { label: "Lun", value: 1200 },
  { label: "Mar", value: 1900 },
  { label: "Mer", value: 1600 },
  { label: "Jeu", value: 2400 },
  { label: "Ven", value: 2100 },
  { label: "Sam", value: 900 },
  { label: "Dim", value: 1100 },
];

const REQUESTS_BY_AGENT = [
  { label: "Commercial", value: 820 },
  { label: "RH", value: 340 },
  { label: "Compta", value: 510 },
  { label: "Support", value: 690 },
];

const INSIGHTS = [
  {
    id: 1,
    type: "warning",
    title: "Pic de requêtes non résolues",
    description:
      "Le taux de résolution de l'Agent Support est passé sous 85% depuis 3 jours.",
    time: "Il y a 2h",
  },
  {
    id: 2,
    type: "positive",
    title: "Gain de temps significatif",
    description:
      "L'automatisation des relances commerciales a économisé ~6h cette semaine.",
    time: "Il y a 5h",
  },
  {
    id: 3,
    type: "info",
    title: "Nouveau pic d'usage",
    description:
      "Les requêtes ont augmenté de 28% le jeudi par rapport à la semaine dernière.",
    time: "Hier",
  },
];

export default function Analyses() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsChart
          title="Requêtes — 7 derniers jours"
          type="line"
          data={USAGE_DATA}
          color="#2dd4bf"
        />
        <AnalyticsChart
          title="Requêtes par agent"
          type="bar"
          data={REQUESTS_BY_AGENT}
          color="#a78bfa"
        />
      </div>

      <InsightsList insights={INSIGHTS} />
    </div>
  );
}
