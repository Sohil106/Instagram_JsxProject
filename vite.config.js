import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.2.231", // Allow access from any IP address on the local network
    port: 3000, // Specify the port number (optional, default is 5173)
  },
});
