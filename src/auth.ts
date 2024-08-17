import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "src/auth.config";
import { db } from "lib/db";
import { getUserById } from "src/data/user";
import { getTwoFactorConfirmationByUserId } from "src/data/twoFactorConfirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) return false;

      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      console.log("two factor enabled", { existingUser });
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          user.id,
        );

        if (!twoFactorConfirmation) return false;

        if (new Date(twoFactorConfirmation.expires) < new Date()) {
          await db.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });

          return false;
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (token?.sub) {
        const user = await getUserById(token.sub);

        if (user) {
          token.role = user?.role;
        }
      }
      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
