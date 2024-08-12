"use client";

import { useRouter } from "next/navigation";

interface IProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children, mode = "redirect" }: IProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO</span>;
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
