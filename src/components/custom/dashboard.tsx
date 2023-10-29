import { Session } from "next-auth";
import AdminDashBoard from "./admin/admindashboard";

interface DashboardProps {
  session: Session | null;
}

const Dashboard =  ({ session }: DashboardProps) => {
  return (
    <div className="flex-1 p-6">
      <div className="px-6">
        {session?.user.role === "ADMIN" ? (
          <AdminDashBoard session={session} />
        ) : session?.user.role === "DEVELOPER" ? (
          <div>DEVELOPER</div>
        ) : session?.user.role === "TESTER" ? (
          <div>TESTER</div>
        ) : (
          <div>REPORTER</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
