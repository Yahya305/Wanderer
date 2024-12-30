import { createUser } from "@lib/services/userService";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const user = await req.json();
    await createUser(user);

    return NextResponse.json(user);
}
