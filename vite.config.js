import autoprefixer from 'autoprefixer';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(() => {
  return {
    envPrefix: 'APP_',

    //# Aliases
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': resolve(__dirname, './src'),
        '@styles': resolve(__dirname, './src/styles'),
        '@modules': resolve(__dirname, './src/modules'),
        '@scripts': resolve(__dirname, './src/scripts'),
        '@templates': resolve(__dirname, './src/templates'),
      },
    },

    //# Production
    build: {
      base: '/vite-tailwind/', // name of the github repo for deployment to github actions
      outDir: 'build',
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
      // for this we need to run the following command:
      // npm install imagemin imagemin-webp
      // then import these packages into our vite config like here below
      // just delete it if you do not need it
      {
        ...imagemin(
          ['./public/**/*.{jpg,png,jpeg}'], // images for the webp folder
          {
            destination: './public/img/webp/', // custom output path
            plugins: [imageminWebp({ quality: 70 })],
          },
        ),
        apply: 'serve',
      },
    ],

    css: {
      postcss: {
        plugins: [autoprefixer(), tailwindcss()],
      },
    },
  };
});
