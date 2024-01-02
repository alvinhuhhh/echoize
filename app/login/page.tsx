import { Metadata } from "next";
import { H2, Muted } from "@/components/ui/typography";
import Link from "next/link";
import LoginForm from "../ui/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <H2 className="mb-2">Welcome to Echoize!</H2>
      <Muted className="mb-8">
        Don&#39;t have an account?{" "}
        <Link className="text-blue-400 font-semibold" href="/">
          Create one!
        </Link>
      </Muted>
      <LoginForm />
    </main>
  );
}
