"use client";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import type { Company, JoinRequest, User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ExtendedRequest extends JoinRequest {
  user: User;
  company: Company;
}
type Props = {
  request: ExtendedRequest;
};

const Request = ({ request }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: approveRequest } = api.joinRequest.approveRequest.useMutation(
    {
      onSuccess: () => {
        toast({
          title: `Request handled successfully`,
        });
        router.refresh();
      },
    },
  );
  return (
    <li key={request.id} className="rounded-lg bg-white p-4 shadow-md">
      <p className="font-semibold">User: {request.user.name}</p>
      <p className="text-gray-600">Message: {request.message}</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={() =>
            approveRequest({
              id: request.id,
              status: "APPROVED",
              userId: request.userId,
              companyId: request.companyId,
            })
          }
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Approve
        </button>
        <button
          onClick={() =>
            approveRequest({
              id: request.id,
              companyId: request.companyId,
              status: "DENIED",
              userId: request.userId,
            })
          }
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Deny
        </button>
      </div>
    </li>
  );
};

export default Request;
