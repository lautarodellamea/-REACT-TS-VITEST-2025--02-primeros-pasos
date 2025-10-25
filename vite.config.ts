import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // configuracion del entorno de testing
  test: {
    // jsdom: Simula un navegador web para poder probar componentes de React (DOM, eventos, etc.)
    environment: "jsdom",

    // globals: true - hace que funciones como describe, test, expect estén disponibles globalmente sin necesidad de importarlas en cada archivo de test
    globals: true,
  },
});
