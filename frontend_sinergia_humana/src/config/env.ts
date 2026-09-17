export const env = {
  useMocks: (import.meta.env.VITE_USE_MOCKS ?? "true") === "true",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api",
  mockDelayMs: Number(import.meta.env.VITE_MOCK_DELAY_MS ?? 600),
} as const;
