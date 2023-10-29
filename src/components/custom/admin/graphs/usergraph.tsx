"use client";
import { api } from "@/trpc/react";
import { Role, User } from "@prisma/client";
import { Pie, PieChart, Tooltip } from "recharts";

export type UserRoleGraphDataType = {
  role: string;
  number: number;
};
function calculateTicketCounts(users: User[]) {
  const counts = {
    ADMIN: 0,
    DEVELOPER: 0,
    TESTER: 0,
    REPORTER: 0,
  };

  for (const user of users) {
    counts[user.role] += 1;
  }

  return counts;
}

const UserRoleGraph = () => {
  const { data: users } = api.member.getAllMembers.useQuery();
  const ticketCounts = users ? calculateTicketCounts(users) : null;
  const graphData: UserRoleGraphDataType[] = [
    {
      role: "Admin",
      number: ticketCounts?.ADMIN ?? 0,
    },
    {
      role: "Developer",
      number: ticketCounts?.DEVELOPER ?? 0,
    },
    {
      role: "Tester",
      number: ticketCounts?.TESTER ?? 0,
    },
    {
      role: "Reporter",
      number: ticketCounts?.REPORTER ?? 0,
    },
  ];
  return (
    <>
      <PieChart width={500} height={250}>
        <Pie
          data={graphData}
          dataKey="number"
          nameKey="role"
          fill="#000000"
        />
        <Tooltip />
      </PieChart>
    </>
  );
};

export default UserRoleGraph;
