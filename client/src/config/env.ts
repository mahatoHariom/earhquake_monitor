interface Env {
  apiBaseUrl: string;
}

export const env: Env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:9797/api",
} as const;
