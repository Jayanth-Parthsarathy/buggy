import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { JoinRequestStatus } from "@prisma/client";

export const joinRequestRouter = createTRPCRouter({
  sendJoinRequest: protectedProcedure
    .input(
      z.object({
        companyId: z.string(),
        message: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { companyId, message } = input;
      return ctx.db.joinRequest.create({
        data: {
          companyId,
          userId: ctx.session.user.id,
          message,
        },
      });
    }),
  approveRequest: adminProcedure
    .input(
      z.object({
        status: z.nativeEnum(JoinRequestStatus),
        id: z.string(),
        userId: z.string(),
        companyId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { status, id, userId, companyId } = input;
      if (status === "APPROVED") {
        await ctx.db.user.update({
          where: {
            id: userId,
          },
          data: {
            companyId,
          },
        });
      }
      return ctx.db.joinRequest.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
    }),
  getAllRequests: adminProcedure.query(({ ctx }) => {
    return ctx.db.joinRequest.findMany({
      include: { user: true, company: true },
      where: {
        companyId: ctx.session.user.companyId,
        status: "PENDING",
      },
    });
  }),
});
