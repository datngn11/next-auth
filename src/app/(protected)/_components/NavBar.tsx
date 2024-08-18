"use client";

import { UserButton } from "components/Auth/UserButton";
import { Button } from "components/UI/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <nav className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </nav>

      <UserButton />
    </div>
  );
};
