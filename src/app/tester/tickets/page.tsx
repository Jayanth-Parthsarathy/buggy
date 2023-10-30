import { getStatusColor } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Edit } from "lucide-react";
import Link from "next/link";

const TicketListing = async () => {
  const tickets = await api.ticket.getAllTesterTickets.query();
  return (
    <div className="">
      <div>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`m-4 rounded-lg bg-white p-4 shadow-md`}
          >
            <div className="flex items-center justify-between">
              <Link href={`ticket/${ticket.id}`}>
                <h2 className="cursor-pointer text-xl font-semibold">
                  {ticket.title}
                </h2>
              </Link>
              <h5 className="text-sm font-semibold">
                  Reported by: {ticket.reporter.name}
              </h5>
            </div>
            <div className="m-4 flex gap-4">
              <Link href={`/tester/tickets/edit/${ticket?.id}`}>
                <div className="flex gap-2 text-green-500">
                  <Edit className="" />
                  Change status
                </div>
              </Link>
            </div>
            <p className="text-gray-600">{ticket.description}</p>
            <div className="mt-2">
              <span
                className={`rounded px-2 py-1 ${getStatusColor(ticket.status)}`}
              >
                {ticket.status}
              </span>
            </div>
            <h5 className="mt-2 text-sm font-semibold">Assigned Users:</h5>

            {ticket?.assignedTo.length != 0 ? (
              <ul className="mt-2">
                {ticket?.assignedTo?.map((assignedMember) => (
                  <li  key={assignedMember.id} className={`m-2 p-2`}>{assignedMember.name}</li>
                ))}
              </ul>
            ) : (
              <div className="m-2 p-2">Not assigned yet</div>
            )}
            <div className="mt-4">
              <span className="text-sm text-gray-500">
                Created: {new Date(ticket.createdAt).toLocaleString()}
              </span>
              <span className="ml-4 text-sm text-gray-500">
                Updated: {new Date(ticket.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TicketListing;
