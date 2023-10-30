"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Role, type User } from "@prisma/client";
import { useEffect } from "react";
import { api } from "@/trpc/react";
const FormSchema = z.object({
  role: z.nativeEnum(Role),
});

const roles = [
  { label: "Admin", value: "ADMIN" },
  { label: "Developer", value: "DEVELOPER" },
  { label: "Tester", value: "TESTER" },
  { label: "Reporter", value: "REPORTER" },
] as const;

type Props = {
  user: User | null;
};
const UserAssignForm = ({ user }: Props) => {
  const { mutate: changeUserRole } = api.member.changeUserRole.useMutation({
    onSuccess() {
      toast({
        title: "Changed user role succesfully",
      });
    },
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (user) {
      form.setValue("role", user.role);
    }
  }, [user, form]);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (user) changeUserRole({ userId: user.id, role: data.role });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>User Role</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? roles.find((role) => role.value === field.value)
                            ?.label
                        : "Select role"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {roles.map((role) => (
                        <CommandItem
                          value={role.label}
                          key={role.value}
                          onSelect={() => {
                            form.setValue("role", role.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              role.value === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {role.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the role of the current user
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UserAssignForm;
