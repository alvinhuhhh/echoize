import { Button } from "@/components/ui/button";
import { H2 } from "@/components/ui/typography";
import Board from "@/app/ui/board";
import { Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <main className="max-w-[960px] w-screen">
      <div className="flex justify-between items-center">
        <H2>Boards</H2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Board
        </Button>
      </div>
      <div className="flex flex-col mt-6 space-y-4">
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
    </main>
  );
}
