"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { H3, Large, Muted } from "@/components/ui/typography";
import { UserInfo } from "@/lib/definitions";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { CircleUserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user?: User & UserInfo }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function logout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <div className="grid grid-cols-8 lg:grid-cols-12 gap-4 items-center p-2 border-b-2 sticky top-0 backdrop-blur">
      <div className="col-span-2 lg:col-span-1 flex justify-center items-center">
        <H3>Echoize</H3>
      </div>
      <div className="col-span-4 lg:col-span-10 flex justify-start items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Boards
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/settings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Settings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="col-span-2 lg:col-span-1 flex justify-center items-center">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <CircleUserRound />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuLabel>
              <Large>{user?.display_name || "unknown"}</Large>
              <Muted>{user?.email || "unknown"}</Muted>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
