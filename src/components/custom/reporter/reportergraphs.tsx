import ReporterProjectGraph from "./graphs/reporterprojectgraph";
import ReporterTicketPriorityGraph from "./graphs/reporterticketprioritygraph";
import ReporterTicketStatusGraph from "./graphs/reporterticketstatusgraph";

const RepoterGraphs = () => {
  return (
    <div className="m-3 grid grid-cols-2 gap-5 gap-y-5 p-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Projects with tickets</h1>
        <ReporterProjectGraph />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Your ticket status</h1>
        <ReporterTicketStatusGraph />
      </div>
      <div className="flex col-span-2 flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">Your ticket priority</h1>
        <ReporterTicketPriorityGraph />
      </div>
    </div>
  );
};

export default RepoterGraphs;
