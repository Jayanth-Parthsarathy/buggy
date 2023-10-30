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
import { Input } from "@/components/ui/input";
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
import { Priority, Status } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  status: z.nativeEnum(Status),
  priority: z.nativeEnum(Priority),
  project: z.string(),
  assignedUsers: z.array(z.string()),
});

const priorities = [
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
] as const;

const statuses = [
  { label: "New", value: "NEW" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Additional Info required", value: "ADDITIONAL_INFO_REQUIRED" },
] as const;

const AddTicketForm = () => {
  const { toast } = useToast();
  const { mutate: createTicket } = api.ticket.createTicket.useMutation({
    onSuccess: ({ title }) => {
      toast({
        title: "Ticket created successfully",
        description: `Name: ${title}`,
      });
    },
  });
  const { data: projects } = api.project.getAllProjects.useQuery();
  const { data: users } = api.member.getAllMembers.useQuery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      project: "",
      priority: "LOW",
      status: "NEW",
      assignedUsers: [],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description, project, priority, status, assignedUsers } =
      values;
    createTicket({
      title,
      description,
      project,
      priority,
      status,
      assignedUsers,
    });
  }
  return (
    <div className="px-6">
      <h1 className="font-heading text-2xl md:text-2xl">Add a new ticket</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." {...field} />
                </FormControl>
                <FormDescription>This is your ticket name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your ticket description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project</FormLabel>
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
                          ? projects?.find(
                              (project) => project.id == field.value,
                            )?.name
                          : "Select project"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Project..." />
                      <CommandEmpty>No project found</CommandEmpty>
                      <CommandGroup>
                        {projects?.map((project) => (
                          <CommandItem
                            value={project.id}
                            key={project.id}
                            onSelect={() => {
                              form.setValue("project", project.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                project.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {project.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the project the ticket belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Priority</FormLabel>
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
                          ? priorities.find(
                              (priority) => priority.value === field.value,
                            )?.label
                          : "Select priority"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search priority..." />
                      <CommandEmpty>No priority found</CommandEmpty>
                      <CommandGroup>
                        {priorities.map((priority) => (
                          <CommandItem
                            value={priority.label}
                            key={priority.value}
                            onSelect={() => {
                              form.setValue("priority", priority.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                priority.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {priority.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the priority of the Ticket
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="assignedUsers"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Assigned Users</FormLabel>
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
                        {field.value.length > 0
                          ? "Selected Users"
                          : "Select users"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search users..." />
                      <CommandEmpty>No users found</CommandEmpty>
                      <CommandGroup>
                        {users?.map((user) => (
                          <CommandItem
                            value={user.id}
                            key={user.id}
                            onSelect={() => {
                              // Toggle the selection of users.
                              if (field.value.includes(user.id)) {
                                form.setValue(
                                  "assignedUsers",
                                  field.value.filter((id) => id !== user.id),
                                );
                              } else {
                                form.setValue("assignedUsers", [
                                  ...field.value,
                                  user.id,
                                ]);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value.includes(user.id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {user.name} @{user.email}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Assign users to the ticket</FormDescription>
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

export default AddTicketForm;
