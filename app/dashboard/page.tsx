import { Metadata } from "next";
import { Button } from "@/components/ui/button";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to login page if not logged in
    redirect("/login");
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <form action="/auth/logout" method="post">
        <Button>Logout</Button>
      </form>
    </main>
  );
}
