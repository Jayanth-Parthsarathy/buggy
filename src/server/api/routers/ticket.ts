import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  devProcedure,
  reporterProcedure,
  testerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { Priority, Status } from "@prisma/client";

export const ticketRouter = createTRPCRouter({
  getAllTickets: adminProcedure.query(({ ctx }) => {
    return ctx.db.ticket.findMany({
      where: {
        project: {
          companyId: ctx.session.user.companyId,
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        reporter: true,
        assignedTo: true,
      },
    });
  }),
  getReporterTickets: protectedProcedure.query(({ ctx }) => {
    return ctx.db.ticket.findMany({
      where: {
        project: {
          companyId: ctx.session.user.companyId,
        },
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
  reportBug: reporterProcedure
    .input(
      z.object({
        title: z.string().min(5),
        description: z.string().min(5),
        status: z.nativeEnum(Status),
        priority: z.nativeEnum(Priority),
        project: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { title, description, status, priority, project } = input;
      return ctx.db.ticket.create({
        data: {
          title,
          projectId: project,
          priority,
          status,
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
  getDeveloperTickets: devProcedure.query(({ ctx }) => {
    return ctx.db.ticket.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        project : true,
      },
      where: {
        assignedTo: {
          some: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
  getDeveloperTicketById: devProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.ticket.findFirst({
        where: {
          id: input,
          assignedTo: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
        include: {
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              author: true,
            },
          },
          assignedTo: true,
        },
      });
    }),
  getAllTesterTickets: testerProcedure.query(({ ctx }) => {
    return ctx.db.ticket.findMany({
      include: {
        reporter: true,
        assignedTo: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  getTesterTicketById: testerProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.db.ticket.findFirst({
        where: {
          id: input,
        },
        include: {
          reporter: true,
          assignedTo: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              author: true,
            },
          },
        },
      });
    }),
  changeTicketStatus: testerProcedure
    .input(
      z.object({
        status: z.nativeEnum(Status),
        ticketId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { ticketId, status } = input;
      return ctx.db.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status,
        },
      });
    }),
});
