import { v4 as uuidv4 } from "uuid";
import { db } from "lib/db";
import { getPasswordResetTokenByEmail } from "src/data/passwordResetToken";
import { getVerificationTokenByEmail } from "src/data/verificationToken";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "src/data/twoFactorToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
