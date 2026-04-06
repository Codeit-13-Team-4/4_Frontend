import { isServer, MutationCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/shared/lib/errors/ApiError";
import "@/shared/lib/query/queryMeta";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      },
    },

    mutationCache: new MutationCache({
      onSuccess(_data, _variables, _context, mutation) {
        const successMessage = mutation.meta?.successMessage;
        if (successMessage) {
          toast.success(successMessage);
        }
      },

      onError(error) {
        if (error instanceof ApiError && error.status === 409) return;
        const message =
          error instanceof ApiError ? error.message : "요청에 실패했습니다.";
        toast.error(message);
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
