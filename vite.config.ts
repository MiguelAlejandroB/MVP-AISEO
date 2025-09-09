// vite.config.js
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()], 

    // La propiedad 'base' debe coincidir EXACTAMENTE con el nombre de tu repositorio
    base: '/MVP-AISEO/', // <-- ¡CORREGIDO! 

    // --- Tu configuración original (la mantenemos) ---
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
