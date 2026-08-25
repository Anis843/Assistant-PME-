import { useEffect, useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { listDocuments, uploadDocument } from "../lib/api";
import { getToken } from "../lib/auth";

const STATUS_LABEL = {
  uploaded: "Importé",
  processing: "Traitement…",
  indexed: "Indexé",
  error: "Erreur",
};

const STATUS_COLOR = {
  uploaded: "violet",
  processing: "violet",
  indexed: "teal",
  error: "orange",
};

function formatDate(isoString) {
  return new Date(isoString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    listDocuments(getToken())
      .then((data) => {
        if (ignore) return;
        setDocuments(data);
        setError(null);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // L'indexation tourne en tâche de fond côté serveur : la réponse à l'upload
  // arrive alors que le document est encore au statut « Importé ». Sans ce
  // sondage, le passage à « Indexé » n'apparaît qu'après un rechargement manuel
  // de la page — l'utilisateur croit que rien ne se passe.
  const hasPendingDocument = documents.some(
    (doc) => doc.status === "uploaded" || doc.status === "processing",
  );

  useEffect(() => {
    if (!hasPendingDocument) return;

    const interval = setInterval(() => {
      listDocuments(getToken())
        .then(setDocuments)
        .catch(() => {
          // Échec ponctuel du sondage : le prochain tour réessaiera.
        });
    }, 2000);

    // S'arrête dès qu'aucun document n'est en attente, et au démontage de la page.
    return () => clearInterval(interval);
  }, [hasPendingDocument]);

  async function refreshDocuments() {
    const data = await listDocuments(getToken());
    setDocuments(data);
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      await uploadDocument(file, getToken());
      await refreshDocuments();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Documents</h1>
          <p className="text-sm text-slate-400">
            Importez vos fichiers PDF pour les rendre exploitables par vos agents.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          icon={Upload}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Import en cours…" : "Importer un PDF"}
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-sm text-orange-300">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-800 bg-slate-900/50">
        {loading ? (
          <p className="px-4 py-6 text-sm text-slate-400">Chargement…</p>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <FileText className="h-8 w-8 text-slate-600" aria-hidden="true" />
            <p className="text-sm text-slate-400">Aucun document importé pour le moment.</p>
          </div>
        ) : (
          // La date passe à la ligne sous le nom sur petit écran : trois
          // colonnes ne tiennent pas, et c'est le statut qu'on vient consulter.
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Importé le</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-4 py-3 text-slate-200">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                      <span className="break-all">{doc.original_name}</span>
                    </div>
                    <span className="mt-1 block text-xs text-slate-500 sm:hidden">
                      {formatDate(doc.uploaded_at)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="label" color={STATUS_COLOR[doc.status]}>
                      {STATUS_LABEL[doc.status]}
                    </Badge>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">
                    {formatDate(doc.uploaded_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
