module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // react17以后react组件可以不引用react
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended' // prettier插件
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '.prettierrc.cjs',
    'vite.config.ts',
    '.commitlintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  parserOptions: { project: ['./tsconfig.json'] },
  settings: {
    // 消除控制台警告Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration .
    react: {
      version: 'detect'
    }
  },
  rules: {
    semi: 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
