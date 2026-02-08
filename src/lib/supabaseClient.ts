import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env
  .VITE_SUPABASE_ANON_KEY as string | undefined;

const createMockSupabase = () =>
  ({
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => undefined } },
        error: null,
      }),
      signUp: async () => ({
        data: null,
        error: new Error("Supabase is not configured."),
      }),
      signInWithPassword: async () => ({
        data: null,
        error: new Error("Supabase is not configured."),
      }),
      signInWithOtp: async () => ({
        data: null,
        error: new Error("Supabase is not configured."),
      }),
      verifyOtp: async () => ({
        data: null,
        error: new Error("Supabase is not configured."),
      }),
      signOut: async () => ({
        error: new Error("Supabase is not configured."),
      }),
    },
  }) as ReturnType<typeof createClient>;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars are missing.");
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockSupabase();
