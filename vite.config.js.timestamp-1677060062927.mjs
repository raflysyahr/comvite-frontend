// vite.config.js
import { defineConfig } from "file:///home/majorsky/Documents/komvite/node_modules/vite/dist/node/index.js";
import react from "file:///home/majorsky/Documents/komvite/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///home/majorsky/Documents/komvite/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      includeAssets: ["**/*.{svg,png,jpg,css,html,js}"],
      workbox: {
        globPatterns: ["**/*.{svg,png,jpg,css,html,js}", "src/assets/*.{svg,png,jpg,css,html,js}"],
        globIgnores: ["**/node_modules/**/*"]
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
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tYWpvcnNreS9Eb2N1bWVudHMva29tdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWFqb3Jza3kvRG9jdW1lbnRzL2tvbXZpdGUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWFqb3Jza3kvRG9jdW1lbnRzL2tvbXZpdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgVml0ZVBXQSh7XG4gICAgICBzdHJhdGVnaWVzOiBcImluamVjdE1hbmlmZXN0XCIsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJyoqLyoue3N2ZyxwbmcsanBnLGNzcyxodG1sLGpzfSddLFxuICAgICAgd29ya2JveDp7XG4gICAgICAgIGdsb2JQYXR0ZXJuczpbXCIqKi8qLntzdmcscG5nLGpwZyxjc3MsaHRtbCxqc31cIixcInNyYy9hc3NldHMvKi57c3ZnLHBuZyxqcGcsY3NzLGh0bWwsanN9XCJdLFxuICAgICAgICBnbG9iSWdub3JlczpbXCIqKlxcL25vZGVfbW9kdWxlc1xcLyoqXFwvKlwiXVxuICAgICAgfSxcbiAgICAgIHNyY0RpcjogXCJzcmMvc2VydmljZS13b3JrZXJcIixcbiAgICAgIGZpbGVuYW1lOiBcInN3LmpzXCIsXG4gICAgICBpbmplY3RSZWdpc3RlcjogZmFsc2UsXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgc2NvcGU6IFwiL1wiLFxuICAgICAgICBuYW1lOiBcIkNvbXZpdGUgSW5kb25lc2lhXCIsXG4gICAgICAgIHNob3J0X25hbWU6IFwiQ29tdml0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJXZWIgQXBwbGljYXRpb24gQ29taWMgYmVyYmFoYXNhIGluZG9uZXNpYVwiLFxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcInB3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1IsU0FBUyxvQkFBb0I7QUFDL1MsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixlQUFlLENBQUMsZ0NBQWdDO0FBQUEsTUFDaEQsU0FBUTtBQUFBLFFBQ04sY0FBYSxDQUFDLGtDQUFpQyx3Q0FBd0M7QUFBQSxRQUN2RixhQUFZLENBQUMsc0JBQXlCO0FBQUEsTUFDeEM7QUFBQSxNQUNBLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
