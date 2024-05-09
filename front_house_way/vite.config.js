import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  // build: {
  //   outDir: ".", // Spécifie le répertoire de sortie du build
  //   assetsDir: ".", // Spécifie le répertoire des assets (fichiers statiques)
  // },
  plugins: [react()],
});
