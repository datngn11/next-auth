"use server";

import { db } from "lib/db";
import { sendVerificationEmail } from "lib/mail";
import { generateVerificationToken } from "lib/tokens";
import { currentUser } from "lib/user";
import { getUserByEmail, getUserById } from "src/data/user";
import { SettingsSchema } from "src/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const { user } = await currentUser();

  let { name, email, password, newPassword, role, isTwoFactorEnabled } = values;
  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return {
      error: "Unauthorized!",
    };
  }

  if (user.isOAuth) {
    delete values.password;
    delete values.newPassword;
    delete values.email;
    delete values.isTwoFactorEnabled;
  }

  if (email && email !== user.email) {
    const existingUser = await getUserByEmail(email);

    if (existingUser && existingUser.id !== user.id) {
      return {
        error: "Email already in use!",
      };
    }

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: null,
      },
    });
  }

  if (password && newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(password, dbUser.password);

    if (!passwordMatch) {
      return {
        error: "Incorrect password!",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    password = hashedPassword;
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      email,
      password,
      isTwoFactorEnabled,
      role,
    },
  });

  return {
    success: "Settings updated!",
  };
};
