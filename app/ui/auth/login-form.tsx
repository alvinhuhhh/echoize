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
import { SigninState, signin } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const initialState: SigninState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(signin, initialState);

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
            <div id="general-error">
              {state.message && (
                <ValidationError>{state.message}</ValidationError>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
