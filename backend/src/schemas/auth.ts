import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

// TypeScript type inferred automatically
export type SignInBody = z.infer<typeof signInSchema>;
