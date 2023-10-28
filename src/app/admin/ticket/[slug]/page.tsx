import { api } from "@/trpc/server";

const MemberView = async ({ params }: { params: { slug: string } }) => {
  const ticket = await api.ticket.getTicketById.query(params.slug)
  return <div className="p-4">{ticket?.title}</div>;
};

export default MemberView;
