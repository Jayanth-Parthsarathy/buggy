"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import type{ User } from "@prisma/client";
import { useRouter } from "next/navigation";
type Props = {
  userId: string | undefined;
  user: User;
};

const BanUserButton = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const toastText = props.user.isBanned
    ? `User ${props.user.name} unbanned`
    : `User ${props.user.name} banned`;
  const { mutate: banUser } = api.member.banUnbanUser.useMutation({
    onSuccess: () => {
      toast({
        title: toastText,
      });
      router.refresh();
    },
  });
  return (
    <Button
      onClick={() => {
        banUser(props.userId!);
      }}
      variant={props.user.isBanned ? "default" : "destructive"}
    >
      {props.user.isBanned ? "Unban User" : "Ban User"}
    </Button>
  );
};

export default BanUserButton;
