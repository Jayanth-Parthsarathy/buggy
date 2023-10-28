import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import DeleteProjectButton from "./deleteprojectbutton";

type DeleteProjectProps = {
  projectId: string | undefined;
};
const DeleteProject = ({ projectId }: DeleteProjectProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Trash className="text-red-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
            <DeleteProjectButton projectId={projectId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProject;
