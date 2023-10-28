import { api } from "@/trpc/server";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

const ProjectManagementPage = async () => {
  const projects = await api.project.getAllProjects.query();
  return (
    <div className="p-4">
      <h1 className="mb-4 mt-4 px-4 text-2xl font-bold">Project Management</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="transform cursor-pointer rounded-lg bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/admin/project/${project.id}`}>
              <h2 className="mb-2 text-lg font-semibold">{project.name}</h2>{" "}
            </Link>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex justify-between">
              <Link href={`/admin/project/edit/${project.id}`}>
                <Edit className="text-green-500" />
              </Link>
              <Link href={`/admin/project/delete/${project.id}`}>
                <Trash className="text-red-500" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagementPage;
