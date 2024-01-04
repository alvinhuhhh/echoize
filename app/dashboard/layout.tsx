import { H1 } from "@/components/ui/typography";
import React from "react";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "@/lib/supabase";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to login page if not logged in
    redirect("/login");
  }
  return (
    <div>
      <H1>Navbar</H1>
      {children}
    </div>
  );
}
