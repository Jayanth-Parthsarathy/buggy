import DeleteTicket from "@/components/custom/admin/deleteticket";
import { api } from "@/trpc/server";
import { Edit } from "lucide-react";
import Link from "next/link";

const MemberView = async ({ params }: { params: { slug: string } }) => {
  const ticket = await api.ticket.getTicketById.query(params.slug);
  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-3xl font-semibold">{ticket?.title}</h2>
          <div className="flex gap-4">
            <Link href={`/admin/tickets/edit/${ticket?.id}`}>
              <Edit className="text-green-500" />
            </Link>
            <DeleteTicket ticketId={ticket?.id} />
          </div>
        </div>
        <p className="mb-4 text-gray-600">{ticket?.description}</p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Reporter</h3>
          <p>{ticket?.reporter?.name}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Assigned To</h3>
          {ticket?.assignedTo.length !== 0 ? (
            <ul className="list-disc pl-8">
              {ticket?.assignedTo.map((user) => (
                <li key={user.id} className="mt-2">
                  {user.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4">No assigned users</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold">Comments</h3>
          {ticket?.comments.length !== 0 ? (
            <ul className="list-disc pl-8">
              {ticket?.comments.map((comment) => (
                <li key={comment.id} className="mt-2">
                  <div className="flex justify-between">
                    <div>{comment.text}</div>
                    <div>- {comment.author.name}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4">No comments available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberView;
