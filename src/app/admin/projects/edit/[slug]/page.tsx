import EditProjectForm from "@/components/custom/admin/editprojectform";

const ProjectView = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <EditProjectForm id={params.slug} />
    </>
  );
};

export default ProjectView;
