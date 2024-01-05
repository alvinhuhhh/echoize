"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@/lib/definitions";

export default function PostComponent({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader>{post.title}</CardHeader>
      <CardContent>{post.description}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
