"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Status } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  status: z.nativeEnum(Status),
});

const statuses = [
  { label: "New", value: "NEW" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Additional Info required", value: "ADDITIONAL_INFO_REQUIRED" },
] as const;

const ChangeTicketStatusForm = ({ ticketId }: { ticketId: string }) => {
  const { toast } = useToast();
  const { data: ticket } = api.ticket.getTesterTicketById.useQuery(ticketId);
  const  router  = useRouter();
  const { mutate: editTicket } = api.ticket.changeTicketStatus.useMutation({
    onSuccess: ({ title }) => {
      toast({
        title: "Ticket status changed successfully",
        description: `Name: ${title}`,
      });
      router.refresh()
      router.push("/tester/tickets");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "NEW",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { status } = values;
    editTicket({
      ticketId,
      status,
    });
  }
  useEffect(() => {
    if (ticket) {
      form.setValue("status", ticket.status);
    }
  }, [ticket, form]);
  return (
    <div className="px-6">
      <h1 className="mb-4 p-4 text-2xl font-semibold">{ticket?.title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status</FormLabel>
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
                          ? statuses.find(
                              (status) => status.value === field.value,
                            )?.label
                          : "Select status"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search priority..." />
                      <CommandEmpty>No status found</CommandEmpty>
                      <CommandGroup>
                        {statuses.map((status) => (
                          <CommandItem
                            value={status.label}
                            key={status.value}
                            onSelect={() => {
                              form.setValue("status", status.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                status.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {status.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the status of the Ticket
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangeTicketStatusForm;
