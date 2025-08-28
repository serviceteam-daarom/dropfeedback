import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export const useMe = () => {
  const result = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
    retry: false,
    refetchOnWindowFocus: false,
    meta: {
      errorToast: false,
    },
  });

  return result;
};
