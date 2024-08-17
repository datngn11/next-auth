"use server";

import { db } from "lib/db";
import { getUserByEmail } from "src/data/user";
import { getVerificationTokenByToken } from "src/data/verificationToken";

export const emailVerification = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken || new Date() > new Date(verificationToken.expires)) {
    return { error: "Invalid or expired token" };
  }

  const existingUser = await getUserByEmail(verificationToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return { success: "Email verified" };
};
