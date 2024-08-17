"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/UI/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "components/UI/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { ExitIcon } from "@radix-ui/react-icons";
import { logout } from "src/actions/logout";

export const UserButton = () => {
  const { user } = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser color="white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem className="flex gap-x-2" onClick={() => logout()}>
          <ExitIcon /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
