import DeleteProject from "@/components/custom/admin/deleteproject";
import { api } from "@/trpc/server";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProjectView = async ({ params }: { params: { slug: string } }) => {
  const project = await api.project.getProjectById.query(params.slug);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">{project?.name}</h1>
        <div className="flex justify-center items-center gap-3">
          <Link href={`/admin/projects/edit/${project?.id}`}>
            <Edit className="text-green-500" />
          </Link>
          <DeleteProject projectId={project?.id} />
        </div>
      </div>

      <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">Project Details</h2>
        <p className="text-gray-600">{project?.description}</p>
      </div>

      <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">Created By</h2>
        <p className="text-gray-600">{project?.createdBy.name}</p>
      </div>

      <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">Bug Reports</h2>
        <ul className="ml-4 list-disc">
          {project?.tickets.map((ticket) => (
            <li key={ticket.id}>{ticket.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectView;
