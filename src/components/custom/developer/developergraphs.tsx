import React from "react";
import DeveloperTicketGraph from "./graphs/developerticketgraph";
import DeveloperProjectGraph from "./graphs/developerprojectgraph";
import DeveloperTicketPriorityGraph from "./graphs/developerticketprioritygraph";
import DeveloperBugAgeGraph from "./graphs/developerbugagegraph";

const DeveloperGraphs = () => {
  return (
    <div className="m-3 grid grid-cols-2 gap-5 gap-y-1 p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl font-semibold">Your ticket status</h1>
          <DeveloperTicketGraph />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl font-semibold">Tickets and Project</h1>
          <DeveloperProjectGraph />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl font-semibold">Your ticket priority</h1>
          <DeveloperTicketPriorityGraph />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl font-semibold">Ticket age graph</h1>
          <DeveloperBugAgeGraph />
        </div>
      </div>
  );
};

export default DeveloperGraphs;
