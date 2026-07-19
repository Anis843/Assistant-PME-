import Sidebar from "./Sidebar";
import Header from "./Header";

/**
 * MainContainer
 * Layout racine de l'app dashboard : Sidebar à gauche, Header en haut,
 * contenu de la page scrollable en dessous.
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
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} actions={actions} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
