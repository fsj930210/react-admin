import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
// import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginEslintImport from 'eslint-plugin-import';
import pluginEslintPrettier from 'eslint-plugin-prettier/recommended';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flatCompat = new FlatCompat({
  baseDirectory: __dirname, // 可选；默认值： process.cwd()
  resolvePluginsRelativeTo: __dirname, // 可选
  recommendedConfig: pluginJs.configs.recommended, // 默认使用 "eslint:recommended"
});

export default [
  {
    ignores: ['.idea', '.vscode', '**/dist/'],
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: { ...globals.node, ...globals.es2022, ...globals.browser },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      import: pluginEslintImport,
      'react-hooks': pluginReactHooks,
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  pluginEslintPrettier,
  // ...fixupConfigRules(pluginReactConfig),
  // 因为v9变化较大，为了兼容之前的 config，官方提供了转换整个旧的 config 的方法
  ...fixupConfigRules(
    flatCompat.config({
      extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
      plugins: ['react', 'react-refresh'],
    }),
  ),
  {
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      //import导入顺序规则
      'import/order': [
        'error',
        {
          //按照分组顺序进行排序
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'internal', 'object', 'type'],
          //通过路径自定义分组
          pathGroups: [
            {
              pattern: 'react*', //对含react的包进行匹配
              group: 'builtin', //将其定义为builtin模块
              position: 'before', //定义在builtin模块中的优先级
            },
            {
              pattern: '@/components/**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '@/utils/**',
              group: 'parent',
              position: 'after',
            },
            {
              pattern: '@/services/**',
              group: 'parent',
              position: 'after',
            },
          ],
          //将react包不进行排序，并放在前排，可以保证react包放在第一行
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always', //每个分组之间换行
          //根据字母顺序对每个组内的顺序进行排序
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
