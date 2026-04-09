/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Full origin of the API in production (no trailing slash), e.g. https://my-api.run.app — leave unset in local dev to use the Vite proxy */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
