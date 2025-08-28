import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { CONFIG } from "@/lib/config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const supabase: SupabaseClient = createClient(
  CONFIG.supabaseUrl ?? "",
  CONFIG.supabaseAnonKey ?? "",
);
