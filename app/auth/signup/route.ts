import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import type { Database } from "@/lib/supabase";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      displayName: z.string().optional(),
    })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      displayName: formData.get("displayName"),
    });

  if (parsedCredentials.success) {
    const { email, password, displayName } = parsedCredentials.data;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });

    if (error) {
    }

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

    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    });
  }
}
