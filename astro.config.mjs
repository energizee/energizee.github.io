import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://leeelder.dev",
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "file",
  },
});
