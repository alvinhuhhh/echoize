import { Button } from "@/components/ui/button";
import { H2, Muted } from "@/components/ui/typography";
import BoardComponent from "@/app/ui/boards/board";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { getBoards, getPostCountPerBoard } from "@/lib/actions";
import { Board } from "@/lib/definitions";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const boards = await getBoards();
  const postsPerBoard = await getPostCountPerBoard();

  return (
    <main className="max-w-[960px] w-screen">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <H2>Boards</H2>
          <Muted className="mt-1">{boards?.length} Boards</Muted>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">
            <Plus className="mr-2 h-4 w-4" />
            New Board
          </Link>
        </Button>
      </div>
      <div className="flex flex-col mt-6 space-y-4">
        {boards?.length ? (
          boards.map((board: Board) => (
            <BoardComponent
              key={board.id}
              board={board}
              postCount={
                postsPerBoard?.find((ppb) => ppb.board_id === board.id)
                  .post_count ?? 0
              }
            />
          ))
        ) : (
          <Muted>No boards found. Create one?</Muted>
        )}
      </div>
    </main>
  );
}
