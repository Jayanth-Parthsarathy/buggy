import { Session } from "next-auth";
import React from "react";
import MyTickets from "./mytickets";

type Props = {
  session: Session | null;
};

const DeveloperDashBoard = (props: Props) => {
  return (
    <div>
      <h1 className="text-center text-3xl">
        Welcome {props.session?.user.name}!
      </h1>
      <h1 className="mt-4 text-center text-2xl">Overview</h1>
      //Todo graphs
    </div>
  );
};

export default DeveloperDashBoard;
