"use client";

import { Button } from "components/UI/button";
import { logout } from "src/actions/logout";

interface ILogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: ILogoutButtonProps) => {
  const handleSignOut = async () => {
    logout();
  };

  return (
    <Button className="cursor-pointer" onClick={handleSignOut}>
      {children}
    </Button>
  );
};
