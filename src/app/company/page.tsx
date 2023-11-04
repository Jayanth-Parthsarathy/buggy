import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

const CompanyPage = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return (
        <h1 className="mb-10 text-3xl mt-52 font-semibold text-center">
          You need to login before you can continue
        </h1>
    );
  }

  return (
    <div className="mx-auto my-60 flex h-96 w-96 flex-col items-center justify-center gap-10 rounded-lg shadow-md">
      <h1 className="mb-10 text-2xl font-semibold">Create or Join a company</h1>
      <div className="flex gap-4">
        <Link href="/company/create">
          <Button>Create company</Button>{" "}
        </Link>
        <Link href="/company/join">
          <Button>Join company</Button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default CompanyPage;
