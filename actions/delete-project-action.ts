"use server";

import { revalidatePath } from "next/cache";
import { deleteProject } from "@/lib/database";

export async function deleteProjectAction(
  projectId: number
) {
  await deleteProject(projectId);

  revalidatePath("/");
}