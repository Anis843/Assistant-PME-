import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import DashboardPreview from "../components/landing/DashboardPreview";
import FeaturesSection from "../components/landing/FeaturesSection";
import Button from "../components/ui/Button";

// Les sections « Démo interactive », « Intégrations » et « Tarifs » ont été
// retirées : elles présentaient des agents, des connecteurs et des offres
// d'abonnement qui n'existent pas. Une page courte et exacte convertit mieux
// qu'une page longue qu'un prospect peut prendre en défaut.
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <FeaturesSection />

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/40 px-8 py-14 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Essayez sur vos propres documents
          </h2>
          <p className="mt-4 text-slate-400">
            Créez un compte, importez un PDF, posez votre première question.
            Quelques minutes suffisent pour juger sur pièces.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/Register">
              <Button variant="primary">Créer un compte →</Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Projet développé par Anis Ouaret — déploiement sur mesure possible.
          </p>
        </div>
      </section>
    </div>
  );
}
