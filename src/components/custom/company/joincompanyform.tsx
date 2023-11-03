"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  companyId: z.string(),
  message: z.string(),
});
const JoinCompanyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const { data: companies } = api.company.getAllCompanies.useQuery();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: sendJoinRequest } =
    api.joinRequest.sendJoinRequest.useMutation({
      onSuccess: () => {
        toast({
          title: `Request sent successfully`,
        });
        router.refresh();
      },
    });
  function onSubmit(values: z.infer<typeof formSchema>) {
    sendJoinRequest({
      message: values.message,
      companyId: values.companyId,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-6 space-y-6">
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-xl">Select Company</FormLabel>
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
                        ? companies?.find(
                            (company) => company.id === field.value,
                          )?.name
                        : "Select company"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search company..." />
                    <CommandEmpty>No company found.</CommandEmpty>
                    <CommandGroup>
                      {companies?.map((company) => (
                        <CommandItem
                          value={company.id}
                          key={company.id}
                          onSelect={() => {
                            form.setValue("companyId", company.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              company.name === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {company.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Select the company to join</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message to send</FormLabel>
              <FormControl>
                <Input placeholder="Message ..." {...field} />
              </FormControl>
              <FormDescription>
                This is your join request message
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

export default JoinCompanyForm;
