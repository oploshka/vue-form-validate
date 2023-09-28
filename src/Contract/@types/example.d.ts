interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_API: string;
  readonly VITE_BASE_SOCKET_PATH: string;
  readonly VITE_BASE_SOCKET_NSP: string;
  readonly VITE_MOCK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}