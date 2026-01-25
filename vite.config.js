import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  VitePWA({
    registerType: "autoUpdate",
    devOptions: {
      enabled: true
    },
    manifest: {
      name: "My React Vite App",
      short_name: "ViteApp",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#0d6efd",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  })
  ],
})
