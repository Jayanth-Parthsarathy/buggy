"use client";
import { api } from "@/trpc/react";
import { Priority, Ticket, User } from "@prisma/client";
import dynamic from "next/dynamic";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export type TicketAssignedGraphDataType = {
  name: string;
  noOfTickets: number;
};

interface ExtendedTicket extends Ticket {
  assignedTo: User[];
}
function calculateAssignedTickets(tickets: ExtendedTicket[]) {
  const counts = {
    Assinged: 0,
    Unassinged: 0,
  };

  for (const ticket of tickets) {
    if (ticket.assignedTo.length !== 0) {
      counts.Assinged++;
    } else {
      counts.Unassinged++;
    }
  }
  return counts;
}

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false },
);
const TicketAssignedGraph= () => {
  const { data: tickets } = api.ticket.getAllTickets.useQuery();
  const ticketCounts = tickets ? calculateAssignedTickets(tickets) : null;
  const graphData: TicketAssignedGraphDataType[] = [
    {
      name: "Assinged",
      noOfTickets: ticketCounts?.Assinged ?? 0,
    },
    {
      name: "Unassinged",
      noOfTickets: ticketCounts?.Unassinged ?? 0,
    },
  ];

  return (
    <>
      <BarChart
        width={500}
        height={250}
        data={graphData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="noOfTickets" fill="#000000" />
      </BarChart>
    </>
  );
};

export default TicketAssignedGraph;
