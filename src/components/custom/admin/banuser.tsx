import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Gavel } from "lucide-react";
import BanUserButton from "./banuserbutton";
import { User } from "@prisma/client";

type BanUserProps = {
  userId: string | undefined;
  user: User;
};
const BanUser = ({ userId, user }: BanUserProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {user.isBanned ? (
          <Gavel className="text-green-500" />
        ) : (
          <Gavel className="text-red-500" />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            {user.isBanned
              ? "This will unban the user and allow him to use the api"
              : "This will ban the user and make him unabe to use the api."}
            <BanUserButton user={user} userId={userId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BanUser;
