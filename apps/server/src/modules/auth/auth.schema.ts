import { z } from "zod";

export const registerSchema = z.object({
  email: z.email({ message: "Email is required!" }),
  password: z.string({ message: "Password is required!" }).min(6, {
    message: "Password must be at least 6 characters!",
  }),
  name: z.string({ message: "Name is required!" }).min(2, {
    message: "Name must be at least 2 characters!",
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
