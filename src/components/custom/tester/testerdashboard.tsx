import type { Session } from "next-auth";
import TesterGraphs from "./testergraphs";
type Props = {
  session: Session | null;
};
const ReporterDashBoard= (props: Props) => {
  return (
    <div>
      <h1 className="text-center text-3xl">
        Welcome {props.session?.user.name}!
      </h1>
      <h1 className="mt-4 text-center text-2xl">Overview</h1>
      <div>
        <TesterGraphs />
      </div>
    </div>
  );
};

export default ReporterDashBoard;
