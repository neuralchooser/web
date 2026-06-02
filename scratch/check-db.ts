import { supabaseServer } from "../lib/supabase/server";

async function main() {
  console.log("Checking if tool_submissions table exists...");
  try {
    const { data, error } = await supabaseServer
      .from("tool_submissions")
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
