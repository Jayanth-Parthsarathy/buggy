import { Session } from "next-auth";
import AuthButton from "./authbutton";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  session: Session | null;
}

export function DashboardHeader({
  heading,
  text,
  children,
  session,
}: DashboardHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
          {text && <p className="text-lg text-muted-foreground">{text}</p>}
        </div>
        <AuthButton session={session} />
        {children}
      </div>
      <hr className="m-2 text-black" />
    </>
  );
}
