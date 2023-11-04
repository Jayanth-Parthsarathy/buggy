"use client";
import { api } from "@/trpc/react";
import type { Project, Ticket } from "@prisma/client";
import dynamic from "next/dynamic";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false },
);

type GraphDataType = {
  project: string;
  projectId: string;
  noOfTickets: number;
};

const getBoilerData = (projects: Project[]): GraphDataType[] => {
  const data: GraphDataType[] = [];
  projects.forEach((project) =>
    data.push({
      project: project.name,
      noOfTickets: 0,
      projectId: project.id,
    }),
  );
  return data;
};

const processGraphData = (
  boilerData: GraphDataType[],
  tickets: Ticket[],
): GraphDataType[] => {
  tickets.forEach((ticket) => {
    const label = boilerData.find(function (obj) {
      return obj.projectId === ticket.projectId;
    });
    if (label) {
      label.noOfTickets++;
    }
  });
  return boilerData;
};

const DeveloperProjectGraph  = () => {
  const { data: tickets, isLoading: isLoading1 } =
    api.ticket.getDeveloperTickets.useQuery();
  const { data: projects, isLoading: isLoading2 } =
    api.project.getAllProjects.useQuery();
  if (isLoading1 || isLoading2 || !projects || !tickets) {
    return <div>Loading...</div>;
  }
  const boilerData = getBoilerData(projects);
  const data = processGraphData(boilerData, tickets);
  return (
    <>
      <BarChart
        width={500}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="project" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="noOfTickets" fill="#000000" />
      </BarChart>
    </>
  );
};

export default DeveloperProjectGraph;
