import { registerUser } from "@lib/use-cases/user";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const user = await req.json();
    await registerUser(user);

    return NextResponse.json(user);
}
