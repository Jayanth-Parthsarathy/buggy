import { api } from "@/trpc/server";

const AdminDashBoard = async () => {
  const projects = await api.project.getAllProjects.query();
  return (
    <div>
      <div>
        {projects.map((project) => (
          <div key={project.id}>{project.name}</div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoard;
