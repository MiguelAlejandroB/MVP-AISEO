// vite.config.js
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // 1. IMPORTA EL PLUGIN DE REACT

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 2. AÑADE EL PLUGIN AQUÍ
    plugins: [react()], 

    // 3. AÑADE LA PROPIEDAD 'base' PARA GITHUB PAGES
    base: '/aeo-landing-page/', 

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
