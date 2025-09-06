"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserControl } from "@/components/user-control";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const isScrolled = useScroll();

  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
        isScrolled && "bg-background border-border"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Amoura" width={24} height={24} />
          <span className="font-semibold text-lg">Amoura</span>
        </Link>
        <div className="flex gap-4 items-center">
          <SignedOut>
            <div className="flex gap-2">
              <SignUpButton>
                <Button variant="outline" size="sm">
                  Sign Up
                </Button>
              </SignUpButton>
              <SignInButton>
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserControl showName />
          </SignedIn>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="gap-2">
              <Button variant="ghost" size="icon">
                {theme === "dark" ? (
                  <MoonIcon className="size-4 text-muted-foreground" />
                ) : (
                  <SunIcon className="size-4 text-muted-foreground" />
                )}
              </Button>
              {/* <span>Appearance</span> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <span>Light</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <span>Dark</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <span>System</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
