import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import sitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => {
  // ✅ Load env safely
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),

      babel({
        presets: [reactCompilerPreset()],
      }),

      // ✅ Sitemap plugin
      sitemap({
        hostname: "https://velsaka-tech.vercel.app",
        dynamicRoutes: ["/"],
      }),
    ],

    server: {
      port: 5173,

      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:5000",

          changeOrigin: true,
          secure: true,

          configure: (proxy) => {
            proxy.on("error", (err) => {
              console.log("❌ Proxy error:", err.message);
            });

            proxy.on("proxyReq", (proxyReq, req) => {
              console.log("➡️ Request:", req.method, req.url);
            });

            proxy.on("proxyRes", (proxyRes, req) => {
              console.log("⬅️ Response:", proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },

    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "terser",
    },
  };
});
