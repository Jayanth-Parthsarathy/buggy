import EditTicketForm from "@/components/custom/admin/editticketform";

const EditTicket = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <EditTicketForm ticketId={params.slug} />
    </>
  );
};

export default EditTicket;
