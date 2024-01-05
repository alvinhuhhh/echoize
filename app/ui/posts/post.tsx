"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { H3, H4, Muted, P, Small } from "@/components/ui/typography";
import { Post } from "@/lib/definitions";
import { Triangle } from "lucide-react";

export default function PostComponent({ post }: { post: Post }) {
  const createdDate = new Date(post.created_at);
  const createdDateString = `${createdDate.toLocaleString()}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <div className="space-y-2">
            <H3>{post.title}</H3>
            <Small>{post.status}</Small>
          </div>
          <div className="flex gap-2"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-start w-full gap-4">
          <div className="flex flex-col justify-center items-center gap-2 w-12">
            <Triangle />
            <H4>{post.upvotes}</H4>
          </div>
          <div>
            <P>{post.description}</P>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end items-center w-full">
          <Muted suppressHydrationWarning>{createdDateString}</Muted>
        </div>
      </CardFooter>
    </Card>
  );
}
