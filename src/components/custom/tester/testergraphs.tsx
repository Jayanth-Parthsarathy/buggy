import TesterProjectGraph from "./graphs/testerprojectgraph";
import TesterTicketPriorityGraph from "./graphs/testerticketprioritygraph";
import TesterTicketStatusGraph from "./graphs/testerticketstatusgraph";

const TesterGraphs = () => {
  return (
    <div className="m-3 grid grid-cols-2 gap-5 gap-y-5 p-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Projects with tickets</h1>
        <TesterProjectGraph />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Ticket statuses</h1>
        <TesterTicketStatusGraph />
      </div>
      <div className="flex col-span-2 flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Ticket priorities</h1>
        <TesterTicketPriorityGraph />
      </div>
    </div>
  );
};

export default TesterGraphs;
