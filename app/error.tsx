"use client";

import { H1 } from "@/components/ui/typography";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <H1>Error!</H1>
    </main>
  );
}
