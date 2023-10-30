import { UserCog } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/server";
import UserAssignForm from "./userassignform";

type Props = {
  userId: string;
};
const AssignUser = async ({ userId }: Props) => {
  const user = await api.member.getOnlyMemberById.query(userId);
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <UserCog className="text-green-500" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Change the user role</DialogTitle>
              This will change the user role
              <UserAssignForm user={user}/>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignUser;
