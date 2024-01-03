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
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=invalid-credentials`,
        {
          status: 301,
        }
      );
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
      status: 301,
    });
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?error=invalid-credentials`,
    {
      status: 301,
    }
  );
}
