import { router, publicProcedure } from "../../trpc/trpc";
import { registerSchema } from "./auth.schema";
import { register } from "./auth.controller";

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await register(input, ctx);
      return { message: "User registered successfully", user };
    }),
});
