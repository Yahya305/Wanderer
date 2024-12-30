import { GalleryVerticalEnd, } from "lucide-react";

import { LoginForm } from "./components/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Wandrer
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/travellerImg1.jpg"
                    alt="Image"
                    fill
                    className="object-cover dark:brightness-[0.2] dark:grayscale"
                    priority
                />
            </div>
        </div>
    );
}