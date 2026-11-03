import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Sans découpage, tout part dans un seul fichier de plus de 500 ko :
        // le navigateur doit le télécharger et le parser en entier avant
        // d'afficher quoi que ce soit. Isoler react — gros et stable — permet
        // de le mettre en cache une fois pour toutes : il ne change pas quand
        // on redéploie du code applicatif.
        //
        // `recharts` n'est volontairement PAS listé ici. L'y forcer le plaçait
        // dans le graphe statique de l'entrée, donc en <link rel="modulepreload">
        // sur toutes les pages — y compris la landing page, qui n'affiche aucun
        // graphique. Laissé libre, il suit les imports dynamiques des pages qui
        // l'utilisent (Dashboard, Analyses) et n'est téléchargé qu'à leur
        // ouverture.
        //
        // Vite 8 s'appuie sur rolldown, qui attend une fonction ici (la forme
        // objet de Rollup est refusée au build).
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\/]node_modules[\/]react(-dom|-router-dom|-router)?[\/]/.test(id)) {
            return "react";
          }
        },
      },
    },
  },
});
