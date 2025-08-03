"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [value, setValue] = useState("");

  const router = useRouter();
  const trpc = useTRPC();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return toast.error("Enter Prompt");
    if (createProject.isPending) return;

    createProject.mutate({ value });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 mx-auto max-w-xl w-full items-center"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter Prompt..."
          aria-label="Background job input"
          className="mb-4 mt-20 rounded h-10"
        />
        <Button disabled={createProject.isPending}>Submit</Button>
      </form>
    </div>
  );
};

export default Page;
