import CommentForm from "@/components/custom/developer/commentform";
import {
  getFormattedDate,
  getFormattedRole,
  getPriorityColor,
  getStatusColor,
} from "@/lib/utils";
import { api } from "@/trpc/server";
import moment from "moment";

const DevTicketView = async ({ params }: { params: { slug: string } }) => {
  const ticket = await api.ticket.getDeveloperTicketById.query(params.slug);
  return (
    <div className="m-10 bg-white p-4 shadow-md">
      <div className="m-4 flex items-center justify-between p-2">
        <h1 className="text-3xl font-semibold">{ticket?.title}</h1>
        <div className="flex gap-2 text-xl">
          Ticket status:
          <h4
            className={`${getStatusColor(
              ticket?.status,
            )} rounded-md p-1 text-center`}
          >
            {ticket?.status}
          </h4>
        </div>
        <div className="flex gap-2 text-xl">
          Ticket priority:
          <h4
            className={`${getPriorityColor(
              ticket?.priority,
            )} rounded-md p-1 text-center`}
          >
            {ticket?.priority}
          </h4>
        </div>
      </div>
      <div className="m-4 p-2">
        <p className="">
          <span className="text-xl font-semibold">Ticket Description:</span>{" "}
          {ticket?.description}
        </p>
      </div>
      <div className="m-4 p-2 ">
        <p>
          <span className="font-semibold">Ticket Created at:</span>{" "}
          {getFormattedDate(ticket?.createdAt)}
        </p>
        <p>
          <span className="font-semibold">Ticket Updated at:</span>{" "}
          {getFormattedDate(ticket?.updatedAt)}
        </p>
      </div>
      <div className="m-4 p-2">
        <p className="text-xl font-semibold">Ticket assigned to</p>
        <ul className="m-2">
          {ticket?.assignedTo.map((user) => <li key={user.id}>{user.name}</li>)}
        </ul>
      </div>
      <div className="m-4 p-2">
        <h4 className="mb-2 text-xl font-semibold">Comments:</h4>
        <div className="flex flex-col gap-10">
          {ticket?.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col justify-between border-2 border-gray-200 p-3"
            >
              <p className="text-muted-foreground">
                <span className="font-semibold">{comment.author.name}{" "}</span>
                commented {moment(comment.createdAt).fromNow()}
                <p className="">@{getFormattedRole(comment.author.role)}</p>
              </p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="m-4 p-2">
        <CommentForm ticketId={ticket?.id} />
      </div>
    </div>
  );
};

export default DevTicketView;
