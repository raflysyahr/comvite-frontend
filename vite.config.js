import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      includeAssets: ['**/*.{svg,png,jpg,css,html,js}'],
      workbox:{
        globPatterns:["**/*.{svg,png,jpg,css,html,js}","src/assets/*.{svg,png,jpg,css,html,js}"],
        globIgnores:["**\/node_modules\/**\/*"]
      },
      srcDir: "src/service-worker",
      filename: "sw.js",
      injectRegister: false,
      manifest: {
        display: "standalone",
        scope: "/",
        name: "Comvite Indonesia",
        short_name: "Comvite",
        description: "Web Application Comic berbahasa indonesia",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
