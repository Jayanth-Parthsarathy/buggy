import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const role = session?.user.role;
  if (role === "DEVELOPER") {
    return <>{children}</>;
  } else {
    redirect("/");
  }
}
