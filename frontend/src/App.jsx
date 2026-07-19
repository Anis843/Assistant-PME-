import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/layout/MainContainer";
import DashboardPage from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Document from "./pages/Document";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
          path="/Document"
          element={
            <MainContainer title="Document">
              <Document />
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
