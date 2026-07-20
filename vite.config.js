import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Maquette 100% front-end — aucun backend, aucune API.
export default defineConfig({
  base: '/hernam-demo/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Autorise l'accès via un tunnel ngrok (démo client à distance)
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.io'],
  },
})
