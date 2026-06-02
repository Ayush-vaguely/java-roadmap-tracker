"use server";

import { revalidatePath } from "next/cache";
import { saveTopicNotes } from "@/lib/database";

export async function saveNotesAction(
  topicId: number,
  formData: FormData
) {
  const notes = formData.get("notes") as string;

  await saveTopicNotes(topicId, notes);

  revalidatePath("/");
}