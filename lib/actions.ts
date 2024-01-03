"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import { Database } from "@/lib/supabase";

export type SignupState = {
  errors?: {
    email?: string[];
    password?: string[];
    displayName?: string[];
  };
  message?: string | null;
};

const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().optional(),
});

export async function signup(prevState: SignupState, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to sign up!",
    };
  }

  const { email, password, displayName } = validatedFields.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.user) {
    const response = await supabase
      .from("user_infos")
      .insert({
        user_id: data.user.id,
        created_at: new Date().toUTCString(),
        display_name: displayName,
      })
      .select();
  }

  redirect("/login");
}
