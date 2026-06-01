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

export async function getTopicsCount() {
  const { count, error } = await supabase
    .from("topics")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(error);
    return 0;
  }

  return count ?? 0;
}

export async function getTopics() {
  const { data, error } = await supabase
    .from("topics")
    .select("id, name, status")
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
export async function completeTopic(topicId: number) {
  const { error } = await supabase
    .from("topics")
    .update({
      status: "Completed",
    })
    .eq("id", topicId);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}