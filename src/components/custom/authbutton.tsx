"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { Mail } from "lucide-react";

type Props = {
  session: Session | null;
};

const AuthButton = (props: Props) => {
  return (
    <div>
      {props.session?.user.name ? (
        <Button variant={"destructive"} onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button onClick={() => signIn()}>
          <Mail className="mr-2 h-4 w-4" />
          Login
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
