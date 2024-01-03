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
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "";

  return (
    <form action="/auth/signup" method="post">
      <Card className="w-[350px]">
        <CardHeader />
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="displayName">
                Display Name &#40;optional&#41;
              </Label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Enter your preferred name"
              />
            </div>
            {error && (
              <div className="flex justify-center space-y-1.5">
                <ValidationError>Invalid credentials</ValidationError>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={(e) => e.preventDefault()}>
            <Link href="/login">Cancel</Link>
          </Button>
          <Button>Sign up</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
