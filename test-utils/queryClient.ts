import { QueryClient } from "@tanstack/react-query";

// No retries, and no garbage-collection timers that would keep the Jest worker alive after the tests.
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { gcTime: Infinity },
    },
  });
