import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import { Board } from "@/lib/definitions";

export default function BoardComponent({ board }: { board: Board }) {
  return (
    <Card>
      <CardHeader>
        <H3>{board.name}</H3>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>This is some footer</CardFooter>
    </Card>
  );
}
