import AuthButton from "@/components/custom/authbutton";
import Dashboard from "@/components/custom/dashboard";
import { DashboardHeader } from "@/components/custom/header";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div className="p-4">
      <DashboardHeader heading="Bugger 🐛" text="A bug tracking app">
        <AuthButton session={session} />
      </DashboardHeader>
      <Dashboard session={session} />
    </div>
  );
}
