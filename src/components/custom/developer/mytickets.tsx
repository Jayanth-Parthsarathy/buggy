import { getStatusColor } from "@/lib/utils";
import { api } from "@/trpc/server";
import Link from "next/link";
import React from "react";

const MyTickets = async () => {
  const tickets = await api.ticket.getDeveloperTickets.query();
  return (
    <div className="p-4">
      {tickets.length !== 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets?.map((ticket) => (
            <Link href={"/developer/ticket/" + ticket.id} key={ticket.id}>
              <div className="rounded-lg bg-white p-4 shadow-lg">
                <h5 className="mb-4 p-2 text-lg font-semibold text-gray-900 md:text-xl lg:text-2xl">
                  {ticket.title}
                  <div className="text-sm text-gray-700">
                    <p className="mb-2">
                      Ticket Description: {ticket.description}
                    </p>
                    <p
                      className={`inline-block rounded-lg px-2 py-1 text-white ${getStatusColor(
                        ticket.status,
                      )}`}
                    >
                      Ticket Status: {ticket.status}
                    </p>
                  </div>
                </h5>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-52 text-center text-3xl font-semibold">
          No tickets to display.
        </div>
      )}
    </div>
  );
};

export default MyTickets;
