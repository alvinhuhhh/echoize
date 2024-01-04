import React from "react";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "@/lib/supabase";
import Navbar from "../ui/navbar";

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
    <main>
      <Navbar />
      <div className="p-8">{children}</div>
    </main>
  );
}
