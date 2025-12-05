import { initTRPC } from "@trpc/server";
import { Context } from "./context";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const initTRPCWithContext = initTRPC.context<Context>();
const t = initTRPCWithContext.create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router: typeof t.router = t.router;
export const publicProcedure: typeof t.procedure = t.procedure;
