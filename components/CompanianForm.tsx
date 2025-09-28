"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { minLength, z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { subjects } from "@/constants";
import { createCompanion } from "@/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  topic: z.string().min(2, { message: "Topic is required" }),
  style: z.string().min(2, { message: "Topic is required" }),
  voice: z.string().min(2, { message: "Voice is required" }),
  duration: z.number().min(1, { message: "Duration is required" })
})

const CompanianForm = () => {


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      style: "",
      topic: "",
      voice: "",
      duration: 10,
    },
  })

  // 2. Define a submit handler.
  async function  onSubmit(values: z.infer<typeof formSchema>) {
    const companion = await createCompanion(values);
    if(companion){
      console.log("🤖✅ Companion Created", companion);
      redirect(`/companions/${companion.id}`);
    }else{
      console.log("🤖❌ Companion Not Created");
      redirect(`/`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="Give Your Companion a Name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select a Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="capitalize">
                          {subject}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What Should this Companion Teach You</FormLabel>
              <FormControl>
                <Input placeholder="Enter Topic You Want To Learn." {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select a Voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"male"} className="capitalize">
                      Male
                    </SelectItem>
                    <SelectItem value={"female"} className="capitalize">
                      Female
                    </SelectItem>

                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select the Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"formal"} className="capitalize">
                      Formal
                    </SelectItem>
                    <SelectItem value={"casual"} className="capitalize">
                      Casual
                    </SelectItem>

                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Session Duration in Minutes</FormLabel>
              <FormControl>
                <Input type="number" placeholder="15" value={field.value}
                  onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full cursor-pointer" type="submit">Buid Your Companion</Button>
      </form>
    </Form>
  )
}

export default CompanianForm