import { H2 } from "@/components/ui/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  return (
    <main className="max-w-[960px] w-screen">
      <div className="flex justify-between">
        <H2>Settings</H2>
      </div>
    </main>
  );
}
