import { Navigate } from "react-router-dom";
import { getToken } from "../../lib/auth";

/**
 * ProtectedRoute
 * Redirige vers /login si aucun token n'est stocké.
 *
 * Usage dans App.jsx (à mettre autour de chaque route protégée) :
 *   <Route
 *     path="/"
 *     element={
 *       <ProtectedRoute>
 *         <MainContainer title="Tableau de bord">
 *           <DashboardPage />
 *         </MainContainer>
 *       </ProtectedRoute>
 *     }
 *   />
 *
 * Note : ceci vérifie seulement la PRÉSENCE d'un token, pas sa validité
 * (un token expiré passera ce garde-fou côté front). La vraie vérification
 * se fait côté backend à chaque appel API protégé (GET /api/auth/me, etc.),
 * qui renverra 401 si le token est invalide/expiré.
 */
export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
