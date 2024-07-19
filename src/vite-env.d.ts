/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_BASE_API_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
