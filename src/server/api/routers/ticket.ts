import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";

export const ticketRouter = createTRPCRouter({
  getAllTickets: adminProcedure.query(({ ctx }) => {
    return ctx.db.ticket.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        reporter: true,
        assignedTo: true,
      },
    });
  }),
  getTicketById: adminProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.ticket.findFirst({
      where: {
        id: input,
      },
      include: {
        reporter: true,
        assignedTo: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }),
});
