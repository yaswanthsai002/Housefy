/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@pages": path.resolve(__dirname, "src/pages"),
      // '@assets': path.resolve(__dirname, 'public/assets'),
      // '@images': path.resolve(__dirname, 'public/images/'),
      // '@icons': path.resolve(__dirname, 'public/icons/'),
    },
  },
});
