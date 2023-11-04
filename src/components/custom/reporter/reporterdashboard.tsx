import type { Session } from "next-auth";
import RepoterGraphs from "./reportergraphs";
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
        <RepoterGraphs />
      </div>
    </div>
  );
};

export default ReporterDashBoard;
