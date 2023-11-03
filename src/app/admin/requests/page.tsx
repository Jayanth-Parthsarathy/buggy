import Request from "@/components/custom/requests/Request";
import { api } from "@/trpc/server";

const ManageRequests = async () => {
  const requests = await api.joinRequest.getAllRequests.query();
  console.log(requests);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Manage join requests</h1>
      <ul className="space-y-4">
        {requests.length !== 0 ? (
          requests.map((request) => (
            <Request key={request.id} request={request} />
          ))
        ) : (
          <div className="text-center mt-52 font-semibold text-3xl">No requests to show</div>
        )}
      </ul>
    </div>
  );
};

export default ManageRequests;
