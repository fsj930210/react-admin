import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteEslint from 'vite-plugin-eslint';
import UnoCSS from 'unocss/vite';

const root = process.cwd();

function join(pathname: string) {
  return resolve(root, '.', pathname);
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join('src')
    }
  },
  plugins: [
    react(),
    viteEslint({
      failOnError: false
    }),
    UnoCSS(),
  ]
})
