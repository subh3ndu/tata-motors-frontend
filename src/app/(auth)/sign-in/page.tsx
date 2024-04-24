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

const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const API_BASE_URL = "https://tata-motors-backend.onrender.com";

const page = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  // zod implementation
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/users/login`,
        data
      );

      console.log("response", response);

      toast({
        title: "Success",
        description: response.data.message,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error while signing In", error);
      toast({
        title: "Signup Failed",
        description: "Error occurred while signing In",
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
            SIGN IN
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
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

            <Button type="submit">Sign In</Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            New member?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
