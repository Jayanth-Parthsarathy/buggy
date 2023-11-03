import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";
import { ticketRouter } from "./routers/ticket";
import { memberRouter } from "./routers/member";
import { commentRouter } from "./routers/comment";
import { companyRouter } from "./routers/company";
import { joinRequestRouter } from "./routers/joinrequest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ticket: ticketRouter,
  project: projectRouter,
  member: memberRouter,
  comment: commentRouter,
  company: companyRouter,
  joinRequest: joinRequestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
