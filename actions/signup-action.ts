"use server";

import { supabaseAuth } from "@/lib/auth";

export async function signupAction(
  formData: FormData
) {
  const email =
    formData.get("email") as string;

  const password =
    formData.get("password") as string;

  console.log("EMAIL:", email);

  const { data, error } =
    await supabaseAuth.auth.signUp({
      email,
      password,
    });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error(error);
  }
}