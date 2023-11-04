"use client";
import { api } from "@/trpc/react";
import type { Ticket } from "@prisma/client";
import { Pie, PieChart, Tooltip } from "recharts";

export type TicketStatusGraphDataType = {
  status: string;
  noOfTickets: number;
};
function calculateTicketCounts(tickets: Ticket[]) {
  const counts = {
    NEW: 0,
    OPEN: 0,
    IN_PROGRESS: 0,
    RESOLVED: 0,
    ADDITIONAL_INFO_REQUIRED: 0,
  };

  for (const ticket of tickets) {
    counts[ticket.status] += 1;
  }

  return counts;
}

const DeveloperTicketGraph= () => {
  const { data: tickets } = api.ticket.getDeveloperTickets.useQuery();
  const ticketCounts = tickets ? calculateTicketCounts(tickets) : null;
  const graphData: TicketStatusGraphDataType[] = [
    {
      status: "New",
      noOfTickets: ticketCounts?.NEW ?? 0,
    },
    {
      status: "Open",
      noOfTickets: ticketCounts?.OPEN ?? 0,
    },
    {
      status: "Resolved",
      noOfTickets: ticketCounts?.RESOLVED ?? 0,
    },
    {
      status: "In-Progress",
      noOfTickets: ticketCounts?.IN_PROGRESS ?? 0,
    },
    {
      status: "Additional-Info-Required",
      noOfTickets: ticketCounts?.ADDITIONAL_INFO_REQUIRED ?? 0,
    },
  ];

  return (
    <>
      <PieChart width={500} height={250}>
        <Pie
          data={graphData}
          dataKey="noOfTickets"
          nameKey="status"
          fill="#000000"
        />
        <Tooltip />
      </PieChart>
    </>
  );
};

export default DeveloperTicketGraph;
