import path from "path";

import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      sentryVitePlugin({
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        org: env.VITE_SENTRY_ORG,
        project: env.VITE_SENTRY_PROJECT,
        sourcemaps: {
          filesToDeleteAfterUpload: ["dist/assets/**/*.js.map"],
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL_DEV,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
