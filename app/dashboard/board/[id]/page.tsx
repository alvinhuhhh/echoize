import PostComponent from "@/app/ui/posts/post";
import { H2, Muted } from "@/components/ui/typography";
import { getBoardById, getPostsForBoardId } from "@/lib/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Board",
};

export default async function BoardPage({
  params,
}: {
  params: { id: string };
}) {
  const board_id = params.id;
  const board = await getBoardById(board_id);

  if (!board) {
    notFound();
  }

  const posts = await getPostsForBoardId(board_id);

  return (
    <main className="max-w-[960px] w-screen">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <H2>{board.name}</H2>
          <Muted className="mt-1">{posts?.length} Posts</Muted>
        </div>
      </div>
      <div className="flex flex-col mt-6 space-y-4">
        {posts?.length ? (
          posts.map((post) => <PostComponent post={post} />)
        ) : (
          <Muted>No posts found.</Muted>
        )}
      </div>
    </main>
  );
}
