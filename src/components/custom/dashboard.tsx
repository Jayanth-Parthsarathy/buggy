import { Session } from "next-auth";
import AdminDashBoard from "./admin/admindashboard";

interface DashboardProps {
  session: Session | null;
}
const Dashboard = ({ session }: DashboardProps) => {
  return (
    <div className="px-2">
      {session?.user.role === "ADMIN" ? (
        <AdminDashBoard />
      ) : session?.user.role === "DEVELOPER" ? (
        <div>DEVELOPER</div>
      ) : session?.user.role === "TESTER" ? (
        <div>TESTER</div>
      ) : (
        <div>REPORTER</div>
      )}
    </div>
  );
};

export default Dashboard;
