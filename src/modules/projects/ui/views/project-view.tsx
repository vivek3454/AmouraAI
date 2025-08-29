"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Fragment } from "@/generated/prisma";
import { MessagesContainer } from "@/modules/projects/ui/components/messages-container";
import { Suspense, useState } from "react";
import { ProjectHeader } from "../components/project-header";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<p>Loading Project...</p>}>
          <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<p>Loading Messages...</p>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} minSize={50}>
          TODO
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
