import ChangeTicketStatusForm from "@/components/custom/tester/changeticketstatusform";

const ChangeTicketStatus = async ({ params }: { params: { slug: string } }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Change ticket status</h1>
      <ChangeTicketStatusForm ticketId={params.slug} />
    </div>
  );
};
export default ChangeTicketStatus;
