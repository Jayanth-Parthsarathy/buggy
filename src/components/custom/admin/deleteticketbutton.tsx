"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
type Props = {
  ticketId: string | undefined;
};

const DeleteTicketButton = (props: Props) => {
  const { toast } = useToast();
  const  router  = useRouter();
  const { mutate: deleteTicket } = api.ticket.deleteTicketById.useMutation({
    onSuccess: ({ title }) => {
      toast({
        title: `Ticket ${title} deleted successfully`,
      });
      router.refresh()
      router.push("/admin/tickets");
    },
  });
  return (
    <Button
      onClick={() => {
        deleteTicket(props.ticketId!);
      }}
      variant={"destructive"}
    >
      Delete
    </Button>
  );
};

export default DeleteTicketButton;
