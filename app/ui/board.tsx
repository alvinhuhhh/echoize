import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";

export default function Board() {
  return (
    <Card>
      <CardHeader>
        <H3>This is a Board</H3>
      </CardHeader>
      <CardContent>
        <P>This is some description</P>
      </CardContent>
      <CardFooter>This is some footer</CardFooter>
    </Card>
  );
}
