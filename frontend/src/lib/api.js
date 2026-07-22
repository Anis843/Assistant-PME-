// URL du backend — en dev, ton serveur uvicorn tourne sur localhost:8000.
// En prod, définis VITE_API_URL dans un .env du frontend.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * apiFetch
 * Wrapper autour de fetch qui préfixe l'URL du backend et gère le JSON.
 * Lève une erreur avec le message du backend si la requête échoue.
 */
async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.detail || "Une erreur est survenue.");
  }

  return data;
}

export function login({ email, password }) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register({ email, password, fullName, companyName }) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
      company_name: companyName,
    }),
  });
}

export function getMe(token) {
  return apiFetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
/**
 * uploadDocument
 * Upload d'un fichier PDF. Nécessite un FormData (pas de JSON.stringify),
 * et surtout PAS de Content-Type manuel — le navigateur doit définir
 * le boundary multipart lui-même.
 */
export async function uploadDocument(file, token) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // pas de Content-Type ici, volontairement
    },
    body: formData,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data?.detail || "Une erreur est survenue lors de l'upload.",
    );
  }

  return data;
}

/**
 * listDocuments
 * Récupère la liste des documents de l'utilisateur connecté.
 */
export function listDocuments(token) {
  return apiFetch("/api/documents/", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * sendChatMessage
 * Envoie une question au backend et récupère la réponse générée par le LLM
 * ainsi que les sources (passages de documents) utilisées.
 * Retourne { answer, sources }.
 */
export function sendChatMessage({ question, documentId = null }, token) {
  return apiFetch("/api/chat", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ question, document_id: documentId }),
  });
}
