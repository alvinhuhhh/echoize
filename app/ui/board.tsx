"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { H3, Muted, Small } from "@/components/ui/typography";
import { Board } from "@/lib/definitions";
import { Check, FileCog, Link, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";

export default function BoardComponent({
  board,
  postCount,
}: {
  board: Board;
  postCount: number;
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/public/${board.id}`
    );
    setLinkCopied(true);

    const timer = setTimeout(() => {
      setLinkCopied(false);
      clearTimeout(timer);
    }, 5000);
  }

  return (
    <Card>
      <CardHeader>
        <H3>{board.name}</H3>
      </CardHeader>
      {/* <CardContent></CardContent> */}
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <Muted>{postCount ?? 0} Posts</Muted>
          <div className="flex gap-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={copyLink}>
                    {linkCopied ? <Check /> : <Link />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {linkCopied ? (
                    <Small>Link copied!</Small>
                  ) : (
                    <Small>Copy link</Small>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <FileCog className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash className="mr-2 h-4 w-4 text-red-500" />
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
