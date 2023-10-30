import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { Role } from "@prisma/client";

export const memberRouter = createTRPCRouter({
  getAllMembers: adminProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({});
  }),
  getMemberById: adminProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({
      where: { id: input },
      include: { assignedTickets: true, comments: true, reportedTickets: true },
    });
  }),
  getOnlyMemberById: adminProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: { id: input },
      });
    }),
  banUnbanUser: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({ where: { id: input } });
      const updatedValue = !user?.isBanned;
      if (user?.role !== "ADMIN") {
        await ctx.db.user.update({
          where: {
            id: input,
          },
          data: {
            isBanned: updatedValue,
          },
        });
      }
      return user;
    }),
  changeUserRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.nativeEnum(Role),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: input.role,
        },
      });
    }),
});
