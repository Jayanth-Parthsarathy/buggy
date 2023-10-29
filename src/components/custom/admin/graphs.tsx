import ReporterStatusGraph from "./graphs/reporterstatusgraph";
import TicketAssignedGraph from "./graphs/ticketassignedgraph";
import TicketPriorityGraph from "./graphs/ticketprioritygraph";
import TicketStatusGraph from "./graphs/ticketstatusgraph";
import UserRoleGraph from "./graphs/usergraph";

const Graphs = () => {
  return (
    <div className="m-3 grid grid-cols-3 gap-5 gap-y-1 p-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>Ticket priority</h1>
        <TicketPriorityGraph />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>No of tickets reported by each user</h1>
        <ReporterStatusGraph />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>Ticket status</h1>
        <TicketStatusGraph />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>User roles</h1>
        <UserRoleGraph />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center gap-4">
        <h1>Ticket Un/Assigned</h1>
        <TicketAssignedGraph />
      </div>
    </div>
  );
};

export default Graphs;
