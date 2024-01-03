import { Button } from "@/components/ui/button";
import { P, Title } from "@/components/ui/typography";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-12">
      <div className="flex flex-col justify-center items-center">
        <Title className="lg">Echoize</Title>
        <P>Product feedback made simple.</P>
      </div>
      <Link href="/login">
        <Button>Let&#39;s go</Button>
      </Link>
    </main>
  );
}
