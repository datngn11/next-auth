import { type DefaultSession } from "next-auth";
import {} from "next-auth/jwt";

export type ExtendedUser = {
  role: "ADMIN" | "USER";
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
} & DefaultSession["user"];

declare module "next-auth" {
  export interface Session {
    user: ExtendedUser;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  export interface JWT {
    role: "ADMIN" | "USER";
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
}
