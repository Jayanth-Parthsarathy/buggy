import Request from "@/components/custom/requests/Request";
import { api } from "@/trpc/server";

const ManageRequests = async () => {
  const requests = await api.joinRequest.getAllRequests.query();
  console.log(requests);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Manage join requests</h1>
      <ul className="space-y-4">
        {requests.map((request) => (
        <Request key={request.id} request={request} />
        ))}
      </ul>
    </div>
  );
};

export default ManageRequests;
