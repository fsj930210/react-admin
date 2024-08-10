import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import postcssNesting from 'postcss-nesting';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';

import pages from './vite-plugins/vite-plugin-react-file-router';
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const envConfig = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      // gz包
      {
        ...viteCompression(),
        apply: 'build',
      },
      // 分析生成包的大小
      visualizer({
        open: true,
      }),
      UnoCSS(),
      pages({
        useIndexAsRoot: true,
        excludeRoutesFromRootRoute: ['login'],
        layoutComponentName: 'Layout',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    base: envConfig.VITE_PUBLIC_PATH,
    server: {
      port: Number(envConfig.VITE_APP_PORT),
      proxy: {
        '/api': {
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
