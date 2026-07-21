import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/layout/MainContainer";
import DashboardPage from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import Analyses from "./pages/Analyses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Agents from "./pages/Agents";
import LandingPage from "./pages/LandingPage";
import Integrations from "./pages/Integrations";
import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/app/"
          element={
            <ProtectedRoute>
              <MainContainer title="Dashboard">
                <DashboardPage />
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
        {/* etc. pour /analyses, /agents, /integrations, /parametres */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
