import React from "react";
import PublicNavbar from "../ui/public-navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <PublicNavbar />
      <div className="flex justify-center items-center p-8">{children}</div>
    </main>
  );
}
