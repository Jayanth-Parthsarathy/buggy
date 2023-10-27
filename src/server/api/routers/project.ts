import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
