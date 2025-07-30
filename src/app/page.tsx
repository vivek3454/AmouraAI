"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();

  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created.");
      },
    })
  );

  return (
    <div className="flex justify-center items-center mx-auto max-w-4xl flex-col w-full h-screen">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter job parameters..."
        aria-label="Background job input"
        className="mb-4"
      />
      <Button
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({ value })}
      >
        Invoke Background Job
      </Button>
      <div>{JSON.stringify(messages,null,2)}</div>
    </div>
  );
};

export default Page;
