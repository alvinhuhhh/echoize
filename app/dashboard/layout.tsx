import React from "react";

import { cookies } from "next/headers";
import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "@/lib/supabase";
import Navbar from "@/app/ui/navbar";
import { getUserInfo } from "@/lib/actions";
import { UserInfo } from "@/lib/definitions";

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

  let user: (User & UserInfo) | undefined = undefined;
  const userInfo = await getUserInfo(session.user.id);
  if (userInfo) {
    user = {
      ...session.user,
      user_id: session.user.id,
      display_name: userInfo.display_name ?? "Unknown",
    };
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="flex justify-center items-center p-8">{children}</div>
    </main>
  );
}
