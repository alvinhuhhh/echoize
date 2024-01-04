import NewBoardForm from "@/app/ui/boards/new-form";
import { H2 } from "@/components/ui/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Board",
};

export default async function NewBoardPage() {
  return (
    <main className="max-w-[960px] w-screen">
      <div className="flex justify-between">
        <H2>New Board</H2>
      </div>
      <div className="flex flex-col mt-6 space-y-4">
        <NewBoardForm />
      </div>
    </main>
  );
}
