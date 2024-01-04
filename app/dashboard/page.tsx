import { H1, H2, H3, H4 } from "@/components/ui/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <main>
      <H2>Boards</H2>
    </main>
  );
}
