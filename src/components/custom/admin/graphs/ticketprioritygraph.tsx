"use client";
import { api } from "@/trpc/react";
import type { Priority, Ticket } from "@prisma/client";
import dynamic from "next/dynamic";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export type TicketPriorityGraphDataType = {
  status: Priority;
  noOfTickets: number;
};
function calculateTicketCounts(tickets: Ticket[]) {
  const counts = {
    HIGH: 0,
    LOW: 0,
    MEDIUM: 0,
  };

  for (const ticket of tickets) {
    counts[ticket.priority] += 1;
  }

  return counts;
}

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false },
);
const TicketPriorityGraph = () => {
  const { data: tickets } = api.ticket.getAllTickets.useQuery();
  const ticketCounts = tickets ? calculateTicketCounts(tickets) : null;
  const graphData: TicketPriorityGraphDataType[] = [
    {
      status: "HIGH",
      noOfTickets: ticketCounts?.HIGH ?? 0,
    },
    {
      status: "LOW",
      noOfTickets: ticketCounts?.LOW ?? 0,
    },
    {
      status: "MEDIUM",
      noOfTickets: ticketCounts?.MEDIUM ?? 0,
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
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="noOfTickets" fill="#000000" />
      </BarChart>
    </>
  );
};

export default TicketPriorityGraph;
