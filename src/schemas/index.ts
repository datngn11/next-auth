import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Required",
  }),
  password: z.string().min(1, { message: "Required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1, {
    message: "Required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Required",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Required",
    }),
    passwordConfirm: z.string().min(6, {
      message: "Required",
    }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["passwordConfirm"],
      });
    }
  });
