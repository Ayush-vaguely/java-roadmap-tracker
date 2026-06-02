"use server";

import { revalidatePath } from "next/cache";
import { completeTopic } from "@/lib/database";

export async function completeTopicAction(
  topicId: number
) {
  await completeTopic(topicId);

  revalidatePath("/");
}