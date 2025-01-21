import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default defineConfig({
  server: {
    host: true, // Escucha en todas las interfaces
    port: 5173, // Asegura que el puerto esté correctamente configurado
  },
  plugins: [react()],
});