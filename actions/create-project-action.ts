"use server";

import { revalidatePath } from "next/cache";
import { createProject } from "@/lib/database";

export async function createProjectAction(
  formData: FormData
) {
  const name = formData.get("name") as string;
  const status = formData.get("status") as string;

  await createProject(
    name,
    status
  );

  revalidatePath("/");
}