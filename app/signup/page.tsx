import { Metadata } from "next";
import SignupForm from "@/app/ui/auth/signup-form";
import { H2, Muted } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignupPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <H2 className="mb-2">Create an Account</H2>
      <Muted className="mb-8">Let&#39;s get started</Muted>
      <SignupForm />
    </main>
  );
}
