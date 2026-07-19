import { useState } from "react";
import SettingsSection from "../components/dashboard/parametres/SettingsSection";
import ToggleRow from "../components/dashboard/parametres/ToggleRow";
import Button from "../components/ui/Button";

const INITIAL_NOTIFICATIONS = [
  {
    id: "alerts",
    label: "Alertes proactives",
    description: "Anomalies détectées par les agents IA",
    checked: true,
  },
  {
    id: "reports",
    label: "Rapport hebdomadaire",
    description: "Résumé d'activité envoyé chaque lundi",
    checked: true,
  },
  {
    id: "product",
    label: "Actualités produit",
    description: "Nouveautés et mises à jour NexIA",
    checked: false,
  },
];

export default function Parametres() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  function handleToggleNotification(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, checked: !n.checked } : n)),
    );
    // TODO: persister la préférence côté backend
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    // TODO: envoyer les données du formulaire à l'API backend
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <SettingsSection
        title="Profil"
        description="Informations de votre compte."
      >
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Nom complet
            </label>
            <input
              id="fullName"
              type="text"
              defaultValue=""
              placeholder="Votre nom"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue=""
              placeholder="vous@entreprise.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Entreprise
            </label>
            <input
              id="company"
              type="text"
              defaultValue=""
              placeholder="Nom de votre PME"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="self-start px-5 py-2 text-sm"
          >
            Enregistrer
          </Button>
        </form>
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Choisissez ce que vous voulez recevoir."
      >
        <div>
          {notifications.map((notification) => (
            <ToggleRow
              key={notification.id}
              label={notification.label}
              description={notification.description}
              checked={notification.checked}
              onChange={() => handleToggleNotification(notification.id)}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Sécurité"
        description="Gérez le mot de passe de votre compte."
      >
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Mot de passe actuel
            </label>
            <input
              id="currentPassword"
              type="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Nouveau mot de passe
            </label>
            <input
              id="newPassword"
              type="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="outline"
            className="self-start px-5 py-2 text-sm"
          >
            Mettre à jour le mot de passe
          </Button>
        </form>
      </SettingsSection>
    </div>
  );
}
