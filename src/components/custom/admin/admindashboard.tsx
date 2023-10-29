import { Session } from "next-auth";
import Graphs from "./graphs";

type Props = {
  session: Session | null;
};
const AdminDashBoard = ({ session }: Props) => {
  return (
    <div className="">
      <h1 className="text-3xl text-center">Welcome {session?.user.name}!</h1>
      <h1 className="text-2xl text-center mt-4">Overview</h1>
      <Graphs />
    </div>
  );
};

export default AdminDashBoard;
