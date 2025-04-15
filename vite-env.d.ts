/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_DEV: string;
  readonly VITE_API_URL_PROD: string;
  readonly VITE_USE_LOCAL_STORAGE: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ORG: string;
  readonly VITE_SENTRY_PROJECT: string;
  readonly VITE_SENTRY_AUTH_TOKEN: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
