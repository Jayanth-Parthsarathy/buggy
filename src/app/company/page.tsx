import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

const CompanyPage = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return (
      <h1 className="mb-10 mt-52 text-center text-3xl font-semibold">
        You need to login before you can continue
      </h1>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-10 text-2xl font-semibold">Create or Join a company</h1>
      <div className="flex gap-4">
        <Link href="/company/create">
          <Button>Create company</Button>
        </Link>
        <Link href="/company/join">
          <Button>Join company</Button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyPage;
