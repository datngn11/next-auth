"use server";

import { UserRole } from "@prisma/client";
import { currentUser } from "lib/user";

export const admin = async () => {
  const { userRole } = await currentUser();

  if (userRole === UserRole.ADMIN) {
    return {
      success: "Server Action OK",
    };
  }

  return {
    error: "Server Action Error",
  };
};
