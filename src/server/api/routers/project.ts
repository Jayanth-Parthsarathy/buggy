import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        companyId: ctx.session.user.companyId,
      },
    });
  }),
  getProjectById: adminProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.project.findFirst({
      where: { id: input, companyId: ctx.session.user.companyId },
      include: {
        tickets: {
          include: {
            comments: {
              include: {
                author: true,
              },
            },
          },
        },
        createdBy: true,
      },
    });
  }),
  deleteProjectById: adminProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db.project.delete({
        where: { id: input, companyId: ctx.session.user.companyId },
      });
    }),
  createProject: adminProcedure
    .input(
      z.object({ name: z.string().min(5), description: z.string().min(5) }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
          description: input.description,
          createdById: ctx.session.user.id,
          companyId: ctx.session.user.companyId,
        },
      });
    }),
  editProject: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(5).optional(),
        description: z.string().min(5).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.project.update({
        where: { id: input.id, companyId: ctx.session.user.companyId },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
});
