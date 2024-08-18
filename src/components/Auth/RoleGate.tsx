"use client";

import { UserRole } from "@prisma/client";
import { FormError } from "components/FormError";
import { useCurrentUser } from "src/hooks/useCurrentUser";

interface IRoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: IRoleGateProps) => {
  const { userRole } = useCurrentUser();

  if (userRole !== allowedRole) {
    return <FormError message="You are not authorized to view this page." />;
  }
  return <>{children}</>;
};
