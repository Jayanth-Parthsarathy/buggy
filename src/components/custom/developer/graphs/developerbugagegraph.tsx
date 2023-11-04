"use client";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Ticket } from "@prisma/client";

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false },
);

const DeveloperBugAgeGraph: React.FC = () => {
  const { data: tickets } = api.ticket.getDeveloperTickets.useQuery();
  const [bugAgeData, setBugAgeData] = useState<
    { ageRange: string; count: number }[]
  >([]);

  useEffect(() => {
    if (tickets) {
      const currentDate = new Date();
      const ageData: Record<string, number> = {
        "0-7 days": 0,
        "8-14 days": 0,
        "15-30 days": 0,
        "31+ days": 0,
      };

      tickets.forEach((ticket: Ticket) => {
        const createdAt = new Date(ticket.createdAt);
        const ageInDays = Math.floor(
          (currentDate.getTime() - new Date(createdAt).getTime()) /
            (1000 * 60 * 60 * 24),
        );

        if (ageInDays <= 7) {
          ageData["0-7 days"]++;
        } else if (ageInDays <= 14) {
          ageData["8-14 days"]++;
        } else if (ageInDays <= 30) {
          ageData["15-30 days"]++;
        } else {
          ageData["31+ days"]++;
        }
      });

      setBugAgeData(
        Object.entries(ageData).map(([ageRange, count]) => ({
          ageRange,
          count,
        })),
      );
    }
  }, [tickets]);

  return (
    <div>
      <BarChart
        width={500}
        height={250}
        data={bugAgeData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageRange" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#000000" />
      </BarChart>
    </div>
  );
};

export default DeveloperBugAgeGraph;
