import DeleteTicket from "@/components/custom/admin/deleteticket";
import { api } from "@/trpc/server";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";

const TicketListing = async () => {
  const tickets = await api.ticket.getAllTickets.query();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-red-500 text-white";
      case "OPEN":
        return "bg-yellow-500 text-black";
      case "IN_PROGRESS":
        return "bg-blue-500 text-white";
      case "RESOLVED":
        return "bg-green-500 text-white";
      case "ADDITIONAL_INFO_REQUIRED":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="">
      <Link href="/admin/tickets/add">
        <Plus className="ml-auto mr-10 h-10 w-10 rounded-full bg-green-500 text-white" />
      </Link>
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
                <Link href={`/admin/member/${ticket.reporterId}`}>
                  Reported by: {ticket.reporter.name}
                </Link>
              </h5>
            </div>
            <div className="m-4 flex gap-4">
              <Link href={`/admin/tickets/edit/${ticket?.id}`}>
                <Edit className="text-green-500" />
              </Link>
              <DeleteTicket ticketId={ticket?.id} />
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
                  <Link
                    href={`/admin/member/${assignedMember.id}`}
                    key={assignedMember.id}
                  >
                    <li className={`m-2 p-2`}>{assignedMember.name}</li>
                  </Link>
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
            {/* Add action buttons here (assign, resolve, delete, etc.) */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TicketListing;
