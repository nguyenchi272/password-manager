import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/9
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // proxy auth and accounts requests to backend dev server
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/accounts": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
