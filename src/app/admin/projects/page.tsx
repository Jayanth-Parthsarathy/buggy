import DeleteProject from "@/components/custom/admin/deleteproject";
import { api } from "@/trpc/server";
import { Edit } from "lucide-react";
import Link from "next/link";

const ProjectManagementPage = async () => {
  const projects = await api.project.getAllProjects.query();

  return (
    <div className="w-full p-4 text-center">
      <h1 className="mb-4 mt-4 px-4 text-2xl font-bold">Project Management</h1>
      {projects.length !== 0 ? (
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
              <div className="mt-2 flex justify-between">
                <Link href={`/admin/projects/edit/${project.id}`}>
                  <Edit className="text-green-500" />
                </Link>
                <DeleteProject projectId={project.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-52 text-center text-3xl font-semibold">
          No projects to show. Create one now!
        </div>
      )}
    </div>
  );
};

export default ProjectManagementPage;
