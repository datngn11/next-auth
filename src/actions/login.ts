"use server";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "src/auth";
import { DEFAULT_LOGIN_REDIRECT } from "src/routes";
import { LoginSchema } from "src/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  let errorOccurred = false;

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: "Successfully logged in!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true;

      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }
  } finally {
    if (!errorOccurred) {
      return redirect(DEFAULT_LOGIN_REDIRECT);
    }
  }
};
