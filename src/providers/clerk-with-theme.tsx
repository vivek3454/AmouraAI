"use client";
import { useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadcn } from "@clerk/themes";

export function ClerkWithTheme({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      key={theme} // Force remount when theme changes
      appearance={{
        baseTheme: theme === "dark" ? dark : shadcn,
        variables: {
          colorPrimary: "#C96342",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
