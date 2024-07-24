import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xszmofveuqthudzkhkmx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzem1vZnZldXF0aHVkemtoa214Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjEzMDAyOSwiZXhwIjoyMDMxNzA2MDI5fQ.QVZ4R4l9nGMvLzw0DSFTL3U29JK8k_jghpbFVA9nv5o"
// const supabaseUrl = (process.env.NODE_ENV as any).NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = (process.env.NODE_ENV as any).NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
