import { messagesRouter } from "@/modules/messages/server/procedures";
import { createTRPCRouter } from "../init";
import { projectsRouter } from "@/modules/projects/server/procedures";
import { usageRouter } from "@/modules/usage/procedures";
export const appRouter = createTRPCRouter({
  usage: usageRouter,
  messages: messagesRouter,
  projects: projectsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
