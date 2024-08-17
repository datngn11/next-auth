"use server";

import { db } from "lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "lib/tokens";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "src/auth";
import { getTwoFactorConfirmationByUserId } from "src/data/twoFactorConfirmation";
import { getTwoFactorTokenByEmail } from "src/data/twoFactorToken";
import { getUserByEmail } from "src/data/user";
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

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "User does not exist!",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: "Confirmation email sent!",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const existingToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!existingToken || existingToken.token !== code) {
        return {
          error: "Invalid two factor code!",
        };
      }

      if (new Date(existingToken.expires) < new Date()) {
        return {
          error: "Two factor code expired!",
        };
      }

      await db.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });
    } else {
      const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (!twoFactorConfirmation) {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token,
        );

        return {
          twoFactor: true,
        };
      }
    }
  }

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
