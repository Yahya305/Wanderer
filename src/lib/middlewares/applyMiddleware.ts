import { NextFetchEvent, NextRequest } from "next/server";

export const applyMiddleware = ({endpoints,middleware,next}:{endpoints:string[],middleware:()=>any,next:any}) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (
            endpoints?.some((path) => pathname.startsWith(path))
        ) {
            console.log("innn");
            return await middleware();
        }
        return next(request, _next);
    };
};
