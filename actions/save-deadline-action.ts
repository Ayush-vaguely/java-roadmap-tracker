"use server";

import { revalidatePath } from "next/cache";
import { saveTopicDeadline } from "@/lib/database";

export async function saveDeadlineAction(
  topicId: number,
  formData: FormData
) {
  const deadline = formData.get("deadline") as string;

  await saveTopicDeadline(
    topicId,
    deadline
  );

  revalidatePath("/");
}