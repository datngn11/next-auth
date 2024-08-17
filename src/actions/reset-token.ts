"use server";
import { sendPasswordResetEmail } from "lib/mail";
import { generateResetPasswordToken } from "lib/tokens";
import { getUserByEmail } from "src/data/user";
import { ResetSchema } from "src/schemas";
import { z } from "zod";

export const sendResetToken = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email } = validatedFields.data;
  1;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return {
      error: "User does not exist!",
    };
  }

  const resetToken = await generateResetPasswordToken(existingUser.email);

  await sendPasswordResetEmail(existingUser.email, resetToken.token);

  return {
    success: "Password reset email sent",
  };
};
