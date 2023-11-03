import { api } from "@/trpc/server";
import Image from "next/image";

const MemberView = async ({ params }: { params: { slug: string } }) => {
  const user = await api.member.getMemberById.query(params.slug);
  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <Image
            src={user?.image ?? ""}
            alt={user?.name ?? ""}
            width={64}
            height={64}
            className="mx-auto h-16 w-16 rounded-full"
          />
          <h2 className="mt-4 text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="mt-2">
            Role: <span className="font-semibold">{user?.role}</span>
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Assigned Tickets</h3>
          {user?.assignedTickets.length != 0 ? (
            <ul className="list-disc pl-8">
              {user?.assignedTickets.map((ticket) => (
                <li key={ticket.id} className="mt-2">
                  {ticket.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4">No assigned tickets</p>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Reported Tickets</h3>
          {user?.reportedTickets.length != 0 ? (
            <ul className="list-disc pl-8">
              {user?.reportedTickets.map((ticket) => (
                <li key={ticket.id} className="mt-2">
                  {ticket.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4">No tickets reported yet</p>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Comments</h3>
          {user?.comments.length != 0 ? (
            <ul className="list-disc pl-8">
              {user?.comments.map((comment) => (
                <li key={comment.id} className="mt-2">
                  {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4">User has no comments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberView;
