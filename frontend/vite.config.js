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
        // d'afficher quoi que ce soit. Isoler les grosses dépendances stables
        // permet de les mettre en cache une fois pour toutes — elles ne
        // changent pas quand on redéploie du code applicatif.
        //
        // Vite 8 s'appuie sur rolldown, qui attend une fonction ici (la forme
        // objet de Rollup est refusée au build).
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
          if (/[\\/]node_modules[\\/]react(-dom|-router-dom|-router)?[\\/]/.test(id)) {
            return "react";
          }
        },
      },
    },
  },
});
