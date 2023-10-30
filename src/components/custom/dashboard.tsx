import { Session } from "next-auth";
import AdminDashBoard from "./admin/admindashboard";
import DeveloperDashBoard from "./developer/developerdashboard";
import TesterDashboard from "./tester/testerdashboard";
import ReporterDashboard from "./reporter/reporterdashboard";

interface DashboardProps {
  session: Session | null;
}

const Dashboard = ({ session }: DashboardProps) => {
  return (
    <div className="flex-1 p-6">
      <div className="px-6">
        {session?.user.role === "ADMIN" ? (
          <AdminDashBoard session={session} />
        ) : session?.user.role === "DEVELOPER" ? (
          <DeveloperDashBoard session={session} />
        ) : session?.user.role === "TESTER" ? (
        <TesterDashboard />
        ) : (
        <ReporterDashboard />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
