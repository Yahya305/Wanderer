import { cookies, headers } from "next/headers";
import { decryptSession, encryptSession } from "./jwt/jwtUtils";
import { serialize } from "cookie";
import { parse } from "cookie";
import { NextResponse } from "next/server";

export const createSession = async (loggedInUser: any) => {
    const encryptedSessionData = await encryptSession(loggedInUser);
    const cookie = serialize("session", encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 10, // 10 days
        path: "/",
    });
    cookies().set("session", cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 10, // 10 days
        path: "/",
    });
};

export const fetchSessionData = async () => {
    const serializedSession = cookies().get("session");
    const parsedSession = parse(serializedSession?.value as string);
    const user: any = await decryptSession(parsedSession.session as string);
    const updatedHeaders = new Headers(headers());
    updatedHeaders.set("userId", user.email);
    return NextResponse.next({ request: { headers: updatedHeaders } });
};
