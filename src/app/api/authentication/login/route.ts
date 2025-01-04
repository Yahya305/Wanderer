import prisma from "@lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { loginUserUseCase } from "@lib/use-cases/user";
import { createSession } from "@lib/utils/sessionHandler";

export async function POST(req: NextRequest) {
    const user = await req.json();
    // console.log((await headers()).get("userId"));
    const loggedInUser = await loginUserUseCase(user);
    if (!loggedInUser) {
        return NextResponse.json(
            {},
            { status: 401, statusText: "Unauthorized" }
        );
    }
    await createSession(loggedInUser);
    return NextResponse.json(user, { status: 200 });
}
