import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/layout/MainContainer";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Chargement différé des pages secondaires.
//
// Dashboard et Analyses tirent `recharts` (392 ko bruts, 112 ko gzip — le plus
// gros morceau du bundle). Importées statiquement, elles le plaçaient dans le
// graphe initial : le visiteur de la landing page téléchargeait tout le moteur
// de graphiques avant de voir la première section, pour des pages qu'il
// n'ouvrira peut-être jamais. Le parcours réel du produit (landing → compte →
// Documents → Chat) reste en import direct, sans attente.
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analyses = lazy(() => import("./pages/Analyses"));
const Agents = lazy(() => import("./pages/Agents"));
const Integrations = lazy(() => import("./pages/Integrations"));
const Settings = lazy(() => import("./pages/Settings"));

function PageLoader() {
  return <p className="px-1 py-6 text-sm text-slate-400">Chargement…</p>;
}

function App() {
  return (
    <BrowserRouter>
      {/* Une seule frontière Suspense : les pages différées partagent le même
          indicateur de chargement, affiché dans la zone de contenu. */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/app/"
            element={
              <ProtectedRoute>
                <MainContainer title="Dashboard">
                  <Dashboard />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/Chat"
            element={
              <ProtectedRoute>
                <MainContainer title="Chat">
                  <Chat />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/Documents"
            element={
              <ProtectedRoute>
                <MainContainer title="Documents">
                  <Documents />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/Analyses"
            element={
              <ProtectedRoute>
                <MainContainer title="Analyses">
                  <Analyses />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/Agents"
            element={
              <ProtectedRoute>
                <MainContainer title="Agents">
                  <Agents />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/app/Integrations"
            element={
              <ProtectedRoute>
                <MainContainer title="Integrations">
                  <Integrations />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/Settings"
            element={
              <ProtectedRoute>
                <MainContainer title="Settings">
                  <Settings />
                </MainContainer>
              </ProtectedRoute>
            }
          />
          {/* Toute URL inconnue retombe sur la landing page plutôt que sur un
              écran blanc sans explication. */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
