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
import { SignupState, signup } from "@/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function SignupForm() {
  const initialState: SignupState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(signup, initialState);

  return (
    <form action={dispatch}>
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
              <div id="email-error" className="ml-1">
                {state.errors?.email &&
                  state.errors.email.map((error: string, index: number) => (
                    <ValidationError key={index}>{error}</ValidationError>
                  ))}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
              <div id="password-error" className="ml-1">
                {state.errors?.password &&
                  state.errors.password.map((error: string, index: number) => (
                    <ValidationError key={index}>{error}</ValidationError>
                  ))}
              </div>
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
              <div id="displayName-error" className="ml-1">
                {state.errors?.displayName &&
                  state.errors.displayName.map(
                    (error: string, index: number) => (
                      <ValidationError key={index}>{error}</ValidationError>
                    )
                  )}
              </div>
            </div>
            <div id="general-error">
              {state.message && (
                <ValidationError>{state.message}</ValidationError>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/login">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button>Sign up</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
