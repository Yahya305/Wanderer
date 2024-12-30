import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { loginUser } from "@lib/services/userService";
import { createSession } from "@lib/sessionHandler";

export async function POST(req: NextRequest) {
    const user = await req.json();
    // console.log((await headers()).get("userId"));
    const loggedInUser = await loginUser(user);
    if (!loggedInUser) {
        return NextResponse.json(
            {},
            { status: 401, statusText: "Unauthorized" }
        );
    }
    await createSession(loggedInUser);
    return NextResponse.json(user, { status: 200 });
}
