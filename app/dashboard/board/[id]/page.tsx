import { getPostsForBoardId } from "@/lib/actions";
import { Post } from "@/lib/definitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board",
};

export default async function BoardPage({
  params,
}: {
  params: { id: string };
}) {
  const board_id = params.id;
  const posts: Post[] | null = await getPostsForBoardId(board_id);

  console.log(posts);

  return (
    <main>
      <h1>This is a board page</h1>
      {posts?.length && posts.map((post) => <h1>{post.title}</h1>)}
    </main>
  );
}
