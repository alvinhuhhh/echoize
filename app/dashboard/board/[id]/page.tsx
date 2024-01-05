import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board",
};

export default async function BoardPage() {
  return (
    <main>
      <h1>This is a board page</h1>
    </main>
  );
}
