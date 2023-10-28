import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";
import { ticketRouter } from "./routers/ticket";
import { memberRouter } from "./routers/member";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ticket: ticketRouter,
  project: projectRouter,
  member: memberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
