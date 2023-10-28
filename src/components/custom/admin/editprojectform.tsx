"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
});

type EditProjectFormProps = {
  id: string;
};
const EditProjectForm = ({ id }: EditProjectFormProps) => {
  const router = useRouter();
  const { data: project } = api.project.getProjectById.useQuery(id);
  const { toast } = useToast();
  const { mutate: editProject } = api.project.editProject.useMutation({
    onSuccess: ({ name }) => {
      toast({
        title: `Project: ${name} updated successfully`,
      });
      router.refresh()
      router.push("/admin/projects");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project?.name,
      description: project?.description,
    },
  });
  useEffect(() => {
    if (project) {
      form.setValue("name", project.name);
      form.setValue("description", project.description);
    }
  }, [project, form]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, description } = values;
    editProject({
      id,
      name,
      description,
    });
  }
  return (
    <div className="px-6">
      <h1 className="font-heading text-2xl md:text-2xl">
        Update Project: <span className="font-italic">{project?.name}</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." {...field} />
                </FormControl>
                <FormDescription>This is your project name</FormDescription>
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
                  This is your project description
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

export default EditProjectForm;
