"use server";

import { revalidatePath } from "next/cache";
import { updateProjectStatus } from "@/lib/database";

export async function updateProjectStatusAction(
  projectId: number,
  formData: FormData
) {
  const status = formData.get("status") as string;

  await updateProjectStatus(
    projectId,
    status
  );

  revalidatePath("/");
}