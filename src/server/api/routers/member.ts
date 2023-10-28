import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";

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
});
