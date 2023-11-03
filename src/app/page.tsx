import Dashboard from "@/components/custom/dashboard";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if(!session?.user.companyId){
    return redirect("/company");
  }
  return (
    <div>
      <Dashboard session={session} />
    </div>
  );
}
