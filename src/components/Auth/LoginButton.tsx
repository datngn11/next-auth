"use client";

import { LoginForm } from "components/Auth/LoginForm";
import { Dialog, DialogContent, DialogTrigger } from "components/UI/dialog";
import { useRouter } from "next/navigation";

interface IProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: IProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <span>
        <Dialog>
          <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
          <DialogContent className="w-auto border-0 bg-transparent p-0">
            <LoginForm />
          </DialogContent>
        </Dialog>
      </span>
    );
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
