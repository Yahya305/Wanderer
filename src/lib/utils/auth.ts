import { decryptSession } from "@lib/jwt/jwtUtils";
import {
    getSessionToken,
    SESSION_MAX_DURATION_MS,
    SESSION_REFRESH_INTERVAL_MS,
    updateSessionExpiry,
} from "./session";
import { fetchUserByIdUseCase } from "@lib/use-cases/user";
import { User } from "@prisma/client";

export async function validateRequest(): Promise<SessionValidationResult> {
    const session = await getSessionToken();
    if (!session || !session.session) {
        return { session: null, user: null };
    }
    return validateSession(session);
}

export async function validateSession(
    session: Session
): Promise<SessionValidationResult> {
    const decryptedSession: any = await decryptSession(session.session);

    const user = await fetchUserByIdUseCase(decryptedSession.userId);
    const expiryDate = new Date(session.Expires);

    if (Date.now() >= expiryDate.getTime()) {
        return { session: null, user: null };
    }

    if (!user) {
        return { session: null, user: null };
    }
    try {
        if (Date.now() >= expiryDate.getTime() - SESSION_REFRESH_INTERVAL_MS) {
            await updateSessionExpiry();
        }
    } catch (error) {
        return { session, user };
    }
    return { session, user };
}

export type SessionValidationResult =
    | {
          session: Session;
          user: Omit<User, "password">;
      }
    | { session: null; user: null };

export type Session = { session: string; Path: string; Expires: string };
