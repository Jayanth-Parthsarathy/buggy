import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (session?.user.companyId) {
    return redirect("/");
  }
  return <>{children}</>;
}
