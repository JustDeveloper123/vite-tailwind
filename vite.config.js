import autoprefixer from "autoprefixer";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import { resolve } from "path"; // project paths
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite"; // config for custom vite properties
import injectHTML from "vite-plugin-html-inject"; // insert separate parts of HTML
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  base: "/vite-tailwind-js/", // name of the github repo for deployment

  //# Plugins
  plugins: [
    // Insert html parts
    injectHTML({
      debug: {
        logPath: true, // Debugging
      },
    }), // this plugin can have arguments

    // Image optimizer
    ViteImageOptimizer({
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
      jpg: {
        quality: 70,
      },
    }),

    // Script to create a folder with .webp images
    {
      ...imagemin(
        ["./src/img/**/*.{jpg,png,jpeg}"], // images for the webp folder
        {
          destination: "./src/img/webp/", // custom output path
          plugins: [imageminWebp({ quality: 70 })],
        },
      ),
      apply: "serve",
    },
  ],

  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },

  //# Production
  build: {
    rollupOptions: {
      input: {
        // Production paths
        main: resolve(__dirname, "index.html"),
      },
    },
  },

  //# Developer server
  server: {
    port: 3000,
    strictPort: false,
  },
  //# Production server
  preview: {
    port: 8080,
    strictPort: false,
  },
});
