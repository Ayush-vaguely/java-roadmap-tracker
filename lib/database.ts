import { supabase } from "./supabase";

export async function getPhasesCount() {
  const { count, error } = await supabase
    .from("phases")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(error);
    return 0;
  }

  return count ?? 0;
}