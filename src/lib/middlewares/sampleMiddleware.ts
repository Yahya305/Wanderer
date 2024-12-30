import { NextFetchEvent, NextRequest } from "next/server";

export const sampleMiddleware = (next: any) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (
            ["/api/authentication"]?.some((path) => pathname.startsWith(path))
        ) {
            // console.log("Execute here")
        }
        return next(request, _next);
    };
};
