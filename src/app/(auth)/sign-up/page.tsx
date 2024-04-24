"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
// import { useAppSelector } from "@/redux/hooks";

const signUpSchema = z.object({
  name: z.string(),
  user_name: z.string(),
  password: z.string(),
  role: z.string(),
});

const API_BASE_URL = "https://tata-motors-backend.onrender.com";

const page = () => {
  // const authState = useAppSelector((state) => state.auth.authState);

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      user_name: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/users`, data);

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/sign-in");
      setLoading(false);
    } catch (error) {
      console.error("Error while signing Up", error);
      toast({
        title: "Signup Failed",
        description: "Error occurred while signing up",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Please SIGN UP
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="your role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:text-blue-800">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
