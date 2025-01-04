"use client";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { loginSchema } from "../../../api/authentication/login/dto";
import { useServerAction } from "zsa-react";
import { loginUserAction } from "../action";
import { toast } from "@lib/hooks/use-toast";
import { redirect } from "next/navigation";

// Validation schema

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const {
        execute: loginUser,
        isPending,
        data,
    } = useServerAction(loginUserAction, {
        onSuccess() {
            toast({
                title: "Success!",
                description: "Login Successful",
            });
            redirect("/dashboard");
        },
        onError(err) {
            toast({
                title: "Uh-oh!",
                variant: "destructive",
                description: err.err.message,
            });
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            console.log("Form Submitted: ", values);
            console.log(await loginUser(values));
            console.log("done");
            // Example: Replace with actual API call
            // const response = await fetch("/api/authentication/login", {
            //     method: "POST",
            //     body: JSON.stringify(values),
            //     headers: { "Content-Type": "application/json" },
            // });
            // const data = await response.json();
            // console.log(data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            {/* Email Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Login Button */}
                            <Button type="submit" className="w-full">
                                Login
                            </Button>

                            {/* Google Login Button */}
                            <Button variant="outline" className="w-full">
                                <FcGoogle className="mr-2" /> Login with Google
                            </Button>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
