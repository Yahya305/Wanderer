// middleware.ts
import { authMiddleware } from "@lib/middlewares/authMiddleware";
import { sampleMiddleware } from "@lib/middlewares/sampleMiddleware";
import { stackMiddlewares } from "@lib/middlewares/stackHandler";

const middlewares = [authMiddleware, sampleMiddleware];
export default stackMiddlewares(middlewares);

// Define which paths this middleware will apply to
export const config = {
    matcher: ["/api/:path*"], // Define routes to match
};
