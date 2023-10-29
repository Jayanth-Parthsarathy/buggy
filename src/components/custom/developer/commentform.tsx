"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  text: z.string().min(2).max(100),
});
type CommentFormProps = {
  ticketId: string | undefined;
};
const CommentForm = ({ ticketId }: CommentFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const { mutate: sendComment } = api.comment.sendComment.useMutation({
    onSuccess() {
      toast({
        title: "Your comment was sent successfully",
      });
      router.refresh();
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (ticketId) {
      sendComment({
        text: values.text,
        ticketId,
      });
      form.setValue("text", "")
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Leave a comment" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="ml-auto bg-green-600">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
