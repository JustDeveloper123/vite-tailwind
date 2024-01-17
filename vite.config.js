import autoprefixer from 'autoprefixer';
import { resolve } from 'path'; // project paths
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite'; // config for custom vite properties
import injectHTML from 'vite-plugin-html-inject'; // insert separate parts of HTML
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/vite-tailwind-js/', // name of the github repo for deployment

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

    // Script to create a folder with .webp images if we need (optional)
    // for this we need to write the following command:
    // npm i -D imagemin imagemin-webp
    // then import these packages into our vite config
    // {
    //   ...imagemin(
    //     ['./public/**/*.{jpg,png,jpeg}'], // images for the webp folder
    //     {
    //       destination: './public/img/webp/', // custom output path
    //       plugins: [imageminWebp({ quality: 70 })],
    //     },
    //   ),
    //   apply: 'serve',
    // },
  ],

  css: {
    postcss: {
      plugins: [autoprefixer(), tailwindcss()],
    },
  },

  //# Aliases
  resolve: {
    alias: {
      '@': './src',
      '@styles': './src/styles',
      '@modules': './src/modules',
      '@scripts': './src/scripts',
      '@templates': './src/templates',
    },
  },

  //# Production
  build: {
    rollupOptions: {
      input: {
        // Production paths
        main: resolve(__dirname, 'index.html'),
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
