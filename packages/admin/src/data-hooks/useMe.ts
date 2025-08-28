import { useQuery } from "@tanstack/react-query";
import { fetchers } from "@/lib/fetchers";
import type { MeResponse } from "@/types";

export const useMe = () => {
  const result = useQuery<MeResponse | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const data = await fetchers.me();
        return data;
      } catch {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    meta: {
      errorToast: false,
    },
  });

  return result;
};
