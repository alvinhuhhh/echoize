"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
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
import { deleteBoard } from "@/lib/actions";
import { Board } from "@/lib/definitions";
import { Check, FileCog, Link, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BoardComponent({
  board,
  postCount,
}: {
  board: Board;
  postCount: number;
}) {
  const [linkCopied, setLinkCopied] = useState(false);
  const router = useRouter();

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

  function editBoard() {
    router.push(`/dashboard/edit/${board.id}`);
  }

  const deleteBoardWithId = deleteBoard.bind(null, board.id);

  return (
    <Card>
      <CardHeader>
        <H3>{board.name}</H3>
      </CardHeader>
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

            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={editBoard}>
                    <FileCog className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4 text-red-500" />
                      <span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    This action cannot be undone.
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    All posts and data related to this Board will be deleted.
                    Confirm to delete all data related to this Board.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>
                    <form action={deleteBoardWithId}>
                      <button type="submit">Confirm</button>
                    </form>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
