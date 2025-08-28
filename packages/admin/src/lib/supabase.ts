import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "@/lib/config";

export const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
