import { supabaseServer } from "../lib/supabase/server";

async function main() {
  console.log("Checking if platform_events table exists...");
  try {
    const { data, error } = await supabaseServer
      .from("platform_events")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Error from Supabase:", error);
    } else {
      console.log("Table exists! Row count limit 1:", data);
    }
  } catch (err) {
    console.error("Catch error:", err);
  }
}

main();
