import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import Link from "next/link";

export default function VerifiedPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-12">
      <div className="flex flex-col justify-center items-center">
        <H1>Thank you!</H1>
        <P>Your email has been verified.</P>
      </div>
      <Link href="/dashboard">
        <Button>Let&#39;s go</Button>
      </Link>
    </main>
  );
}
