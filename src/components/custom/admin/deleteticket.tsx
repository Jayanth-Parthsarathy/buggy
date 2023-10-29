import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import DeleteTicketButton from "./deleteticketbutton";

type DeleteTicketProps = {
  ticketId: string | undefined;
};
const DeleteTicket = ({ ticketId }: DeleteTicketProps) => {
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
            ticket and remove your data from our servers.
            <DeleteTicketButton ticketId={ticketId} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTicket;
