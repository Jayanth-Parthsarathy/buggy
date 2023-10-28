"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
type Props = {
  projectId: string | undefined;
};

const DeleteProjectButton = (props: Props) => {
  const { toast } = useToast();
  const  router  = useRouter();
  const { mutate: deleteProject } = api.project.deleteProjectById.useMutation({
    onSuccess: ({ name }) => {
      toast({
        title: `Project ${name} deleted successfully`,
      });
      router.refresh()
      router.push("/admin/projects");
    },
  });
  return (
    <Button
      onClick={() => {
        deleteProject(props.projectId!);
      }}
      variant={"destructive"}
    >
      Delete
    </Button>
  );
};

export default DeleteProjectButton;
