import { Button } from "@/components/ui/button";
import Link from "next/link";

const CompanyPage = () => {
  return (
    <div className="h-96 w-96 shadow-md rounded-lg flex items-center justify-center gap-10 mx-auto my-60 flex-col">
      <h1 className="text-2xl font-semibold mb-10">Create or Join a company</h1>
      <div className="flex gap-4">
      <Link href="/company/create"><Button>Create company</Button> </Link>
      <Link href="/company/join"><Button>Join company</Button> </Link>
      </div>
    </div>
  );
};

export default CompanyPage;
