import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase environment variables are not set.");
}

const db = createClient(supabaseUrl, supabaseKey);

export default db;
