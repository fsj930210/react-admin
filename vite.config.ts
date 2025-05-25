import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import postcssNesting from 'postcss-nesting';
import { visualizer } from 'rollup-plugin-visualizer';
// import UnoCSS from 'unocss/vite';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';

import reactIconify from './vite-plugins/vite-plugin-react-iconify';

import type { ConfigEnv, UserConfig } from 'vite';
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const envConfig = loadEnv(mode, root);
  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      reactIconify({
        resolver: '@iconify/react',
        configs: [
          {
            dir: resolve(__dirname, 'src/assets/icons'),
            monotone: false,
            prefix: 'ra-icon',
            provider: 'ra-icon',
          },
        ],
      }),
      // gz包
      {
        ...viteCompression(),
        apply: 'build',
      },
      // 分析生成包的大小
      visualizer({
        open: true,
      }),
      // UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    base: envConfig.VITE_PUBLIC_PATH,
    server: {
      port: Number(envConfig.VITE_APP_PORT),
      proxy: {
        '/react-admin-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
      postcss: {
        plugins: [postcssNesting],
      },
    },
    build: {
      cssCodeSplit: true,
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            lib: ['zustand'],
            antd: ['antd'],
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  });
};
