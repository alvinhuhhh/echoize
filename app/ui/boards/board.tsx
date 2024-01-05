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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { H3, Muted, Small } from "@/components/ui/typography";
import { deleteBoard } from "@/lib/actions";
import { Board } from "@/lib/definitions";
import {
  Clipboard,
  ExternalLink,
  FileCog,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BoardComponent({
  board,
  postCount,
}: {
  board: Board;
  postCount: number;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const boardUrl = `${window.location.origin}/public/${board.id}`;
  const createdDate = new Date(board.created_at);
  const createdDateString = `${createdDate.toLocaleString()}`;

  function copyLink() {
    navigator.clipboard.writeText(boardUrl);
    setOpen(true);

    const timer = setTimeout(() => {
      setOpen(false);
      clearTimeout(timer);
    }, 3000);
  }

  function viewBoard() {
    window.open(`${window.location.origin}/dashboard/board/${board.id}`);
  }

  function editBoard() {
    router.push(`/dashboard/edit/${board.id}`);
  }

  const deleteBoardWithId = deleteBoard.bind(null, board.id);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <H3>{board.name}</H3>
          <div className="flex gap-2">
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={viewBoard}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>View</span>
                  </DropdownMenuItem>
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
                    Select &#39;Confirm&#39; to delete ALL posts and data
                    related to this Board.
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
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="url">Board URL</Label>
          <div className="flex w-full items-center space-x-2">
            <Input id="url" name="url" defaultValue={boardUrl} disabled />
            <Popover open={open}>
              <PopoverTrigger asChild>
                <Button onClick={copyLink}>
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <Small>Link copied!</Small>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full gap-4">
          <Muted>{postCount ?? 0} Posts</Muted>
          {/* <Small className="text-red-600">0 Pending</Small>
            <Small className="text-orange-600">0 Development</Small>
            <Small className="text-green-600">0 Live</Small> */}

          {/* <Muted>{createdDateString}</Muted> */}
        </div>
      </CardFooter>
    </Card>
  );
}
