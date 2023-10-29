import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { Priority, Status } from "@prisma/client";
import TicketAssignedGraph from "@/components/custom/admin/graphs/ticketassignedgraph";

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
  createTicket: adminProcedure
    .input(
      z.object({
        title: z.string().min(5),
        description: z.string().min(5),
        status: z.nativeEnum(Status),
        priority: z.nativeEnum(Priority),
        project: z.string().min(1),
        assignedUsers: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { title, description, status, priority, project, assignedUsers } =
        input;
      return ctx.db.ticket.create({
        data: {
          title,
          projectId: project,
          priority,
          status,
          assignedTo: {
            connect: assignedUsers.map((id) => ({ id: id })),
          },
          description,
          reporterId: ctx.session.user.id,
        },
      });
    }),
  editTicket: adminProcedure
    .input(
      z.object({
        title: z.string().min(5),
        ticketId: z.string(),
        description: z.string().min(5),
        status: z.nativeEnum(Status),
        priority: z.nativeEnum(Priority),
        project: z.string().min(1),
        assignedUsers: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        description,
        status,
        priority,
        project,
        assignedUsers,
        ticketId,
      } = input;
      await ctx.db.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          assignedTo: {
            set: [],
          },
        },
      });
      return ctx.db.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          title,
          projectId: project,
          priority,
          status,
          assignedTo: {
            connect: assignedUsers.map((id) => ({ id: id })),
          },
          description,
          reporterId: ctx.session.user.id,
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
  deleteTicketById: adminProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db.ticket.delete({
        where: { id: input },
      });
    }),
});
