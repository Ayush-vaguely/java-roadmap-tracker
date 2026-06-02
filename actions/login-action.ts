"use server";

import { supabaseAuth } from "@/lib/auth";

export async function loginAction(
  formData: FormData
) {
  const email =
    formData.get("email") as string;

  const password =
    formData.get("password") as string;

  const { data, error } =
    await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

  console.log("LOGIN DATA:", data);
  console.log("LOGIN ERROR:", error);
}