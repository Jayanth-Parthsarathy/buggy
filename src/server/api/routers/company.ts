import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const companyRouter = createTRPCRouter({
  createCompany: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { description, name } = input;
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          role: "ADMIN",
        },
      });
      return ctx.db.company.create({
        data: {
          description,
          name,
          members: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  getAllCompanies: protectedProcedure.query(({ ctx }) => {
    return ctx.db.company.findMany({});
  }),
});
