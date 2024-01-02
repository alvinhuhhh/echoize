import { H2, Muted } from "@/components/ui/typography";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <H2>Welcome to Echoize!</H2>
      <Muted>
        Don&#39;t have an account?{" "}
        <Link className="text-blue-400 font-semibold" href="/">
          Create one
        </Link>
      </Muted>
    </main>
  );
}
