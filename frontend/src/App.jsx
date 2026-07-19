import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/layout/MainContainer";
import DashboardPage from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Analyses from "./pages/Analyses";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Agents from "./pages/Agents";
import LandingPage from "./pages/LandingPage";
import Integrations from "./pages/Integrations";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/Dashboard"
          element={
            <MainContainer title="Dashboard">
              <DashboardPage />
            </MainContainer>
          }
        />
        <Route
          path="/Chat"
          element={
            <MainContainer title="Chat">
              <Chat />
            </MainContainer>
          }
        />
        <Route
          path="/Analyses"
          element={
            <MainContainer title="Analyses">
              <Analyses />
            </MainContainer>
          }
        />
        <Route
          path="/Agents"
          element={
            <MainContainer title="Agents">
              <Agents />
            </MainContainer>
          }
        />
        <Route
          path="/Login"
          element={
            <MainContainer title="Login">
              <Login />
            </MainContainer>
          }
        />
        <Route
          path="/Integrations"
          element={
            <MainContainer title="Integrations">
              <Integrations />
            </MainContainer>
          }
        />
        <Route
          path="/Settings"
          element={
            <MainContainer title="Settings">
              <Settings />
            </MainContainer>
          }
        />
        {/* etc. pour /analyses, /agents, /integrations, /parametres */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
