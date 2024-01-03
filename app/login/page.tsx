import { Metadata } from "next";
import { H2, Muted } from "@/components/ui/typography";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "@/lib/supabase";

import Link from "next/link";
import LoginForm from "../ui/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Redirect to dashboard page if already logged in
    redirect("/dashboard");
  }
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <H2 className="mb-2">Welcome to Echoize</H2>
      <Muted className="mb-8">
        Don&#39;t have an account?{" "}
        <Link className="text-blue-400 font-semibold" href="/">
          Create one!
        </Link>
      </Muted>
      <LoginForm />
    </main>
  );
}
