import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  createProject: adminProcedure
    .input(z.object({ name: z.string().min(5), description: z.string().min(5) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
          description: input.description,
          createdById: ctx.session.user.id
        },
      });
    }),
});
