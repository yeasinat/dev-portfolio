import z from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  bio: z.string().min(30, "Add bio to know better about you"),
  email: z.email("Invalid email address"),
  socialLinks: z
    .object({
      github: z.url("Invalid GitHub URL").optional(),
      linkedin: z.url("Invalid LinkedIn URL").optional(),
      x: z.url("Invalid X/Twitter URL").optional(),
    })
    .optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
