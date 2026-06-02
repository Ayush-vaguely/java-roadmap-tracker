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
    .select("id, name, status, notes, deadline")
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
export async function getCompletedTopicsCount() {
  const { count, error } = await supabase
    .from("topics")
    .select("*", { count: "exact", head: true })
    .eq("status", "Completed");

  if (error) {
    console.error(error);
    return 0;
  }

  return count ?? 0;
}
export async function getProgressPercentage() {
  const totalTopics = await getTopicsCount();
  const completedTopics = await getCompletedTopicsCount();

  if (totalTopics === 0) {
    return 0;
  }

  return Math.round(
    (completedTopics / totalTopics) * 100
  );
}
export async function saveTopicNotes(
  topicId: number,
  notes: string
) {
  const { error } = await supabase
    .from("topics")
    .update({ notes })
    .eq("id", topicId);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
export async function getModulesWithTopics() {
  const { data, error } = await supabase
    .from("modules")
    .select(`
      id,
      name,
      topics (
        id,
        name,
        status,
        notes
      )
    `)
    .order("module_order");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
export async function saveTopicDeadline(
  topicId: number,
  deadline: string
) {
  const { error } = await supabase
    .from("topics")
    .update({ deadline })
    .eq("id", topicId);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
export async function getOverdueTopicsCount() {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const { count, error } = await supabase
    .from("topics")
    .select("*", {
      count: "exact",
      head: true,
    })
    .lt("deadline", today)
    .neq("status", "Completed");

  if (error) {
    console.error(error);
    return 0;
  }

  return count ?? 0;
}
export async function getUpcomingDeadlines() {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const { data, error } = await supabase
    .from("topics")
    .select("id, name, deadline")
    .gte("deadline", today)
    .order("deadline")
    .limit(5);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}