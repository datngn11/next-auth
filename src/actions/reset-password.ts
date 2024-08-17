"use server";

import { db } from "lib/db";
import { getPasswordResetTokenByToken } from "src/data/passwordResetToken";
import { getUserByEmail } from "src/data/user";
import { ResetPasswordSchema } from "src/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return {
      error: "Missing token!",
    };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token!",
    };
  }

  if (existingToken && new Date(existingToken.expires) < new Date()) {
    return {
      error: "Token expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken?.email);

  if (!existingUser) {
    return {
      error: "User does not exist!",
    };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Password reset",
  };
};
