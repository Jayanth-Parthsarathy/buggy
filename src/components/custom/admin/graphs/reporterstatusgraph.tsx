"use client";
import { api } from "@/trpc/react";
import { Priority, Ticket } from "@prisma/client";
import dynamic from "next/dynamic";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export type UserStatusGraphData = {
  name: string;
  noOfTickets: number;
};

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false },
);
const ReporterStatusGraph = () => {
  const { data: tickets } = api.ticket.getAllTickets.useQuery();
  const userTicketCounts = new Map<string, number>();
  tickets?.forEach((ticket) => {
    const reporterName = ticket.reporter.email;
    if (reporterName) {
      const count = userTicketCounts.get(reporterName) ?? 0;
      userTicketCounts.set(reporterName, count + 1);
    }
  });
  const userTicketCountsData = Array.from(
    userTicketCounts,
    ([reporterName, count]) => ({
      reporterName,
      noOfTickets: count,
    }),
  );
  return (
    <>
      <BarChart
        width={500}
        height={250}
        data={userTicketCountsData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="reporterName" className="hidden" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="noOfTickets" fill="#000000" />
      </BarChart>
    </>
  );
};

export default ReporterStatusGraph;
