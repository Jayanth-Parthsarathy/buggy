import MyTickets from "@/components/custom/developer/mytickets";

const TicketsPage = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-center my-10">Tickets assigned to you:</h1>
      <MyTickets />
    </div>
  );
};

export default TicketsPage;
