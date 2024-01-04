"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationError } from "@/components/ui/typography";
import { BoardState, updateBoard } from "@/lib/actions";
import { Board } from "@/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function EditBoardForm({ board }: { board: Board }) {
  const initialState: BoardState = { message: null, errors: {} };
  const updateBoardWithId = updateBoard.bind(null, board.id);
  const [state, dispatch] = useFormState(updateBoardWithId, initialState);

  return (
    <form action={dispatch}>
      <Card>
        <CardHeader />
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Board Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your board name"
                defaultValue={board.name}
              />
              <div id="name-error" className="ml-1">
                {state.errors?.name &&
                  state.errors.name.map((error: string, index: number) => (
                    <ValidationError key={index}>{error}</ValidationError>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button>Create</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
