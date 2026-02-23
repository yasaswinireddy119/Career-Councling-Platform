import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.SUPABASE_URL && process.env.SUPABASE_URL !== "Secret value" 
  ? process.env.SUPABASE_URL 
  : "https://dummy-project.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY !== "Secret value"
  ? process.env.SUPABASE_SERVICE_ROLE_KEY
  : "dummy-key";

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch {
  console.warn("Supabase client could not be initialized, using mock.");
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [], error: null }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    }
  };
}

export default supabase;
