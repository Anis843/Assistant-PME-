import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

/**
 * MainContainer
 * Layout racine de l'app dashboard : Sidebar à gauche, Header en haut,
 * contenu de la page scrollable en dessous.
 *
 * Sur mobile, la Sidebar devient un tiroir : son état est porté ici, seul
 * ancêtre commun du bouton d'ouverture (dans le Header) et du tiroir lui-même.
 *
 * Usage (dans chaque page) :
 *   <MainContainer title="Tableau de bord">
 *     <DashboardPage />
 *   </MainContainer>
 *
 * Props:
 * - title: string        -> passé au Header (titre de la page courante)
 * - actions: ReactNode   -> passé au Header (boutons d'action à droite)
 * - children: ReactNode  -> contenu de la page
 */
export default function MainContainer({ title, actions, children }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          title={title}
          actions={actions}
          onMenuClick={() => setNavOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
