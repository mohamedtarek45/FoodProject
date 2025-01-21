import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
});
export type UserFormData = z.infer<typeof formSchema>;

type props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser:User;
  title?:string;
  bottonText?:string;

};
const UserProfileForm = ({ onSave, isLoading,currentUser,title="User Profile Form",bottonText="Submit" }: props) => {

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser.user
  });

  useEffect(()=>{
    if (currentUser) {
      form.reset(currentUser.user);
    }
  },[currentUser,form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white"  />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>addressLine1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>city</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton value="please wait" />
        ) : (
          <Button type="submit">{bottonText}</Button>
        )}
      </form>
    </Form>
  );
};
export default UserProfileForm;
