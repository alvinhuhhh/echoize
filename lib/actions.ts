"use server";

import { z } from "zod";
import { headers, cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import { Database } from "@/lib/supabase";
import { getHttpOrHttps } from "./utils";

export type SigninState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signin(prevState: SigninState, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid credentials. Please fill in all required fields.",
    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  redirect("/dashboard");
}

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
  const headersList = headers();
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Please fill in all required fields.",
    };
  }

  const { email, password, displayName } = validatedFields.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getHttpOrHttps()}${headersList.get(
        "host"
      )}/auth/callback`,
    },
  });

  // If Supabase Auth signup fails, return with error message
  if (error) {
    return {
      errors: {},
      message: error.message,
    };
  }

  // Insert additional info into user_infos table
  if (data.user) {
    await supabase.from("user_infos").insert({
      user_id: data.user.id,
      created_at: new Date().toUTCString(),
      display_name: displayName,
    });
  }

  redirect("/dashboard");
}

export async function getUserInfo(user_id: string) {
  const cookieStore = cookies();
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
    .from("user_infos")
    .select()
    .eq("user_id", user_id)
    .single();

  if (error) {
    return null;
  }

  return data;
}
