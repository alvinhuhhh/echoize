import { Button } from "@/components/ui/button";
import { P, Title } from "@/components/ui/typography";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-12">
      <div className="flex flex-col justify-center items-center">
        <Title>Echoize</Title>
        <P>Product feedback made simple.</P>
      </div>
      <Button asChild>
        <Link href="/login">Let&#39;s go</Link>
      </Button>
    </main>
  );
}
