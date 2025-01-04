import "server-only";
import { cache } from "react";
import { AuthenticationError } from "./errors";
import { cookies } from "next/headers";
import { parse, serialize } from "cookie";
import { Session, validateRequest } from "./auth";
import { encryptSession } from "@lib/jwt/jwtUtils";

export const SESSION_REFRESH_INTERVAL_MS = 60 * 60 * 24 * 10;
export const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

export const createSession = async (userId: string) => {
    const encryptedSessionData = await encryptSession({ userId });
    const cookie = serialize("session", encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + SESSION_REFRESH_INTERVAL_MS),
        path: "/",
    });
    cookies().set("session", cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + SESSION_REFRESH_INTERVAL_MS),
        path: "/",
    });
};

export const updateSessionExpiry = async () => {
    const existingSession = cookies().get("session");

    if (!existingSession) {
        throw new Error("Session not found");
    }

    // Retrieve the encrypted session data from the cookie
    const encryptedSessionData = existingSession.value;

    // Create a new cookie with an updated expiry date
    const updatedCookie = serialize("session", encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + SESSION_REFRESH_INTERVAL_MS), // Extend expiry
        path: "/",
    });

    // Set the updated cookie
    cookies().set("session", updatedCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + SESSION_REFRESH_INTERVAL_MS), // Extend expiry
        path: "/",
    });
};

export async function getSessionToken() {
    const allCookies = await cookies();
    const serializedSession = allCookies.get("session")?.value;
    if (!serializedSession) {
        return;
    }
    const parsedSession = parse(serializedSession as string) as Session;
    return parsedSession;
}

export const getCurrentUser = cache(async () => {
    const { user } = await validateRequest();
    return user ?? undefined;
});

export const assertAuthenticated = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    return user;
};

export async function invalidateSession() {
    (await cookies()).delete("session");
}
