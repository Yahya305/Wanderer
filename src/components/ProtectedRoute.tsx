import { getCurrentUser } from "@lib/utils/session";
import { redirect } from "next/navigation";
import React from "react";

export async function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    return <div>{children}</div>;
}
