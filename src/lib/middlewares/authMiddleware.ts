import { fetchSessionData } from "@lib/utils/sessionHandler";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const authMiddleware = (next: any) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (
            ["/api/authentication"]?.some((path) => !pathname.startsWith(path))
        ) {
            return await fetchSessionData();
        }
        return next(request, _next);
    };
};
