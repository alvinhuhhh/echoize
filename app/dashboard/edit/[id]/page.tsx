import EditBoardForm from "@/app/ui/boards/edit-form";
import { H2 } from "@/components/ui/typography";
import { getBoardById } from "@/lib/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Board",
};

export default async function EditBoardPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const board = await getBoardById(id);

  if (!board) {
    notFound();
  }

  return (
    <main className="max-w-[960px] w-screen">
      <div className="flex justify-between">
        <H2>New Board</H2>
      </div>
      <div className="flex flex-col mt-6 space-y-4">
        <EditBoardForm board={board} />
      </div>
    </main>
  );
}
