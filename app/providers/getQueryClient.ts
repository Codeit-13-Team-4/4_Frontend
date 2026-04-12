import { isServer, MutationCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { getErrorMessage } from "@/shared/lib/errors/errorMessage";
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

      onError(error, _variables, _context, mutation) {
        if (error instanceof ApiError) {
          const metaMessage = mutation.meta?.errorMessage?.[error.status];

          if (error.status === 409) {
            if (metaMessage) toast.error(metaMessage);
            return;
          }

          toast.error(metaMessage ?? getErrorMessage(error.status));
          return;
        }

        toast.error("네트워크 오류가 발생했습니다.");
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
