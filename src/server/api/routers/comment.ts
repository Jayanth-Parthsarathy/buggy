import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  sendComment: protectedProcedure
    .input(z.object({ text: z.string().min(2).max(100), ticketId: z.string() }))
    .mutation(({ ctx, input }) => {
      const { text, ticketId } = input;
      return ctx.db.comment.create({
        data: {
          text,
          ticketId,
          authorId: ctx.session.user.id,
        },
      });
    }),
});
