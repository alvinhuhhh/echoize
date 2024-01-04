import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <form action="/auth/logout" method="post">
        <Button>Logout</Button>
      </form>
    </main>
  );
}
