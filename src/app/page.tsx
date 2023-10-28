import Dashboard from "@/components/custom/dashboard";
import { getServerAuthSession } from "@/server/auth";


export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div>
        <Dashboard session={session} />
    </div>
  );
}
