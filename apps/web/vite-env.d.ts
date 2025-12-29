/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_DEV: string;
  readonly VITE_API_URL_PROD: string;
  readonly VITE_USE_LOCAL_STORAGE: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ORG: string;
  readonly VITE_SENTRY_PROJECT: string;
  readonly VITE_SENTRY_AUTH_TOKEN: string;
  readonly VITE_SECRET_KEY: string;
  readonly VITE_AMPLITUDE_API_KEY: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
